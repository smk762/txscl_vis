'use strict'
require('./colors.js');
var dynogels = require('dynogels');
const Joi = require('joi');
const util = require('util');
const _ = require('lodash');
let io;
let http = require('http');
dynogels.AWS.config.loadFromPath('creds.json');
let dba = require('./db_auth.js');
let rp = require('request-promise');
const Sequelize = require('sequelize');
let fs = require('fs');

let initTime = Date.now();
let clientCount = 0;
let ac_active_5min = [];
let random = false;
const json_url = '<INSERT AWS API ENDPOINT URL HERE>';

let last_max_time = 0;
let sum_tx = 0;
let sum_pt = 0;
let count_block = 0;
let num_blocks = 0;
let count_chain = 0;
let max_time = 0;
let blk_time = 0;
let size_blocks = 0;
let new_count_block = 0; 

let ac_Arr = [];
let hist_time = [];
let hist_blocks = [];
let hist_active = [];
let hist_size = [];
let hist_txsum = [];
let hist_blkratio = [];

console.log(mdblue+'--------------------------------------------------------------------------------------------------------------------------------------------');
console.log(mdblue+'--------------------------------------------------------------------------------------------------------------------------------------------');
console.log(mdblue+'====================================================== TXSCL AGGREGATER STARTING ==========================================================');
console.log(mdblue+'--------------------------------------------------------------------------------------------------------------------------------------------');
console.log(mdblue+'--------------------------------------------------------------------------------------------------------------------------------------------'+grey);

function unique(value, index, self) { 
    return self.indexOf(value) === index;
}

function timeout_ac(arr, val, time) {
  setTimeout(function() { arr.splice(arr.indexOf(val), 1);  },time);
}

// **************************************************** connect to DynamoDB
var txsc_table = dynogels.define('kmd-blocknotify-blackjok3r-2-v0', {
  hashKey : 'chain',
  rangeKey : 'timestamp',
  timestamps : false,
  createdAt: false,
  updatedAt: false,
  schema : {
    chain : Joi.string(),
    timestamp : Joi.number(),
    size : Joi.number(),
    totaltx : Joi.number()
  }
})

// **************************************************** connect to PGSQL DB
const sequelize = new Sequelize(dba.db_name, dba.db_user, dba.db_pass, {
  host: 'localhost', dialect: 'postgres', operatorsAliases: false,
  pool: { max: 1200, min: 0, acquire: 30000, idle: 60000 }, 
});
sequelize
  .authenticate()
  .then(() => { console.log(green+'Connected to database '+dba.db_name+' as '+dba.db_user+white); })
  .catch(err => { console.error(red+'Unable to connect to the database:', err+white); });


// **************************************************** create outgoing socket.io connection 
function connSocketOut() {
  const server = http.createServer(function(req, res) {
    fs.readFile('./res.html', 'utf-8', function(error, content) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(content);
    });
  });
  io = require('socket.io').listen(server);
  io.sockets.on('connection', function (socket) {
    clientCount++;
    console.log(green+'Someone connected to port 9762. '+clientCount+' clients connected'+white);
    storeClients();
  });
  io.sockets.on('disconnect', (reason) => {
    clientCount--;
    console.log(green+'Someone disocnnected from port 9762. '+clientCount+' clients connected'+white);
    storeClients();
  });
  server.listen(9762);
}
connSocketOut();

let most_recent_block = 0;
sequelize.query("SELECT max(max_time) last_block FROM public.txscl_vis;").then((results, metadata) => {
  console.log("higest stored block "+results[0][0].last_block)
  most_recent_block = results[0][0].last_block/1000;

})


let blastTime = 0;
function getBlastTime() {
let blastStart_url = 'https://4qcnktspmb.execute-api.us-east-1.amazonaws.com/dev/activation';
  var options = {
    uri: blastStart_url,
    headers: { 'User-Agent': 'Request-Promise' },
    json: false
  };     
  rp(options)      
    .then(function (rpData) {
      blastTime = rpData.split('=')[1];
      console.log("Blast Start at "+blastTime+" local time = "+Date.now()/1000);
      io.sockets.emit('blastoff', blastTime);
    })
  .catch(function (err) {
    console.log(red+"Error in blastoff! = "+err+white);
  });
}
getBlastTime();
setInterval(function() { getBlastTime(); }, 10000);

