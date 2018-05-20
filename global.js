hoarder_url = "http://209.250.235.172:9762/";  

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

function positionElements() {
	document.getElementsByTagName("BODY")[0].fontSize = winHeight*0.02+"px";
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;
	speedoWidth = winWidth*540/1920;
	speedoHeight = winHeight*480/1080;
	statsHeight = winHeight*420/1080;
	statsWidth = winWidth*360/1920;
	legendHeight = winHeight*420/1080;
	legendWidth = winWidth*300/1920;
	document.getElementById('speedo').style.top = "10px";
	document.getElementById('speedo').style.height = speedoHeight+"px";
	document.getElementById('speedo').style.width = speedoWidth+"px";
	document.getElementById('statsTable').style.height = statsHeight+"px";
	document.getElementById('statsTable').style.width = statsWidth+"px";
	document.getElementById('bubbleLegend').style.height = legendHeight+"px";
	document.getElementById('bubbleLegend').style.width = legendWidth+"px";
	legendWidth = document.getElementById('bubbleLegend').offsetWidth;
	document.getElementById('speedo').style.left = (winWidth/2-speedoWidth/2)+"px";
	document.getElementById('statsTable').style.left = (winWidth/2+speedoWidth/2)+"px";
	document.getElementById('bubbleLegend').style.left = (winWidth/2-speedoWidth/2-legendWidth-20)+"px";
	for (var i = stats_Arr.length - 1; i >= 0; i--) {
		if (document.getElementById(stats_Arr[i]+"Bar").offsetWidth > document.getElementById(stats_Arr[i]+"Border").offsetWidth ) {
			document.getElementById(stats_Arr[i]+"Bar").offsetWidth = document.getElementById(stats_Arr[i]+"Border").offsetWidth;
		}
		
	}
}

window.onresize = function() {
	positionElements();
};
positionElements();

