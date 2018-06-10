'use strict'
let color = "";
window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)} // simulate calling code 60 
 
window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function(requestID){clearTimeout(requestID)} //fall back

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

function limitToOne(val) {
  if (val > 1) {
    val = 1;
  }
  return val;
};

function getRandColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandMidColor() {
  var letters = '3456789';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 7)];
  }
  return color;
}

function getRandGreen() {
  color = "";
  //var letters = '0123456789ABCDEF';
  var letters = '34567';
  for (var i = 0; i < 2; i++) {
    color += letters[Math.floor(Math.random() * 5)];
    console.log(color);
  }
  color="#00"+color+"00";
    console.log(color);
  return color;
}
function getRandBlue() {
  color = "";
  var letters = '0123456789ABCDEF';
  for (var i = 0; i < 2; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  color="#0000"+color;
  return color;
}
function getRandRed() {
  color = "";
  var letters = '0123456789ABCDEF';
  for (var i = 0; i < 2; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  color="#"+color+"0000";
  return color;
}

window.rInterval=function(callback,delay) {
  var dateNow=Date.now,
    requestAnimation=window.requestAnimationFrame,
    start=dateNow(),
    stop,
    intervalFunc=function() {
      dateNow()-start<delay||(start+=delay, callback());
      stop||requestAnimation(intervalFunc)
    }
  requestAnimation(intervalFunc);
  return {
    clear: function(){ stop=1 }
  }
}
function unique(value, index, self) { 
    return self.indexOf(value) === index;
}


function sortProperties(obj) {
  // convert object into array
    var sortable=[];
    for(var key in obj)
        if(obj.hasOwnProperty(key))
            sortable.push([key, obj[key]]); 
    // sort items by value
    sortable.sort(function(a, b) {
      return a[0]-b[0]; 
    });
    return sortable; 
}

var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

let hoarder_url = "http://cryptocartography.io:9762/";
let tx_5min = 0;
let pt_5min = 0;
let blk_5min = 0;
let tx_per_block = 0;
let pt_per_block = 0;
let tx_per_chain = 0;
let pt_per_chain = 0;
let pt_per_tx = 0;
let block_per_chain = 0;
let tx_60sec = 0;
let pt_60sec = 0;
let max_time = 0;
let ac_active_5min = 0;



var padding = 0;
var stats_Arr = ['numApiConn', 'numChainActive', 'block5min', 'blockPerChain', 'tx5min', 'pt5min', 'aveChainTX', 'aveChainPT', 'txPerBlock', 'ptPerBlock', 'ptPerTx'];

let maxTx5min = 300*10000;
let maxTxPerBlock = 10000;
let maxAveChainTx = 10000;

let maxPt5min = maxTx5min*1000;
let maxPtPerBlock = maxTxPerBlock*10;
let maxAveChainPt = maxAveChainTx*100;

let totalNumChains = 8192;
let maxBlock5min = 10*totalNumChains;
let maxBlockPerChain = 10;
let maxPtPerTx = 100;
