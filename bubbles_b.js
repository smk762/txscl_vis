function setBubble(chain, height, txCount, solveTime, url) {

	// ADD ARRAY FOR BUBBLE CANVAS IDS TO ALLOW FOR TIMED DESTRUCTION

	//console.log(chain+", "+height+", "+txCount+", "+solveTime);
	var divId = chain+height+"_div";
	var canvasId = chain+height+"_canvas";
	document.getElementById('bubbleLayer').insertAdjacentHTML('afterbegin', '<a href="'+url+'" target="blank_"><div class="bubble" id="'+divId+'" style="position:absolute; left:0; "></div></a>');
	document.getElementById(divId).insertAdjacentHTML('afterbegin', '<div class="" id="'+canvasId+'" style="position:absolute; left:0; "></div>');
	var divObj = document.getElementById(divId);
	var canvasObj = document.getElementById(canvasId);
	// txCount = Math.random()*600;
	console.log(txCount+" $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
	
	bubbleScale=txCount/600*bubbleScaleFactor;
	if (txCount < 50) {
		var bubbleSize = 5/60*maxBubble;
	}
	else {
		var bubbleSize = bubbleScale*maxBubble;	
	}
	if (sendMany_state == 'on') {
		bubbleSize = bubbleSize/10;
	}
	var animWobble = wobbleArr[Math.floor(Math.random() * wobbleArr.length)];
	var bubbleSpeed = solveTime/60*animBaseline;
	var y = Math.random()*window.innerHeight*0.8-window.innerHeight*0.1;
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
	floatTime = 5000;
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
	// console.log("elements - "+document.getElementById('bubbleLayer').childElementCount);
}
// Code for Chrome, Safari and Opera
// Standard syntax

function stopAnimation(divObj) {
	divObj.style.animation = '';
}

function unsetBubble(chain, height) {
	var divId = chain+height+"_div";
	document.getElementById(divId).outerHTML = "";
}

function popBubble() {
	numBubbles = document.getElementById('bubbleLayer').childElementCount;
	if (numBubbles > 400) {
		for (var i = 0; i < numBubbles - maxNumBubbles; i++) {
			document.getElementById("bubbleLayer").lastChild.outerHTML = "";	
		}
	}
}
setInterval(function() { popBubble(); } ,4000);
function goRandom() {
 setInterval(function() { setBubble(("sa"+Math.floor(Math.random()*666)), (Math.floor(Math.random()*2222)), (Math.random()*6000), (20+Math.random()*60)); } ,15);
}
// goRandom();