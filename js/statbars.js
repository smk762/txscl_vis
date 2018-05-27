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
