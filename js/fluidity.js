
function positionElements() {
	document.getElementsByTagName("BODY")[0].fontSize = winHeight*0.02+"px";
	logoWidth = speedoWidth*0.8;
	logoHeight = speedoHeight*0.8;
	statsHeight = winHeight*420/1080;
	statsWidth = winWidth*300/1920;
	legendHeight = winHeight*420/1080;
	legendWidth = winWidth*300/1920;
	speedoWidth = document.getElementById('speedo').offsetWidth;
	document.getElementById('speedo').style.left = (winWidth/2-speedoWidth/2)+"px";
	statsWidth = document.getElementById('statsTable').offsetWidth;
	document.getElementById('statsTable').style.left = (winWidth/2+speedoWidth/2)+"px";
	legendWidth = document.getElementById('statsTableLeft').offsetWidth;
	for (var i = stats_Arr.length - 1; i >= 0; i--) {
		if (document.getElementById(stats_Arr[i]+"Bar").offsetWidth > document.getElementById(stats_Arr[i]+"Border").offsetWidth ) {
			document.getElementById(stats_Arr[i]+"Bar").style.width = document.getElementById(stats_Arr[i]+"Border").offsetWidth+"px";
		}
		
	} 
}

function slideIn() {
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;
	let speedoWidth = document.getElementById('speedo').offsetWidth;
	let statsLeftWidth = document.getElementById('statsTableLeft').offsetWidth;
	let statsRightWidth = document.getElementById('statsTableRight').offsetWidth;
	document.getElementById('speedo').style.top = "10px";
	document.getElementById('speedo').style.left = (winWidth/2-speedoWidth/2)+"px";
	logoWidth = document.getElementById('kmdLogo').offsetWidth;
	document.getElementById('kmdLogo').style.left = (winWidth/2-speedoWidth/2)+"px";
	document.getElementById('kmdLogo').style.top = document.getElementById('speedo').offsetHeight+10+"px";
	document.getElementById('statsTableLeft').style.left = (winWidth/2-speedoWidth/2-statsLeftWidth-10)+"px";
	document.getElementById('statsTableRight').style.left = (winWidth/2+speedoWidth/2+10)+"px";
	document.getElementById('txscl_graph').style.bottom = "-1em";
}

window.onresize = function() {
	//positionElements();
	scaleElements();
	slideIn();
};

function scaleElements() {
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;	
	blowScalebarBubbles();
	scaleStats();
}

function scaleStats() {
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;	
	document.getElementById("statsTableLeft").style.height = document.getElementById('barsLeft').clientHeight+"px";
	document.getElementById('statsTableRight').style.height = document.getElementById('statsTableLeft').clientHeight+"px";
	document.getElementById('speedo').style.height = document.getElementById('statsTableLeft').clientWidth*0.8+"px";
	speedoWidth = document.getElementById('statsTableLeft').clientWidth;
	document.getElementById('speedo').style.width = speedoWidth+"px";
	document.getElementById('scalebarBubbles').style.width = document.getElementById('label_values').clientWidth+"px";
	document.getElementById('logoImg').style.width = speedoWidth+"px";
	// document.getElementById('statsTableRight').setAttribute("style","height:"+document.getElementById('statsTableLeft').offsetHeight+"px");
}


scaleElements();
slideIn();