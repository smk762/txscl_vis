'use strict'
function updateStatusBar(id, stat) {
	console.log("id: "+id);
	console.log("stat: "+stat);
	//console.log("type: "+typeof stat);
	//console.log("------------------");
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
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Transactions per minute";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_5min':
	      barSize = parseInt(stat)/maxPt5min;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Payments per minute";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'blk_5min':
	      barSize = stat/maxBlock5min;
	      barSize = limitToOne(barSize);
	console.log("id: "+id);
	console.log("stat: "+stat);
	      value = stat;
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Blocks Solved per minute";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'tx_per_block':
	      barSize = stat/maxTxPerBlock;
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Transactions per block";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'tx_per_chain':
	      barSize = stat/maxAveChainTx;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Transactions per Asset Chain";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_per_block':
	      barSize = stat/maxPtPerBlock;
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Payments per block";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_per_chain':
	      barSize = stat/maxAveChainPt;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Payments per Asset Chain";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'ac_active_5min':
	      barSize = stat/8192;
	      barSize = limitToOne(barSize);
	      value = stat;
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Asset Chains Active";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'block_per_chain':
	      barSize = stat/maxBlockPerChain;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Blocks per Asset Chain";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt_per_tx':
	      barSize = stat/maxPtPerTx;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      value = prettifyValue(stat);
	      document.getElementById(label).innerHTML = " <span class='statVal'>"+value+"</span> Payments per transaction";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    default:
	      barSize = 0;
  }
}
