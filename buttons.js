
function toggleSendMany() {
    if (document.getElementById('sendMany_btn').innerHTML == "Transaction mode") {
      sendMany_multiplier = 100;
      sendMany_state = 'on';
      legendLabelScale = 100;
      document.getElementById('sendMany_btn').innerHTML = "Payments mode";
    //  updateStatusBar('sendManyMode', sendMany_multiplier);
      document.getElementById('label_50').innerHTML = " 0-"+50*legendLabelScale+" payments";
      document.getElementById('label_100').innerHTML = " "+100*legendLabelScale+" payments";
      document.getElementById('label_200').innerHTML = " "+200*legendLabelScale+" payments";
      document.getElementById('label_300').innerHTML = " "+300*legendLabelScale+" payments";
      document.getElementById('label_400').innerHTML = " "+400*legendLabelScale+" payments";
      document.getElementById('label_500').innerHTML = " "+500*legendLabelScale+" payments";
      document.getElementById('label_600').innerHTML = " "+600*legendLabelScale+" payments";
      document.getElementById("sendMany_btn").className = "sm_on"; 
    }
    else {
      legendLabelScale = 1;
      sendMany_multiplier = 1;
      sendMany_state = 'off';
      document.getElementById('sendManyModeLabel').innerHTML = "";
      document.getElementById('sendMany_btn').innerHTML = "Transaction mode";
     // updateStatusBar('sendManyMode', sendMany_multiplier);
      document.getElementById('label_50').innerHTML = " 0-"+50*legendLabelScale+" transactions";
      document.getElementById('label_100').innerHTML = " "+100*legendLabelScale+" transactions";
      document.getElementById('label_200').innerHTML = " "+200*legendLabelScale+" transactions";
      document.getElementById('label_300').innerHTML = " "+300*legendLabelScale+" transactions";
      document.getElementById('label_400').innerHTML = " "+400*legendLabelScale+" transactions";
      document.getElementById('label_500').innerHTML = " "+500*legendLabelScale+" transactions";
      document.getElementById('label_600').innerHTML = " "+600*legendLabelScale+" transactions";
    document.getElementById("sendMany_btn").className = "sm_off"; 
    }
}
function bubbles_off() {

}
function scale_off() {

}