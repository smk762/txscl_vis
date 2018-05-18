hoarder_url = "http://209.250.235.172:9762/";  
globalTX = 0;
lastHash = "";
numBlockSolved = 0;
numChainActive = 0;
peakGlobalTX = 30900;
// totalNumChains = 4096;
clientCount =0;
totalNumChains = 1024;
var sendMany_multiplier = 1;
var sendMany_state = 'off';
var bubble_state = 'off';
var bubble_scale = 'off';
var bubbleScale_state = 'off';
var randomState = 'off';
var bubbleScaleFactor = 1;
var scaleFactor = 1;
var legendLabelScale = 10;
var maxBubble = 60;
var maxNumBubbles = 600;
var animBaseline = 30;
var bubbleScale = 1;
var txType = "tx";
var txModeScale = 1/maxBubble;

aveChainTX = 0;
tx5min = 0;
totalNumChains = 1024;
aveChainTX = 0;
blockPerChain = 0;
txPerBlock = 0;
numBlockSolved = 0;
numChainActive = 0;
maxTxPerBlock = 60000;
sendMany_multiplier = 10;
clientCount =0;
globalTX = 0;

var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var padding = 0;
var wobbleArr = ['upDown1','upDown2','upDown3','upDown4','upDown5'];
///////////////////////////////////////////////////
////////////// Initialize the SVG /////////////////
///////////////////////////////////////////////////

var winHeight = window.innerHeight;
var winWidth = window.innerWidth;

function positionElements() {
	document.getElementById('speedo').style.left = (winWidth/2-270)+"px";
	document.getElementById('statsTable').style.left = (winWidth/2+270)+"px";
	document.getElementById('bubbleLegend').style.left = (winWidth/2-560)+"px";
}

window.onresize = function() {
	positionElements();
};
positionElements();

