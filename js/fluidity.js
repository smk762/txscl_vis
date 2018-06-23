function slideIn() {
	var winHeight = window.innerHeight;
	var winWidth = window.innerWidth;
	let speedoWidth = document.getElementById('speedoDiv_tx').offsetWidth;
	let statsLeftWidth = document.getElementById('statsTableLeft').offsetWidth;
	let statsRightWidth = document.getElementById('statsTableRight').offsetWidth;
	document.getElementById('speedoDiv_tx').style.bottom = "160px";
	document.getElementById('speedoDiv_pt').style.left = (winWidth/2)+"px";
	document.getElementById('speedoDiv_pt').style.bottom = "160px";
	document.getElementById('speedoDiv_tx').style.left = (winWidth/2-speedoWidth)+"px";
	logoWidth = document.getElementById('kmdLogo').offsetWidth;
	document.getElementById('kmdLogo').style.left = (winWidth/2-speedoWidth/2)+"px";
	document.getElementById('kmdLogo').style.top = "10px";
	document.getElementById('statsTableLeft').style.left = (winWidth/2-speedoWidth-statsLeftWidth-10)+"px";
	document.getElementById('statsTableRight').style.left = (winWidth/2+speedoWidth+10)+"px";
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
	document.getElementById('speedoDiv_tx').style.height = document.getElementById('statsTableLeft').clientHeight-(0.02*winHeight)+"px";
	document.getElementById('speedoDiv_pt').style.height = document.getElementById('statsTableLeft').clientHeight-(0.02*winHeight)+"px";
	speedoWidth = document.getElementById('statsTableLeft').clientWidth;
	document.getElementById('speedoDiv_pt').style.width = speedoWidth+"px";
	document.getElementById('speedoDiv_tx').style.width = speedoWidth+"px";
	document.getElementById('logoImg').style.width = speedoWidth+"px";
	document.getElementById('speedoText_tx').style.bottom = 80+document.getElementById('speedoDiv_tx').offsetHeight+"px";
	document.getElementById('speedoText_pt').style.bottom = 80+document.getElementById('speedoDiv_pt').offsetHeight+"px";
    updateStatusBar('tx_per_block',tx_per_block);
    updateStatusBar('pt_per_block',pt_per_block);
    updateStatusBar('tx_per_chain',tx_per_chain);
    updateStatusBar('pt_per_chain',pt_per_chain);
    updateStatusBar('pt_per_tx',pt_per_tx);
    updateStatusBar('block_per_chain',block_per_chain);
    updateStatusBar('ac_active_5min',parseInt(ac_active_5min));
    updateStatusBar('tx_5min',tx_5min);
    updateStatusBar('pt_5min',pt_5min);
    updateStatusBar('blk_5min',blk_5min);
}

scaleStats();
slideIn();
     document.getElementById("txscl_graph").style.opacity = "0.95";
     document.getElementById("statsTableLeft").style.opacity = "0.95";
     document.getElementById("statsTableRight").style.opacity = "0.95";
     document.getElementById("speedoDiv_pt").style.opacity = "0.95";
     document.getElementById("speedoDiv_tx").style.opacity = "0.95";