'use strict'
function updateStatusBar(id, stat) {
	let barSize = 0;
	let label = id+"Label";
	let bar = id+"Bar";
	let border = id+"Border";
	let borderWidth = document.getElementById(border).clientWidth;
			// console.log("borderWidth: "+borderWidth);
	if (stat < 0) { stat = 0; }
	switch(id) {
		
	    case 'tx_5min':
	      barSize = stat/maxTx5min;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Total transactions (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_5min':
	      barSize = parseInt(stat)/maxPt5min;
	      if (barSize !== barSize) { barSize = 0; }
	      console.log("PT 5 min: "+stat);
	      console.log("PT 5 min bar: "+barSize);
	      console.log("PT 5 min bord: "+borderWidth);
	      barSize = limitToOne(barSize);
	      console.log("PT 5 min d: "+barSize*borderWidth);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Total payments (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'blk_5min':
	      barSize = stat/maxBlock5min;
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Blocks Solved (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'tx_per_block':
	      barSize = stat/maxTxPerBlock;
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Transactions per block (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'tx_per_chain':
			console.log("ID: "+id);
			console.log("Value: "+stat+" ("+typeof stat+")");
			console.log("maxval: "+maxAveChainTx);
	      barSize = stat/maxAveChainTx;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Transactions per Asset Chain (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_per_block':
	      console.log("PT Per Block: "+stat);
	      barSize = stat/maxPtPerBlock;
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Payments per block (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_per_chain':
	      barSize = stat/maxAveChainPt;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      console.log("PT Per Chain: "+stat);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Payments per Asset Chain (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'ac_active_5min':
	      barSize = stat/8192;
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"/"+8192+"</span> Asset Chains Active (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'block_per_chain':
	      barSize = stat/maxBlockPerChain;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Blocks per Asset Chain (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_per_tx':
	      barSize = stat/maxPtPerTx;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      console.log("PT Per TX: "+stat);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Payments per transaction (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    default:
	      barSize = 0;
  }
}


function setRandomStats() {
	// block and network metrics
	numApiConn = Math.floor(numApiConn+8);
	if (numApiConn > totalNumChains) { numApiConn = totalNumChains; }
	numChainActive = Math.floor(numChainActive+Math.random()*4+4);
	if (numChainActive > numApiConn) { numChainActive = numApiConn; }
	maxBlock5min = 10*numChainActive;
	block5min = Math.abs((block5min+Math.random()*5*numChainActive-Math.random()*5*numChainActive));
	if (block5min > maxBlock5min) { block5min = maxBlock5min; }
	blockPerChain = (block5min / numChainActive);
	maxBlockPerChain = 10;
	if (blockPerChain > maxBlockPerChain) { blockPerChain = maxBlockPerChain; }
	// transaction and payment metrics
	maxTx5min = block5min*maxTxPerBlock;
	tx5min = Math.abs((tx5min+Math.random()*maxTx5min/10-Math.random()*maxTx5min/10));
	if (tx5min > maxTx5min) { tx5min = maxTx5min; }
	txPerBlock = Math.abs((tx5min / block5min));
	aveChainTX = Math.abs((tx5min / numChainActive));
	maxPt5min = block5min*maxTxPerBlock*10;
	pt5min = Math.abs(pt5min+tx5min*Math.random()*10);
	if (pt5min > maxPt5min) { pt5min = maxPt5min; }
	ptPerBlock = Math.abs((pt5min / block5min));
	aveChainPT = Math.abs((pt5min / numChainActive));
	// payment to transaction ratio
	ptPerTx = (pt5min / tx5min);
	if (ptPerTx < 1) { ptPerTx = 1 };
	// payment per second, 60 sec average
	speedoVal = speedoVal+(Math.random()-Math.random())*10000;

	updateStatusBar('numApiConn',numApiConn); 
	updateStatusBar('numChainActive',numChainActive); 
	updateStatusBar('block5min',block5min); 
	updateStatusBar('blockPerChain',blockPerChain); 
	updateStatusBar('tx5min',tx5min);
	updateStatusBar('txPerBlock',txPerBlock);
	updateStatusBar('aveChainTX',aveChainTX); 
	updateStatusBar('pt5min',pt5min);
	updateStatusBar('ptPerBlock',ptPerBlock);
	updateStatusBar('aveChainPT',aveChainPT);
	updateStatusBar('ptPerTx',ptPerTx);
	
}
// setInterval(function() { setRandomStats() }, 3000);
 //window.rInterval(function(){ setRandomStats(); },3000);


//var interval1,timeout1;
//window.onload=function(){
 //timeout1=window.rtimeOut(function(){console.log('timeout1')},5000);
//}

/* to clear
interval1.clear();
timeout1.clear();
*/