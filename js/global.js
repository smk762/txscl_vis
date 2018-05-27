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
hoarder_url = "http://209.250.235.172:9762/";  
var jsonHistory = 'https://cryptogeology.com/globalpt.json';

var sendMany_multiplier = 1;
var sendMany_state = 'off';
var bubble_state = 'off';
var bubble_scale = 'off';
var bubbleScale_state = 'off';
var randomState = 'off';
var bubbleScaleFactor = 1;
var scaleFactor = 1;
var legendLabelScale = 10;
var maxBubble = 30;
var maxNumBubbles = 600;
var animBaseline = 30;
var bubbleScale = 1;
var speedFactor = 1;
var legendScale = 1;

var globalTX = 0;
var globalPT = 0;

var lastHash = "";
var numBlockSolved = 0;
var sendMany_multiplier = 10;
var clientCount =0;

var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var padding = 0;
var wobbleArr = ['upDown1','upDown2','upDown3','upDown4','upDown5'];
var stats_Arr = ['numApiConn', 'numChainActive', 'block5min', 'blockPerChain', 'tx5min', 'pt5min', 'aveChainTX', 'aveChainPT', 'txPerBlock', 'ptPerBlock', 'ptPerTx'];

  let maxTx5min = 300*10000;
  let maxTxPerBlock = 10000;
  let maxAveChainTx = 10000;

  let maxPt5min = maxTx5min*100;
  let maxPtPerBlock = maxTxPerBlock*100;
  let maxAveChainPt = maxAveChainTx*100;
  
  let totalNumChains = 1024;
  let maxBlock5min = 10*totalNumChains;
  let maxBlockPerChain = 10;
  let maxPtPerTx = 100;

  let numApiConn = 0;
  let numChainActive = 0;
  let block5min = 0;
  let blockPerChain = 0;
  // transaction and payment metrics
  let tx5min = 0;
  let txPerBlock = 0;
  let aveChainTX = 0;
  let pt5min = 0;
  let ptPerBlock = 0;
  let aveChainPT = 0;
  // payment to transaction ratio
  let ptPerTx = 0;