let min_ts = 0;
let max_ts = 0;
const dynomatic = (err, resp) => {
  let j_arr = [];
  console.log('----------------------------------------------------------------------');
  if (err) {
    console.log('Error running scan', err);
  } else {
    if (resp.Count > 0) {
    min_ts = 9999999999999999;
    max_ts = 0;
    console.log(mdblue+'got '+ltblue+resp.Count+mdblue+' blocks from DynamoDB at '+resp.Items[0].attrs.timestamp+grey);
      for (var k = resp.Count - 1; k >= 0; k--) {
        // add record to array 
        j_arr.push(resp.Items[k].attrs);
        // get min and max timestamps
        if (resp.Items[k].attrs.timestamp > max_ts) { max_ts = resp.Items[k].attrs.timestamp; };
        if (resp.Items[k].attrs.timestamp < min_ts) { min_ts = resp.Items[k].attrs.timestamp; };
      }
      storeRaw(j_arr);
      min_ts = Math.floor(min_ts/5)*5;
      max_ts = Math.ceil(max_ts/5)*5;
      let range_ts = max_ts-min_ts;
        // split records into 5 second interval chunks for processing
        let num_chunks = Math.ceil(range_ts/5);
        console.log("block time range: is "+min_ts+" - "+max_ts+" ("+range_ts+") num chunks = "+num_chunks);
        for (var i = 0; i < num_chunks; i++) {

          let chunk = j_arr.filter(val => val.timestamp > min_ts+5*i);
          chunk = chunk.filter(val => val.timestamp < min_ts+5*(i+1));
          setTimeout(function() { console.log("processing Chunk "+i); aggregateBlocks(chunk) }, 1000*i); 

        }
    }
    else {
      console.log(red+"zero records returned from DynamoDB"+grey);
    }
    if (resp.ConsumedCapacity) {
      console.log('----------------------------------------------------------------------');
      console.log('Scan consumed: ', resp.ConsumedCapacity);
    }
  }
  console.log('----------------------------------------------------------------------');
};

function scanDBall(since) {
    console.log(since);
    txsc_table
    .scan()
    .loadAll()
    .where('timestamp').gte(since)
    .exec(dynomatic);
}

// **************************************************** get blockinfo from DynamoDB and emit to visualisation server
function getBlocks(state) {
  if (state == 'random') {
    random = true;
    console.log(mdblue+'got '+ltblue+num_blocks+mdblue+' blocks from random data'+grey);
    aggregateBlocks(genRandomBlocks());   
  }
  else {
    let sinceTime = most_recent_block-15;
    random = false;
    console.log("getting blocks from sinceTime - "+sinceTime);
    scanDBall(sinceTime);  
  } 
}

let chainHeights = [];
function aggregateBlocks(json) {
  let num_blk = json.length;
  console.log(mdblue+'processing chunk with '+ltblue+num_blk+mdblue+' blocks'+grey+'');
  let j = 0;
  let k = 0;
  let tx_agg = 0;
  let pt_agg = 0;
  let size_agg = 0;
  let time_agg = 0;
  let ratio_blocksize = 0;
  for (var i = 0; i < num_blk; i++) {
    let chainID = json[i].chain+json[i].height;
    console.log(yellow+"processing "+chainID+grey);
    let timestamp_ch = json[i].timestamp;
    console.log(mdblue+"old height: "+chainHeights[json[i].chain])
    console.log("height: "+json[i].height+grey)
    if (chainHeights[json[i].chain] === undefined) {
      chainHeights[json[i].chain] = 0;
    }
    if (chainHeights[json[i].chain] < json[i].height) {
      j++;
      chainHeights[json[i].chain] = json[i].height;
      ac_Arr.push(json[i].chain);
      size_agg += json[i].size;
      tx_agg += json[i].totaltx;
      ratio_blocksize = size_agg/tx_agg;
      if (ratio_blocksize > 3500) {
          pt_agg += json[i].totaltx*100;
        }
        else {
          pt_agg += json[i].totaltx;
        }
      if (timestamp_ch > time_agg) {
        most_recent_block = timestamp_ch;
      }
      time_agg = most_recent_block;
    ac_active_5min = ac_Arr.filter(unique).length;
    console.log(green+"Block "+json[i].chain+" : "+json[i].height+" accepted"+grey)
    }
    else { console.log(red+"Block "+json[i].chain+" : "+json[i].height+" Already recorded"+grey); k++; }
  }
  console.log(yellow+j+" blocks accepted. "+k+" blocks rejected. ("+Math.round(j/(j+k)*100)+"%)"+grey)
  if (j > 0) {
    console.log(mdblue+ parseInt(tx_agg)+" ,"+pt_agg+" ,"+ratio_blocksize+" ,"+k+" ,"+time_agg+grey);
    updateDB(tx_agg,pt_agg,ratio_blocksize,j,time_agg);
  }
}

