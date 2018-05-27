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

var maxTxPerBlock = 10000;
var maxPtPerBlock = 60000;
var txPerBlock = 0;
var ptPerBlock = 0;
var aveChainTX = 0;
var aveChainPT = 0;
var tx5min = 0;
var pt5min = 0;
var globalTX = 0;
var globalPT = 0;

var lastHash = "";
var totalNumChains = 1024;
var blockPerChain = 0;
var numBlockSolved = 0;
var numChainActive = 0;
var sendMany_multiplier = 10;
var clientCount =0;

var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var padding = 0;
var wobbleArr = ['upDown1','upDown2','upDown3','upDown4','upDown5'];
var stats_Arr = ['numApiConn', 'numChainActive', 'numBlockSolved', 'blockPerChain', 'tx5min', 'pt5min', 'aveChainTX', 'aveChainPT', 'txPerBlock', 'ptPerBlock'];
