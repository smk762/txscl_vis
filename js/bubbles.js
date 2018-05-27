function setBubble(chain, height, ptCount, solveTime) {
	let maxNumBubbles = parseInt(document.getElementById("bubbleNumberOf").value) * 100;
	let numBubbles = document.getElementById('bubbleLayer').childElementCount;

	console.log("bscale = "+Math.pow(10,parseInt(document.getElementById("bubbleScale").value)));
	console.log("num bubbles - "+document.getElementById('bubbleLayer').childElementCount+"/"+maxNumBubbles);
	//console.log("slider val "+document.getElementById("bubbleNumberOf").value);
	if (maxNumBubbles == 0) {
		document.getElementById('bubbleLayer').innerHTML = "";		
	}
	if (numBubbles < maxNumBubbles ) {
		let bubbleSpeed = 1/parseInt(document.getElementById("bubbleSpeed").value) * (Math.random()*40+80);
		let bubbleSize =  ptCount*10/(Math.pow(10,parseInt(document.getElementById("bubbleScale").value)));
		let bubbleColor = getRandColor();
		let winWidth = window.innerWidth;
		// set animation parameters
		var animWobble = wobbleArr[Math.floor(Math.random() * wobbleArr.length)];
		// set bubble parameters

		var divId = chain+height+"_div";
		var canvasId = chain+height+"_canvas";
		document.getElementById('bubbleLayer').insertAdjacentHTML('afterbegin', '<div class="bubble" id="'+divId+'" onclick="shootBubble("'+divId+'");" style="position:absolute; left:0; "></div>');
		var divObj = document.getElementById(divId);
		var y = Math.random()*window.innerHeight;

		
		divObj.style.transition =  'left '+bubbleSpeed+'s linear 1s';
	 	divObj.style.animation = animWobble+' '+(Math.random()*20+20)+'s  ease-in-out';
		divObj.style.left = '0px';
		divObj.style.top = y+'px';
	

		divObj.style.width = bubbleSize+'px';
		divObj.style.height = bubbleSize+'px';
		var margin = {top: 0, right: 0, bottom: 0, left: 0};
		var width = divObj.clientWidth - margin.left - margin.right;	
		var height = divObj.clientHeight - margin.top - margin.bottom;
		var xPos = 0;
		var blockBubble = [	{ chainName: chain, diameter: bubbleSize, color: bubbleColor, offset: 0 } ];
		
		//Add the svg canvas
			var svg = d3.select("#"+divId)
		    .append("svg")
		        .attr("width", bubbleSize)
		        .attr("height", bubbleSize)
		    .append("g")
		        .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");
			
		//Radial gradient with the center at one end of the circle, as if illuminated from the side
		var gradientRadial = svg.append("defs").selectAll("radialGradient")
			.data(blockBubble)
			.enter().append("radialGradient")
			.attr("id", function(d){ return "gradient-" + divId; })
			.attr("cx", "30%")
			.attr("cy", "30%")
			.attr("r", "65%");
		//console.log(chain+"----------------------------------------")
		  
		//Append the color stops
		gradientRadial.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", function(d) { return d3.rgb(d.color).brighter(1); });
		gradientRadial.append("stop")
			.attr("offset", "50%")
			.attr("stop-color", function(d) { return d.color; });
		gradientRadial.append("stop")
			.attr("offset",  "100%")
			.attr("stop-color", function(d) { return d3.rgb(d.color).darker(1.5); });
			
		//Add the blockBubble
		svg.selectAll(".blockBubbleGradient")
			.data(blockBubble)
			.enter().append("circle")
			.attr("class", "blockBubbleGradient")
			//.attr("cx", function(d, i) { return  d.diameter/2 + padding; })
			.attr("cx", function(d) { return d.diameter/2; })
			.attr("cy", function(d, i) { return  d.diameter/2; })
			.attr("r", function(d) { return d.diameter/2; })
			.style("fill", function(d) { return "url(#gradient-" + divId + ")"; });

		divObj.style.left = (winWidth*1.1)+"px";
		divObj.addEventListener("webkitTransitionEnd", function() { document.getElementById(divId).outerHTML =  ""; });
		divObj.addEventListener("transitionend", function() { document.getElementById(divId).outerHTML =  ""; });
		
	}
}
// Code for Chrome, Safari and Opera
// Standard syntax

function shootBubble(div) {
	document.getElementById(div).innerHTML = "";
}
bubble_state = 'on';
 randomInterval = setInterval(function() { setBubble(("sa"+Math.floor(Math.random()*666)), (Math.floor(Math.random()*100)), (Math.random()*100), (Math.random()*60)); } ,30);
//window.rInterval(function(){ setBubble(("sa"+Math.floor(Math.random()*666)), (Math.floor(Math.random()*100)), (Math.random()*100), (Math.random()*60)); },100);


// #######################  Create Bubbles for legend  ########################################

var legendItemMargin = {top: 10, right: 0, bottom: 20, left: 40},
    legendItemWidth = 300 - legendItemMargin.left - legendItemMargin.right,
    legendItemHeight = 80 - legendItemMargin.top - legendItemMargin.bottom;

var legendItems = [
	{legendItem: "2", diameter: 2, color: getRandColor()},
	{legendItem: "4", diameter: 4, color: getRandColor()},
	{legendItem: "6", diameter: 6, color: getRandColor()},
	{legendItem: "8", diameter: 8, color: getRandColor()},
	{legendItem: "10", diameter: 10, color: getRandColor()}
];
  
var legendItemScale = d3.scale.linear()
	.domain([0, d3.max(legendItems, function(d) { return d.diameter; })])
	.range([0, maxBubble]);
  
var padding = 3;	
legendItems.forEach( function(d,i) {
	if(i === 0) { 
		d.offset = 0; 
	} else {
		d.offset = legendItems[i-1].offset + legendItemScale(legendItems[i-1].diameter) + padding*2+14/i;
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
	.attr("cx", function(d, i) { return d.offset + legendItemScale(d.diameter)/2 - padding; })
	.attr("cy", 0)
	.attr("r", function(d) { return legendItemScale(d.diameter)/2; })
	.style("fill", function(d) { return "url(#gradient-" + d.legendItem + ")"; });