function updateDB(txag, ptag, ratio, nmag,ts) {
  console.log(nmag+" ************ "+txag);
  if ((nmag > 0) && (txag != 0)) {
    console.log(yellow+" ++++++++++++++++++++++++++++++++++++++++++++  UPDATING PGSQL DATABASE  ++++++++++++++++++++++++++++++++++++++++++++++++");  
  sequelize.query("INSERT INTO public.txscl_vis (max_time, sum_tx, sum_pt, count_block, ac_active_5min, random, blk_ratio, createdat) VALUES ("+ts*1000+", "+txag+", "+ptag+", "+nmag+", "+ac_active_5min+", '"+random+"',"+ratio+","+Math.round(Date.now()/1000)+");").spread((results, metadata) => {
      //console.log(ac_active_5min)
      io.sockets.emit('max_time', max_time);
      io.sockets.emit('ac_active_5min', ac_active_5min);
      console.log(ltgreen+nmag+green+" blocks with "+ltgreen+txag+green+" tx, "+ltgreen+ptag+green+" pt added to database at  "+ltgreen+new Date(ts*1000).toUTCString()+grey);
    })
    last_max_time = ts;
  }
  let timeNow = ts*1000;
  let time60sec = ts*1000-60000;
  sequelize.query("SELECT SUM(sum_tx) as tx_60sec, SUM(sum_pt) as pt_60sec FROM public.txscl_vis WHERE max_time BETWEEN "+time60sec+" AND "+timeNow+";").then((results, metadata) => {
    //console.log(results[0][0].tx_60sec);
    //console.log(results[0][0].pt_60sec);
    io.sockets.emit('tx_60sec', parseInt(results[0][0].tx_60sec));
    io.sockets.emit('pt_60sec', parseInt(results[0][0].pt_60sec));
  })
  let time5min = ts*1000-300000;
  sequelize.query("SELECT SUM(sum_tx) as tx_5min, SUM(sum_pt) as pt_5min, SUM(count_block) as blk_5min FROM public.txscl_vis WHERE max_time BETWEEN "+time5min+" AND "+timeNow+";").then((results, metadata) => {
    io.sockets.emit('global_5min', results);
    io.sockets.emit('tx_5min', parseInt(results[0][0].tx_5min));
    io.sockets.emit('pt_5min', parseInt(results[0][0].pt_5min));
    io.sockets.emit('blk_5min', parseInt(results[0][0].blk_5min));
  })
  console.log(grey);  
}


function storeRaw(json) {
  let timeNow = Date.now();
  let jsonHistory = '/var/www/html/json/raw'+timeNow+'.json';
    fs.writeFile(jsonHistory, json, function (err) {
      if (err) {
        if (err.code === 'EEXIST') {
          console.error('myfile already exists');
          return;
        }
        throw err;
      }
    });
}

