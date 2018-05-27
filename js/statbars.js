'use strict'


let sbLbl_Arr = ['lbl_1','lbl_2','lbl_3','lbl_4','lbl_5'];

function getRandColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function blowScalebarBubbles() {
	document.getElementById('scalebarBubbles').innerHTML = "";
	let maxBubble = getWidth()*0.015;
	// #######################  Create Static Bubbles for Legend  ########################################
	var legendItemMargin = {top: 0, right: 0, bottom:maxBubble/2, left: maxBubble/2},
	    legendItemWidth = 0.9*document.getElementById('statsTableLeft').offsetWidth,
	    legendItemHeight = maxBubble - legendItemMargin.top - legendItemMargin.bottom;

	var legendItems = [
		{legendItem: "2", diameter: legendItemWidth/15, color: getRandColor()},
		{legendItem: "4", diameter: 2*legendItemWidth/15, color: getRandColor()},
		{legendItem: "6", diameter: legendItemWidth/5, color: getRandColor()},
		{legendItem: "8", diameter: 4*legendItemWidth/15, color: getRandColor()},
		{legendItem: "10", diameter: legendItemWidth/3, color: getRandColor()}
	];
	  
	var legendItemScale = d3.scaleLinear()
		.domain([0, d3.max(legendItems, function(d) { return d.diameter; })])
		.range([0, maxBubble]);
	  
	var padding = document.getElementById('statsTableLeft').offsetWidth*0.015;	
	legendItems.forEach( function(d,i) {
		if(i === 0) { 
			d.offset = 0; 
		} else {
			d.offset = legendItems[i-1].offset + legendItemScale(legendItems[i-1].diameter) + padding+padding*3/i;
		}
	});

	var svg = d3.select("#scalebarBubbles")
	    .append("svg")
	        .attr("width", legendItemWidth + legendItemMargin.left + legendItemMargin.right)
	        .attr("height", legendItemHeight + legendItemMargin.top + legendItemMargin.bottom)
	    .append("g")
	        .attr("transform", "translate(" + (legendItemMargin.left) + "," + legendItemMargin.bottom + ")");

	var gradientRadial = svg.append("defs").selectAll("radialGradient")
		.data(legendItems)
		.enter().append("radialGradient")
		.attr("id", function(d){ return "gradient-" + d.legendItem; })
		.attr("cx", "30%")
		.attr("cy", "30%")
		.attr("r", "65%");
	  
	gradientRadial.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", function(d) { return d3.rgb(d.color).brighter(1); });
	gradientRadial.append("stop")
		.attr("offset", "50%")
		.attr("stop-color", function(d) { return d.color; });
	gradientRadial.append("stop")
		.attr("offset",  "100%")
		.attr("stop-color", function(d) { return d3.rgb(d.color).darker(1.5); });
		
	svg.selectAll(".legendItemsGradient")
		.data(legendItems)
		.enter().append("circle")
		.attr("class", "legendItemsGradient")
		.attr("cx", function(d, i) { return 0.9*document.getElementById('bubbleLegend').offsetWidth*(i*i*1.2)/(legendItems.length*(i+1)) })
		// .attr("cx", function(d, i) { return d.offset + legendItemScale(d.diameter)/2 - padding; })
		//.attr("cx", function(d, i) { return 0.5*document.getElementById('statsTableLeft').offsetWidth*(i)/legendItems.length+2*legendItemScale(d.diameter)-maxBubble/2+"px"; })
		.attr("cy", function(d, i) { return  maxBubble/2 - legendItemScale(d.diameter)/2; })
		.attr("r", function(d) { return legendItemScale(d.diameter)/2; })
		.style("fill", function(d) { return "url(#gradient-" + d.legendItem + ")"; });
		let shifty=0;
		for (var i = sbLbl_Arr.length - 1; i >= 0; i--) {
			if (i==0) {
				shifty=-10;
			}
			document.getElementById(sbLbl_Arr[i]).style.left = shifty+0.9*document.getElementById('bubbleLegend').offsetWidth*(i*i*1.2)/(sbLbl_Arr.length*(i+1))+document.getElementById('bubbleLegend').offsetWidth*0.1+"px";
	 } 
}
blowScalebarBubbles();



function updateStatusBar(id, stat) {
	let barSize = 0;
	let label = id+"Label";
	let bar = id+"Bar";
	let border = id+"Border";
	let borderWidth = document.getElementById(border).clientWidth;


	if (stat < 0) { stat = 0; }
	switch(id) {
	    case 'tx5min':
	      barSize = stat/maxTx5min;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Total transactions (last 5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'txPerBlock':
	      barSize = stat/maxTxPerBlock;
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+stat.toFixed(2)+"</span> Transactions per block (last 5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'aveChainTX':
	      barSize = stat/maxAveChainTx;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+stat.toFixed(2)+"</span> Transactions per Asset Chain (last 5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'pt5min':
	      barSize = stat/maxPt5min;
	      if (barSize !== barSize) { barSize = 0; }
	      console.log("PT 5 min: "+stat);
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Total payments (last 5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'ptPerBlock':
	      console.log("PT Per Block: "+stat);
	      barSize = stat/maxPtPerBlock;
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+stat.toFixed(2)+"</span> Payments per block (last 5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
			console.log("ID: "+id);
			console.log("Value: "+stat);
			console.log("Max: "+maxPtPerBlock);
			console.log("barSize: "+barSize);
			console.log("------------------------");
	      break;
	    case 'aveChainPT':
	      barSize = stat/maxAveChainPt;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      console.log("PT Per Chain: "+stat);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+stat.toFixed(2)+"</span> Payments per Asset Chain (last 5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'numApiConn':
	      barSize = stat/totalNumChains;
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+" / "+totalNumChains+"</span> APIs connected";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'numChainActive':
	      barSize = stat/numApiConn;
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"/ "+numApiConn+"</span> Asset Chains Active (last 5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'block5min':
	      barSize = stat/maxBlock5min;
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+Math.round(stat)+"</span> Blocks Solved (last 5 minutes)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'blockPerChain':
	      barSize = stat/maxBlockPerChain;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+stat.toFixed(2)+"</span> Blocks per Asset Chain (last 5 min)";
	      document.getElementById(bar).style.width = barSize*borderWidth+"px";
	      break;
	    case 'ptPerTx':
	      barSize = stat/maxPtPerTx;
	      if (barSize !== barSize) { barSize = 0; }
	      barSize = limitToOne(barSize);
	      console.log("PT Per TX: "+stat);
	      document.getElementById(label).innerHTML = " <span style='font-weight:900;'>"+stat.toFixed(2)+"</span> Payments per transaction (last 5 min)";
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
	ptPerTx = (pt5min / tx5min); if (ptPerTx < 1) { ptPerTx = 1 };
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
	updateNeedle();
	
}
// setInterval(function() { setRandomStats() }, 3000);
 window.rInterval(function(){ setRandomStats(); },3000);


var interval1,timeout1;
//window.onload=function(){
 //timeout1=window.rtimeOut(function(){console.log('timeout1')},5000);
//}

/* to clear
interval1.clear();
timeout1.clear();
*/