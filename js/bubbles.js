function setBubble(chain, height, ptCount, solveTime) {
	let maxNumBubbles = parseInt(document.getElementById("bubbleNumberOf").value) * 100;
	let numBubbles = document.getElementById('bubbleLayer').childElementCount;

	//console.log("bscale = "+Math.pow(10,parseInt(document.getElementById("bubbleScale").value)));
	//console.log("num bubbles - "+document.getElementById('bubbleLayer').childElementCount+"/"+maxNumBubbles);
	//console.log("slider val "+document.getElementById("bubbleNumberOf").value);
	if (maxNumBubbles == 0) {
		document.getElementById('bubbleLayer').innerHTML = "";		
	}
	if (numBubbles < maxNumBubbles ) {
		var margin = {top: 0, right: 0, bottom: 0, left: 0};
		let bubbleSpeed = 1/parseInt(document.getElementById("bubbleSpeed").value) * (Math.random()*80+40);
		// let bubbleSize =  ptCount*10/(Math.pow(10,parseInt(document.getElementById("bubbleScale").value)));
		let bubbleSize =  ptCount*10/(Math.pow(10,parseInt(document.getElementById("bubbleScale").value)));
		let bubbleColor = getRandMidColor();
		let winWidth = window.innerWidth;
		// set animation parameters
		// var animWobble = wobbleArr[Math.floor(Math.random() * wobbleArr.length)];
		// set bubble parameters

		var divId = chain+height+"_div";
		var canvasId = chain+height+"_canvas";
		document.getElementById('bubbleLayer').insertAdjacentHTML('afterbegin', '<div class="bubble" id="'+divId+'"></div>');
		var divObj = document.getElementById(divId);
		var x = Math.random()*winWidth;

		
		// divObj.style.animation = animWobble+' '+(Math.random()*20+20)+'s  ease-in-out';
		divObj.style.transition =  'top '+bubbleSpeed+'s linear 1s';
	 	divObj.style.left = x+'px';
		divObj.style.top = winHeight+'px';
		divObj.style.width = bubbleSize+'px';
		divObj.style.height = bubbleSize+'px';
//		console.log(divObj.clientWidth);

		var width = Math.round(bubbleSize) - margin.left - margin.right;	
		var height = Math.round(bubbleSize) - margin.top - margin.bottom;
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

		divObj.style.top = -(winHeight*1.1)+"px";
		divObj.addEventListener("webkitTransitionEnd", function() { document.getElementById(divId).outerHTML =  ""; });
		divObj.addEventListener("transitionend", function() { document.getElementById(divId).outerHTML =  ""; });
		
	}
}

function dropBlok() {
		var divId = "div_"+Math.floor(Math.random()*100000);
		var canvasId = "canvas_"+Math.floor(Math.random()*100000);
		document.getElementById('bubbleLayer').insertAdjacentHTML('afterbegin', '<div class="bubble" id="'+divId+'"><img src="img/kmd_b.svg" /></div>');
		var divObj = document.getElementById(divId);
		let winWidth = window.innerWidth;
		var x = Math.random()*winWidth;

		var margin = {top: 0, right: 0, bottom: 0, left: 0};
		let bubbleSpeed = 1/parseInt(document.getElementById("bubbleSpeed").value) * (Math.random()*80+40);
		// let bubbleSize =  ptCount*10/(Math.pow(10,parseInt(document.getElementById("bubbleScale").value)));
		let bubbleColor = getRandMidColor();

		divObj.style.transition =  'top '+bubbleSpeed+'s linear 1s';
	 	divObj.style.left = x+'px';
		divObj.style.top = winHeight+'px';
		console.log(divObj.clientWidth);

		divObj.style.top = -(winHeight*1.1)+"px";
		divObj.addEventListener("webkitTransitionEnd", function() { document.getElementById(divId).outerHTML =  ""; });
		divObj.addEventListener("transitionend", function() { document.getElementById(divId).outerHTML =  ""; });		
}

//randomInterval = setInterval(function() { setBubble(("sa"+Math.floor(Math.random()*666)), (Math.floor(Math.random()*100)), (Math.random()*100), (Math.random()*60)); } ,40);
//window.rInterval(function(){ setBubble(("sa"+Math.floor(Math.random()*666)), (Math.floor(Math.random()*100)), (Math.random()*100), (Math.random()*60)); },47);

//randomInterval2 = setInterval(function() { dropBlok(("sa"+Math.floor(Math.random()*666)), (Math.floor(Math.random()*100)), (Math.random()*100), (Math.random()*60)); } ,52);
//window.rInterval(function(){ dropBlok(("sa"+Math.floor(Math.random()*666)), (Math.floor(Math.random()*100)), (Math.random()*100), (Math.random()*60)); },35);


