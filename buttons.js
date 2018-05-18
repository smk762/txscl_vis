
function paymentsMode() {
  if (sendMany_state == 'off') {
    legendScale = legendScale * 100;
    txModeScale = txModeScale * 100;
    sendMany_state = 'on';
    txType ="pt";
    document.getElementById('tx_btn').background = 'linear-gradient(to top, rgba(5, 56, 56, .8), rgba(59, 104, 104, .7))';
    document.getElementById('pay_btn').background = 'linear-gradient(to top, rgba(23, 123, 17, 0.8), rgba(49, 204, 33, 0.7))';
    document.getElementById('label_50').innerHTML = " 0-"+5*legendScale+" transactions";
    document.getElementById('label_100').innerHTML = " "+10*legendScale+" transactions";
    document.getElementById('label_200').innerHTML = " "+20*legendScale+" transactions";
    document.getElementById('label_300').innerHTML = " "+30*legendScale+" transactions";
    document.getElementById('label_400').innerHTML = " "+40*legendScale+" transactions";
    document.getElementById('label_500').innerHTML = " "+50*legendScale+" transactions";
    document.getElementById('label_600').innerHTML = " "+60*legendScale+" transactions";
  }
}

function transactionsMode() {
  if (sendMany_state == 'on') {
    legendScale = legendScale / 100;
    txModeScale = txModeScale / 100;
    sendMany_state = 'off';
    txType ="tx";
    document.getElementById('pay_btn').background = 'linear-gradient(to top, rgba(5, 56, 56, .8), rgba(59, 104, 104, .7))';
    document.getElementById('tx_btn').background = 'linear-gradient(to top, rgba(23, 123, 17, 0.8), rgba(49, 204, 33, 0.7))';
    document.getElementById('label_50').innerHTML = " 0-"+5*legendScale+" transactions";
    document.getElementById('label_100').innerHTML = " "+10*legendScale+" transactions";
    document.getElementById('label_200').innerHTML = " "+20*legendScale+" transactions";
    document.getElementById('label_300').innerHTML = " "+30*legendScale+" transactions";
    document.getElementById('label_400').innerHTML = " "+40*legendScale+" transactions";
    document.getElementById('label_500').innerHTML = " "+50*legendScale+" transactions";
    document.getElementById('label_600').innerHTML = " "+60*legendScale+" transactions";
  }
}

function toggleBubble() {
  console.log(document.getElementById('bubble_btn').innerHTML);
    if (document.getElementById('bubble_btn').innerHTML == 'Bubbles on<span class="bubbleon_tooltip">Blocks blow bubbles</span>') {
      document.getElementById('bubble_btn').background = 'linear-gradient(to top, rgba(5, 56, 56, .8), rgba(59, 104, 104, .7))';
      document.getElementById('bubble_btn').innerHTML = "Bubbles off";
      bubble_state = 'off';
      document.getElementById('bubble_btn').insertAdjacentHTML('beforeend', '<span class="bubbleoff_tooltip">Blocks blow bubbles</span>');
    }
    else {
      bubble_state = 'on';
      document.getElementById('bubble_btn').background = 'linear-gradient(to top, rgba(23, 123, 17, 0.8), rgba(49, 204, 33, 0.7))';
      document.getElementById('bubble_btn').innerHTML = "Bubbles on";
      document.getElementById('bubble_btn').insertAdjacentHTML('beforeend', '<span class="bubbleon_tooltip">Blocks blow bubbles</span>');
    }

}
var legendScale = 1;
function bubbleScaleUp() {
      legendScale = legendScale * 10;
      //constrainBubbles(); 
     // constrainLegend();
      console.log("Legend label scale - "+legendScale);
      console.log("Bubble scale factor - "+bubbleScaleFactor);
      document.getElementById('label_50').innerHTML = " 0-"+5*legendScale+" transactions";
      document.getElementById('label_100').innerHTML = " "+10*legendScale+" transactions";
      document.getElementById('label_200').innerHTML = " "+20*legendScale+" transactions";
      document.getElementById('label_300').innerHTML = " "+30*legendScale+" transactions";
      document.getElementById('label_400').innerHTML = " "+40*legendScale+" transactions";
      document.getElementById('label_500').innerHTML = " "+50*legendScale+" transactions";
      document.getElementById('label_600').innerHTML = " "+60*legendScale+" transactions";
    }
function bubbleScaleDown() {
      legendScale = legendScale / 10;
     // constrainBubbles(); 
     // constrainLegend();
      console.log("Legend label scale - "+legendScale);
      console.log("Bubble scale factor - "+bubbleScaleFactor);
      document.getElementById('label_50').innerHTML = " 0-"+5*legendScale+" transactions";
      document.getElementById('label_100').innerHTML = " "+10*legendScale+" transactions";
      document.getElementById('label_200').innerHTML = " "+20*legendScale+" transactions";
      document.getElementById('label_300').innerHTML = " "+30*legendScale+" transactions";
      document.getElementById('label_400').innerHTML = " "+40*legendScale+" transactions";
      document.getElementById('label_500').innerHTML = " "+50*legendScale+" transactions";
      document.getElementById('label_600').innerHTML = " "+60*legendScale+" transactions";
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