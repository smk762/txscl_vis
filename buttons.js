function toggleBubble() {
  //console.log(document.getElementById('bubble_btn').innerHTML);
      bubble_state = 'on';
    if (document.getElementById('bubble_btn').innerHTML == 'Off<span class="bubbleon_tooltip">Turn bubbles on</span>') {
      document.getElementById('bubble_btn').background = 'linear-gradient(to top, rgba(5, 56, 56, .8), rgba(59, 104, 104, .7))';
      document.getElementById('bubble_btn').innerHTML = 'On<span class="bubbleon_tooltip">Turn blubbles off</span>';
    }
    else {
      bubble_state = 'off';
      document.getElementById('bubble_btn').background = 'linear-gradient(to top, rgba(23, 123, 17, 0.8), rgba(49, 204, 33, 0.7))';
      document.getElementById('bubble_btn').innerHTML = "Off<span class='bubbleon_tooltip'>Turn bubbles on</span>";
    }

}
function bubbleScaleUp() {
      legendScale = legendScale * 10;
      if (legendScale > 1000) {
        legendScale = 1000;
      }
      else if (legendScale >= 1) {
        legendScale = Math.round(legendScale);
      }

      //constrainBubbles(); 
     // constrainLegend();
      console.log("Legend label scale - "+legendScale.toFixed(2));
    document.getElementById('label_50').innerHTML = " 0-"+5*legendScale+" Payments";
    document.getElementById('label_100').innerHTML = " "+10*legendScale+" Payments";
    document.getElementById('label_200').innerHTML = " "+20*legendScale+" Payments";
    document.getElementById('label_300').innerHTML = " "+30*legendScale+" Payments";
    document.getElementById('label_400').innerHTML = " "+40*legendScale+" Payments";
    document.getElementById('label_500').innerHTML = " "+50*legendScale+" Payments";
    document.getElementById('label_600').innerHTML = " "+60*legendScale+" Payments";
    }
function bubbleScaleDown() {
      legendScale = legendScale / 10;
      if (legendScale >= 1) {
        legendScale = Math.round(legendScale);
      }
      else if (legendScale < 0.01) {
        legendScale = 0.01
      }
     // constrainBubbles(); 
     // constrainLegend();
      console.log("Legend label scale - "+legendScale.toFixed(2));
    document.getElementById('label_50').innerHTML = " 0-"+5*legendScale+" Payments";
    document.getElementById('label_100').innerHTML = " "+10*legendScale+" Payments";
    document.getElementById('label_200').innerHTML = " "+20*legendScale+" Payments";
    document.getElementById('label_300').innerHTML = " "+30*legendScale+" Payments";
    document.getElementById('label_400').innerHTML = " "+40*legendScale+" Payments";
    document.getElementById('label_500').innerHTML = " "+50*legendScale+" Payments";
    document.getElementById('label_600').innerHTML = " "+60*legendScale+" Payments";
}
function bubbleSpeedUp() {
      speedFactor = speedFactor * 1.25;
      //console.log("Bubble speed factor - "+speedFactor);
    }
function bubbleSpeedDown() {
      speedFactor = speedFactor *0.8;
     // console.log("Bubble speed factor - "+speedFactor);
}
function constrainBubbles() {
  if (bubbleScaleFactor > 100) {
    bubbleScaleFactor = 100;
  }        
  else if (bubbleScaleFactor < 1) {
    bubbleScaleFactor = 1;
  }  
}
function constrainLegend() {
  if (legendLabelScale > 100) {
    legendLabelScale = 100;
  }        
  else if (legendLabelScale < 1) {
    legendLabelScale = 1;
  }  
}