// query db for last 5 min worth of data, and writes to json file
function writeHistory(prefix) {
  let timeNow = Date.now();
  let time5min = Date.now()-300000;
  let jsonHistory = '/var/www/html/json/'+timeNow+'_txscl_5min.json';
  sequelize.query("select json_agg(txscl_vis) from txscl_vis where max_time between "+time5min+" AND "+timeNow+";").then((results, metadata) => {
    let json_5min = JSON.stringify(results[0][0].json_agg);
    fs.writeFile(jsonHistory, json_5min, function (err) {
      if (err) {
        if (err.code === 'EEXIST') {
          console.error('file already exists');
          return;
        }
        throw err;
      }
    });
  })
}
//writeHistory();
//setInterval(function() { writeHistory(); }, 300000);

function timeString(timestamp) {
  var days = Math.floor(timestamp / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timestamp % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timestamp % (1000 * 60)) / 1000);
  let timeStr = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  return timeStr;
}

// ****************************************************  show uptime on console
function getUptime() {
  let uptime = Date.now() - initTime;
  let uptime_str = timeString(uptime);
  console.log(ltyellow+"--------------------------------------------------  UPTIME = "+uptime_str+"  --------------------------------------------------"+grey);
}
getUptime();
//setInterval(function() { getUptime(); }, 10000);
// setInterval(function() { getUptime(); getBlocks('random'); }, 5000);
setInterval(function() { getBlocks(); }, 5000);
// getBlocks('');

function storeClients() {
  sequelize.query("INSERT INTO public.txscl_x (max_time, client_count) VALUES ("+Date.now()+", "+clientCount+");").spread((results, metadata) => {
  })
}
setInterval(function() { io.sockets.emit('client_count', clientCount); }, 30000);

function writeHistorySorted(prefix) {
  let timeNow = Date.now();
  let jsonHistory = '/var/www/html/json/sorted_history.json';
  sequelize.query("select json_agg(txscl_vis) from txscl_vis where random = 'false' GROUP BY max_time order by max_time asc;").then((results, metadata) => { 
    let json_all = [];
    for (var i = JSON.stringify(results[0].length) - 1; i >= 0; i--) {
        json_all.push(JSON.stringify(results[0][i].json_agg[0]));
    }
    json_all = "["+json_all+"]";
    //console.log(json_all);
    fs.writeFile(jsonHistory, json_all, function (err) {
      if (err) {
        if (err.code === 'EEXIST') {
          console.error('file already exists');
          return;
        }
        throw err;
      }
    });
  })
}
setInterval(function() { writeHistorySorted(); }, 60000);
writeHistorySorted();

function genRandomBlocks() {
  let json_blocks = [];
  let ttx=0;
  let con_ptc = ac_active_5min/8192;
  let blocksgen = con_ptc*(Math.random()*1092+Math.random()*1092); if (blocksgen < 0) { blocksgen = 0 } else if (blocksgen > 1092) { blocksgen = 1092 };
  for (var i = blocksgen; i >= 0; i--) {
    let pptx = Math.round(Math.random()*8);
    // console.log(yellow+"pptx = "+pptx+" -----------------------------------------------------------------------------------------------------------------------------"+grey);
    if (pptx == 0 ) { // 1 pt mode
      ttx = Math.random()*8860*2-Math.random()*8860; if (ttx < 0) { ttx = 0 } else if (ttx > 8860) { ttx = 8860 };
      let jstr = { "chain":"TXSCL"+Math.floor(Math.random()*8192), "height":Math.random()*4000, "totaltx":ttx, "size":ttx*225, "timestamp":((Date.now()-Math.random()*5)/1000), "mempoolMB":1, "mempooltx":1 };
      json_blocks.push(jstr);
    }
    else { // 100 pt mode
      ttx = Math.random()*580*2-Math.random()*580; if (ttx < 0) { ttx = 0 } else if (ttx > 580) { ttx = 580 };
      let jstr = { "chain":"TXSCL"+Math.floor(Math.random()*8192), "height":Math.random()*4000, "totaltx":ttx, "size":ttx*3590, "timestamp":((Date.now()-Math.random()*5)/1000), "mempoolMB":100, "mempooltx":100 };
      json_blocks.push(jstr);
    }
  }
  return json_blocks;
}

  // mkdir ~/dynoscan; cd ~/dynoscan
  //npm init
  //npm install joi
  //npm install dynogels
  //npm install socket.io
  //npm install request
  //npm install request-promise
  //npm install pg
  //npm install sequelize
