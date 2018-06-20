'use strict'
var dynogels = require('dynogels');
const Joi = require('joi');
const util = require('util');
const _ = require('lodash');
let io;
let http = require('http');
dynogels.AWS.config.loadFromPath('creds.json');


let clientCount = 0;

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
    });
    server.listen(9962);
}
connSocketOut();


const printResults = (err, resp) => {
  let j_arr = []
  console.log('----------------------------------------------------------------------');
  if (err) {
    console.log('Error running scan', err);
  } else {
    console.log('Found', resp.Count, 'items');
    let txscl_json = util.inspect(_.pluck(resp.Items, 'attrs'));
    for (var i = resp.Count - 1; i >= 0; i--) {
      console.log(resp.Items[i].attrs);
      j_arr.push((resp.Items[i].attrs));
    }
    io.sockets.emit('txscl_table', j_arr);
      console.log(j_arr);
    if (resp.ConsumedCapacity) {
      console.log('----------------------------------------------------------------------');
      console.log('Scan consumed: ', resp.ConsumedCapacity);
    }
  }

  console.log('----------------------------------------------------------------------');
};



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
setInterval(function() {
  txsc_table
    .scan()
    .where('timestamp').gte(0)
    .exec(printResults);
},5000)
