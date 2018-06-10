function slideIn() {
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;
	let speedoWidth = document.getElementById('speedo').offsetWidth;
	let statsLeftWidth = document.getElementById('statsTableLeft').offsetWidth;
	let statsRightWidth = document.getElementById('statsTableRight').offsetWidth;
	document.getElementById('speedo').style.bottom = "120px";
	document.getElementById('speedo').style.left = (winWidth/2-speedoWidth/2)+"px";
	logoWidth = document.getElementById('kmdLogo').offsetWidth;
	document.getElementById('kmdLogo').style.left = (winWidth/2-speedoWidth/2)+"px";
	document.getElementById('kmdLogo').style.top = "10px";
	document.getElementById('statsTableLeft').style.left = (winWidth/2-speedoWidth/2-statsLeftWidth-10)+"px";
	document.getElementById('statsTableRight').style.left = (winWidth/2+speedoWidth/2+10)+"px";
	document.getElementById('txscl_graph').style.bottom = "-1em";
}

window.onresize = function() {
	scaleStats();
	slideIn();
};

function scaleStats() {
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;	
	document.getElementById("statsTableLeft").style.height = document.getElementById('barsLeft').clientHeight+20+"px";
	document.getElementById('statsTableRight').style.height = document.getElementById('statsTableLeft').clientHeight+"px";
	document.getElementById('speedo').style.height = document.getElementById('statsTableLeft').clientWidth*0.8+"px";
	speedoWidth = document.getElementById('statsTableLeft').clientWidth;
	document.getElementById('speedo').style.width = speedoWidth+"px";
	document.getElementById('logoImg').style.width = speedoWidth+"px";
	// document.getElementById('statsTableRight').setAttribute("style","height:"+document.getElementById('statsTableLeft').offsetHeight+"px");
}

scaleStats();
slideIn();