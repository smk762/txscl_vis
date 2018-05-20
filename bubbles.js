function setBubble(chain, height, ptCount, solveTime, url) {
		//console.log(chain+", "+height+", "+txCount+", "+solveTime);
	if (bubble_state == 'on') {
		// set animation parameters
		var floatTime = 5000;
		var animWobble = wobbleArr[Math.floor(Math.random() * wobbleArr.length)];
		var bubbleSpeed = solveTime/60*animBaseline*speedFactor;

			//console.log("solveTime = "+solveTime);
			// console.log("bubbleSpeed = "+bubbleSpeed);
			//console.log("txCount = "+txCount);
			//console.log("txCount = "+txCount);
			//console.log("bubbleScaleFactor = "+bubbleScaleFactor);
			//console.log("scaleFactor = "+scaleFactor);
		// set bubble parameters
		var bubbleSize = ptCount/legendScale*maxBubble/60;
			//console.log("bubbleSize = "+bubbleSize);

		var bubbleSize = bubbleSize * bubbleScaleFactor;
			//console.log("bubbleSize = "+bubbleSize);


		var divId = chain+height+"_div";
		var canvasId = chain+height+"_canvas";
		document.getElementById('bubbleLayer').insertAdjacentHTML('afterbegin', '<a href="'+url+'" target="blank_"><div class="bubble" id="'+divId+'" style="position:absolute; left:0; "></div></a>');
		document.getElementById(divId).insertAdjacentHTML('afterbegin', '<div class="" id="'+canvasId+'" style="position:absolute; width:60px"><span class="bubbleText" style="">'+chain+'<br />('+Math.round(ptCount)+' pymnt) </span></div>');
		var divObj = document.getElementById(divId);
		var canvasObj = document.getElementById(canvasId);
		var y = Math.random()*window.innerHeight;
		divObj.style.transition =  'left '+bubbleSpeed+'s linear 1s';
	 	divObj.style.animation = animWobble+' '+(Math.random()*20+20)+'s  ease-in-out';
		divObj.style.left = '0px';
		divObj.style.top = y+'px';

		divObj.style.width = bubbleSize+'px';
		divObj.style.height = bubbleSize+'px';
		canvasObj.style.left = "0px";
		canvasObj.style.top = '0px';
		canvasObj.width = bubbleSize+"px";
		canvasObj.height = bubbleSize+"px";
		var margin = {top: 0, right: 0, bottom: 0, left: 0};
		var width = canvasObj.clientWidth - margin.left - margin.right;	
		var height = canvasObj.clientHeight - margin.top - margin.bottom;
		var bubbleColor = getRandColor();
		var xPos = 0;
		var blockBubble = [	{ chainName: chain, diameter: bubbleSize, color: bubbleColor, offset: 0 } ];
		
		//Add the svg canvas
			var svg = d3.select("#"+canvasId)
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
		divObj.addEventListener("webkitAnimationEnd", function() { unsetBubble(divId);});
		divObj.addEventListener("animationend", function() { unsetBubble(divId);});
		setTimeout(function() { unsetBubble(divId); },4000);
		console.log("num bubbles - "+document.getElementById('bubbleLayer').childElementCount);
	}
}
// Code for Chrome, Safari and Opera
// Standard syntax

function stopAnimation(divObj) {
	divObj.style.animation = '';
}

function unsetBubble(chain, height) {
//	var divId = chain+height+"_div";
//	document.getElementById(divId).outerHTML = "";
}

function popBubble() {
	numBubbles = document.getElementById('bubbleLayer').childElementCount;
	if (numBubbles > 400) {
		for (var i = 0; i < numBubbles - maxNumBubbles; i++) {
			document.getElementById("bubbleLayer").lastChild.outerHTML = "";
		}
	}
}
setInterval(function() { popBubble(); } ,5000);

function goRandom() {
	if (randomState == 'off') {
		randomState = 'on';
											// setBubble(chain, height, txCount, solveTime, url)
		randomInterval = setInterval(function() { setBubble(("sa"+Math.floor(Math.random()*666)), (Math.floor(Math.random()*2222)), (Math.random()*6000), (20+Math.random()*60)); } ,15);
	}
	else {
		randomState = 'off';
		popBubbles();
		clearInterval(randomInterval);
	}
		
}
 // goRandom();

function popBubbles() {
	document.getElementById("bubbleLayer").innerHTML = "";
}

// #######################  Create Bubbles for legend  ########################################

var legendItemMargin = {top: 0, right: 0, bottom: 10, left: 40},
    legendItemWidth = 80 - legendItemMargin.left - legendItemMargin.right,
    legendItemHeight = 280 - legendItemMargin.top - legendItemMargin.bottom;

var legendItems = [
	{legendItem: "1", diameter: 5, color: "#FF0000"},
	{legendItem: "10", diameter: 10, color: "#FFE100"},
	{legendItem: "20", diameter: 20, color: "#00B621"},
	{legendItem: "30", diameter: 30, color: "#7F006E"},
	{legendItem: "40", diameter: 40, color: "#0094FF"},
	{legendItem: "50", diameter: 50, color: "#C10000"},
	{legendItem: "60", diameter: 60, color: "#719F00"}
];
  
var legendItemScale = d3.scale.linear()
	.domain([0, d3.max(legendItems, function(d) { return d.diameter; })])
	.range([0, 60]);
  
var padding = 3;	
legendItems.forEach( function(d,i) {
	if(i === 0) { 
		d.offset = 0; 
	} else {
		d.offset = legendItems[i-1].offset + legendItemScale(legendItems[i-1].diameter) + padding*2+10/i;
	}
});

var svg = d3.select("#legendBubbles")
    .append("svg")
        .attr("width", legendItemWidth + legendItemMargin.left + legendItemMargin.right)
        .attr("height", legendItemHeight + legendItemMargin.top + legendItemMargin.bottom)
    .append("g")
        .attr("transform", "translate(" + (legendItemMargin.left) + "," + legendItemMargin.top + ")");

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
	.attr("cx", 0)
	.attr("cy", function(d, i) { return d.offset + legendItemScale(d.diameter)/2 + padding; })
	.attr("r", function(d) { return legendItemScale(d.diameter)/2; })
	.style("fill", function(d) { return "url(#gradient-" + d.legendItem + ")"; });