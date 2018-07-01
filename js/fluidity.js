function slideIn() {
	console.log("sliding");
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;
	let speedoWidth = document.getElementById('speedoDiv_tx').offsetWidth;
	let statsLeftWidth = document.getElementById('statsTableLeft').offsetWidth;
	let statsRightWidth = document.getElementById('statsTableRight').offsetWidth;
	document.getElementById('dashboard').style.top = "0px";
	logoWidth = document.getElementById('kmdLogo').offsetWidth;
	document.getElementById('kmdLogo').style.left = "40%";
	document.getElementById('kmdLogo').style.top = "30%";
	document.getElementById('kmdLogo').style.width = "20%";
	console.log("done");
}

window.onresize = function() {
	scaleStats();
	slideIn();
};

function scaleStats() {
	console.log("scaling");
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;
	document.getElementById("statsTableLeft").style.height = (document.getElementById('barsLeft').clientHeight+20)+"px";
	document.getElementById('statsTableRight').style.height = (document.getElementById('statsTableLeft').clientHeight)+"px";
	speedoWidth = document.getElementById('statsTableLeft').clientHeight;
	speedoHeight = document.getElementById('statsTableLeft').clientHeight;
	statsWidth = document.getElementById('statsTableLeft').clientWidth;
	document.getElementById('speedoDiv_tx').style.height = speedoHeight+"px";
	document.getElementById('speedoDiv_pt').style.height = speedoHeight+"px";
	document.getElementById('speedoDiv_pt').style.width = speedoWidth+"px";
	document.getElementById('speedoDiv_tx').style.width = speedoWidth+"px";
	document.getElementById('speedoDiv_pt').style.left = (winWidth/2)+"px";
	document.getElementById('speedoDiv_tx').style.left = (winWidth/2-speedoWidth)+"px";
	document.getElementById('statsTableRight').style.left = (winWidth/2+speedoWidth)+"px";
	document.getElementById('statsTableLeft').style.left = (winWidth/2-speedoWidth-statsWidth)+"px";
	document.getElementById('logoImg').style.width = "100%";
	document.getElementById('dashboard').style.top = "35%";
	document.getElementById('kmdLogo').style.left = "40%";
	document.getElementById('kmdLogo').style.top = "30%";
    updateStatusBar('tx_per_block',tx_per_block);
    updateStatusBar('pt_per_block',pt_per_block);
    updateStatusBar('tx_per_chain',tx_per_chain);
    updateStatusBar('pt_per_chain',pt_per_chain);
    updateStatusBar('pt_per_tx',pt_per_tx);
    updateStatusBar('tx_5min',tx_5min);
    updateStatusBar('pt_5min',pt_5min);
    updateStatusBar('blk_5min',blk_5min);
	console.log("done");
}

scaleStats();
slideIn();
     document.getElementById("txscl_graph").style.opacity = "0.95";
     document.getElementById("statsTableLeft").style.opacity = "0.95";
     document.getElementById("statsTableRight").style.opacity = "0.95";
     document.getElementById("speedoDiv_pt").style.opacity = "0.95";
     document.getElementById("speedoDiv_tx").style.opacity = "0.95";