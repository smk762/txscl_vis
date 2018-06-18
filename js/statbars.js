'use strict'
function updateStatusBar(id, stat) {
	console.log("id: "+id);
	console.log("stat: "+stat);
	console.log("------------------");
	let barSize = 0;
	let label = id+"Label";
	let bar = id+"Bar";
	let border = id+"Border";
	let value = 0;
	let borderWidth = document.getElementById(border).clientWidth;
	if (stat < 0) { stat = 0; }
	if (stat == NaN) { stat = 0; }
	switch(id) {		
	    case 'tx_5min':
	      barSize = stat/maxTx5min;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      console.log(stat+" / "+value)
	      console.log(typeof stat+" / "+typeof value)
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Transactions (last 5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_5min':
	      barSize = parseInt(stat)/maxPt5min;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Payments (last 5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'blk_5min':
	      barSize = stat/maxBlock5min;
	      barSize = limitToOne(barSize);
	      value = stat;
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Blocks Solved (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'tx_per_block':
	      barSize = stat/maxTxPerBlock;
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Transactions per block (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'tx_per_chain':
	      barSize = stat/maxAveChainTx;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Transactions per Asset Chain (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_per_block':
	      console.log("PT Per Block: "+stat);
	      barSize = stat/maxPtPerBlock;
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Payments per block (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_per_chain':
	      barSize = stat/maxAveChainPt;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Payments per Asset Chain (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'ac_active_5min':
	      barSize = stat/8192;
	      barSize = limitToOne(barSize);
	      value = stat;
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Asset Chains Active (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'block_per_chain':
	      barSize = stat/maxBlockPerChain;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Blocks per Asset Chain (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_per_tx':
	      barSize = stat/maxPtPerTx;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Payments per transaction (5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    default:
	      barSize = 0;
  }
}

function prettifyValue(val) {
	if (val > 1000000000) {
		val = (val/1000000000).toFixed(2)+" Bil";
	}
	else if (val > 1000000) {
		val = (val/1000000).toFixed(2)+" Mil";
	}
	else if (val > 10000) {
		val = (val/1000).toFixed(2)+" K";
	}
	else {
		val = val.toFixed(2);
	}
	return val;
}