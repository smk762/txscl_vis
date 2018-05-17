hoarder_url = "http://209.250.235.172:9762/";  
globalTX = 0;
lastHash = "";
numBlockSolved = 0;
numChainActive = 0;
peakGlobalTX = 30900;
// totalNumChains = 4096;
clientCount =0;
totalNumChains = 1024;
sendMany_multiplier = 1;
sendMany_state = 'off';

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
      bubbleScale_state = 'off';
      bubbleScaleFactor = 1;
// console.log(bubbleSize);
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var padding = 0;
var maxBubble = 60;
var animBaseline = 30;
var maxNumBubbles = 600;
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

document.getElementsByTagName("BODY")[0].onresize = function() {
	positionElements();
};
	positionElements();

function toggleBubbleScale() {
    if (document.getElementById('bubbleScale_btn').innerHTML == "Scale down bubbles") {
      sendMany_multiplier = 100;
      bubbleScale_state = 'on';
      bubbleScaleFactor = 0.1;
      legendLabelScale = 10;
      document.getElementById('bubbleScale_btn').innerHTML = "Scale up bubbles";
    //  updateStatusBar('sendManyMode', sendMany_multiplier);
      document.getElementById('label_50').innerHTML = " 0-"+50*legendLabelScale+" transactions";
      document.getElementById('label_100').innerHTML = " "+100*legendLabelScale+" transactions";
      document.getElementById('label_200').innerHTML = " "+200*legendLabelScale+" transactions";
      document.getElementById('label_300').innerHTML = " "+300*legendLabelScale+" transactions";
      document.getElementById('label_400').innerHTML = " "+400*legendLabelScale+" transactions";
      document.getElementById('label_500').innerHTML = " "+500*legendLabelScale+" transactions";
      document.getElementById('label_600').innerHTML = " "+600*legendLabelScale+" transactions";
      document.getElementById("bubbleScale_btn").className = "scale_on"; 
    }
    else {
      sendMany_multiplier = 1;
      bubbleScale_state = 'off';
      bubbleScaleFactor = 1;
      legendLabelScale = 1;
      document.getElementById('bubbleScale_btn').innerHTML = "Scale down bubbles";
     // updateStatusBar('sendManyMode', sendMany_multiplier);
      document.getElementById('label_50').innerHTML = " 0-"+50*legendLabelScale+" transactions";
      document.getElementById('label_100').innerHTML = " "+100*legendLabelScale+" transactions";
      document.getElementById('label_200').innerHTML = " "+200*legendLabelScale+" transactions";
      document.getElementById('label_300').innerHTML = " "+300*legendLabelScale+" transactions";
      document.getElementById('label_400').innerHTML = " "+400*legendLabelScale+" transactions";
      document.getElementById('label_500').innerHTML = " "+500*legendLabelScale+" transactions";
      document.getElementById('label_600').innerHTML = " "+600*legendLabelScale+" transactions";
    document.getElementById("bubbleScale_btn").className = "scale_off"; 
    }
}
  
