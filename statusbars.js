
// resize status bars on window size change
function updateStatusBorder(className) {
  x = document.getElementsByClassName(className);
  var i;
  for (i = 0; i < x.length; i++) {
      x[i].height = document.documentElement.clientHeight*0.05;
      x[i].width = document.documentElement.clientWidth*0.1;
  } 
}

function updateStatusBar(id, stat) {
  console.log("#############  updating "+id+", stat = "+stat+", globalTX = "+globalTX+"  ###############");
  if (Number.isNaN(stat) || (stat !== stat)) {
    stat = 0;
    console.log("changed nan to zero "+(stat) );
  }
  if (stat > 10) {
    stat =  parseFloat(stat).toFixed(1);
  }
  else if (stat > 1000) {
    stat = Math.round(parseFloat(stat));
  }
  else {
    stat =  parseFloat(stat).toFixed(2);
  }
  if (sendMany_state == 'on') {
      sendMany_multiplier = 100;
      tx_payment = "payments";
  }
  else {
    tx_payment = "transactions";
    sendMany_multiplier = 1;
  }
  maxTxPerBlock = maxTxPerBlock*sendMany_multiplier; 
  label = id+"Label";
  bar = id+"Bar";
  border = id+"Border";
  borderWidth = document.getElementById(border).clientWidth;
  switch(id) {
    case 'numApiConn':
    //stat = Math.random() * totalNumChains;
      barSize = stat/totalNumChains;
      barSize = limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+" / "+totalNumChains+"</span> Insight explorer APIs connected";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'numChainActive':         //  from socket
      barSize = stat/totalNumChains;
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"/ "+totalNumChains+"</span> Asset Chains Active in last 5 minutes";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'numBlockSolved':         //  from socket
      barSize = stat/(totalNumChains*10);
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"</span> Blocks Solved in last 5 minutes";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'txPerBlock':
      stat = stat * sendMany_multiplier;
      limitToOne(barSize);
      barSize = stat*sendMany_multiplier/maxTxPerBlock*sendMany_multiplier;
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"</span> Average "+tx_payment+" per block in last 5 min";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'blockPerChain':
      barSize = numBlockSolved/(numChainActive*10);
      if (barSize !== barSize) { barSize = 0; }
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"</span> Average Blocks per active Asset Chain in last 5 minutes";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'tx5min':
      stat = stat * sendMany_multiplier;
      barSize = stat/(maxTxPerBlock*10);
      if (barSize !== barSize) { barSize = 0; }
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"</span> Total "+tx_payment+" in the last 5 minutes";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'aveChainTX':
      barSize = (tx5min*sendMany_multiplier)/(numChainActive*maxTxPerBlock);
      if (barSize !== barSize) { barSize = 0; }
      limitToOne(barSize);
      stat = stat * sendMany_multiplier;
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"</span> Average "+tx_payment+" per active Asset Chain in last 5 minutes";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'peakGlobalTX':         //  from socket
      stat = stat*100;
      barSize = stat/1250000;
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"</span> Peak Global "+tx_payment+" per second";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'randomMode':         //  from socket
        if (stat == 'true') {
          document.getElementById(label).innerHTML = " <span> RANDOM DATA MODE </span>";
        }
      break;
    case 'sendManyMode':         //  from socket
        if (stat > 1) {
          document.getElementById(label).innerHTML = " <span> Send Many Muliplier active ("+stat+"x) </span>";
          sendMany_multiplier = stat;
        }
        else {
          document.getElementById(label).innerHTML = "";
        }
      break;
    default:
      barSize = 0;
     // console.log('#################  status bar '+id+' not found!  ################################');
  }
}
var blockPerChain = 1;
setInterval(function() { aveChainTX = tx5min/numChainActive;    updateStatusBar('aveChainTX',aveChainTX); } ,3200);
setInterval(function() { blockPerChain = numBlockSolved/numChainActive ; updateStatusBar('blockPerChain',blockPerChain); } ,3671);
setInterval(function() { txPerBlock = tx5min/numBlockSolved ; updateStatusBar('txPerBlock',txPerBlock); } ,3671);
setInterval(function() { updateStatusBar('tx5min',tx5min); } ,3671);
// setInterval(function() { updateStatusBar('clientCount',clientCount); } ,3671);
//setTimeout(function() { gobalTXTX = numBlockSolved/numChainActive ; updateStatusBar('aveBlockTX',aveBlockTX); } ,3671);
updateStatusBar('numBlockSolved',0);
updateStatusBar('numChainActive',0);


function toggleSendMany() {
    if (document.getElementById('sendMany_btn').innerHTML == "SendMany is off") {
      sendMany_multiplier = 100;
      sendMany_state = 'on';
      legendLabelScale = 100;
      document.getElementById('sendMany_btn').innerHTML = "SendMany is on";
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
      document.getElementById('sendMany_btn').innerHTML = "SendMany is off";
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

function limitToOne(val) {
  if (val > 1) {
    val = 1;
  }
  return val;
};

