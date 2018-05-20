
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
  stat = parseFloat(stat);
  if (stat > 10) {
    stat =  stat.toFixed(1);
  }
  else if (stat > 1000) {
    stat = Math.round(stat);
  }
  else {
    stat =  stat.toFixed(2);
  }
  if (sendMany_state == 'on') {
      tx_payment = "payments";
  }
  else {
    tx_payment = "transactions";
  }
  maxPtPerBlock = maxTxPerBlock*100; 
  label = id+"Label";
  bar = id+"Bar";
  border = id+"Border";
  borderWidth = document.getElementById(border).clientWidth;
  switch(id) {
    case 'numApiConn':
    //stat = Math.random() * totalNumChains;
      barSize = stat/totalNumChains;
      barSize = limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+" / "+totalNumChains+"</span> APIs connected";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'numChainActive':         //  from socket
      barSize = stat/totalNumChains;
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"/ "+totalNumChains+"</span> Asset Chains Active (last 5 min)";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'numBlockSolved':         //  from socket
      barSize = stat/(totalNumChains*10);
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"</span> Blocks Solved (last 5 minutes)";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'txPerBlock':
      limitToOne(barSize);
      barSize = stat/maxTxPerBlock;
      document.getElementById(label).innerHTML = " <span>"+stat+"</span> Transactions per block (last 5 min)";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'ptPerBlock':
      stat = stat;
      limitToOne(barSize);
      console.log("PT Per Block: "+stat);
      barSize = stat/maxPtPerBlock;
      document.getElementById(label).innerHTML = " <span>"+stat+"</span> Payments per block (last 5 min)";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'blockPerChain':
      barSize = numBlockSolved/(numChainActive*10);
      if (barSize !== barSize) { barSize = 0; }
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+stat+"</span> Blocks per active Asset Chain (last 5 min)";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'tx5min':
      barSize = stat/(maxTxPerBlock*10);
      if (barSize !== barSize) { barSize = 0; }
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"</span> Total transactions (last 5 min)";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'pt5min':
      barSize = stat/(maxPtPerBlock*10);
      if (barSize !== barSize) { barSize = 0; }
      console.log("PT 5 min: "+stat);
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+Math.round(stat)+"</span> Total payments (last 5 min)";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'aveChainTX':
      barSize = (tx5min)/(numChainActive*maxTxPerBlock);
      if (barSize !== barSize) { barSize = 0; }
      limitToOne(barSize);
      document.getElementById(label).innerHTML = " <span>"+stat+"</span> Transactions per active Asset Chain (last 5 min)";
      document.getElementById(bar).style.width = barSize*borderWidth+"px";
      break;
    case 'aveChainPT':
      barSize = (tx5min)/(numChainActive*maxPtPerBlock);
      if (barSize !== barSize) { barSize = 0; }
      limitToOne(barSize);
      console.log("PT Per Chain: "+stat);
      document.getElementById(label).innerHTML = " <span>"+stat+"</span> Payments per active Asset Chain (last 5 min)";
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
    default:
      barSize = 0;
     // console.log('#################  status bar '+id+' not found!  ################################');
  }
}
var blockPerChain = 1;
setInterval(function() { blockPerChain = numBlockSolved/numChainActive ; updateStatusBar('blockPerChain',blockPerChain); } ,11000);
setInterval(function() { updateStatusBar('tx5min',tx5min); } ,2300);
setInterval(function() { txPerBlock = tx5min/numBlockSolved ; updateStatusBar('txPerBlock',txPerBlock); } ,13040);
setInterval(function() { aveChainTX = tx5min/numChainActive;  updateStatusBar('aveChainTX',aveChainTX); } ,7000);
setInterval(function() { updateStatusBar('pt5min',pt5min); } ,2900);
setInterval(function() { ptPerBlock = pt5min/numBlockSolved ; updateStatusBar('ptPerBlock',ptPerBlock); } ,8500);
setInterval(function() { aveChainPT = pt5min/numChainActive;  updateStatusBar('aveChainPT',aveChainPT); } ,6600);

setTimeout(function() { blockPerChain = numBlockSolved/numChainActive ; updateStatusBar('blockPerChain',blockPerChain); } ,11000);
setTimeout(function() { updateStatusBar('tx5min',tx5min); } ,2300);
setTimeout(function() { txPerBlock = tx5min/numBlockSolved ; updateStatusBar('txPerBlock',txPerBlock); } ,13040);
setTimeout(function() { aveChainTX = tx5min/numChainActive;  updateStatusBar('aveChainTX',aveChainTX); } ,7000);
setTimeout(function() { updateStatusBar('pt5min',pt5min); } ,2900);
setTimeout(function() { ptPerBlock = pt5min/numBlockSolved ; updateStatusBar('ptPerBlock',ptPerBlock); } ,8500);
setTimeout(function() { aveChainPT = pt5min/numChainActive;  updateStatusBar('aveChainPT',aveChainPT); } ,6600);

function limitToOne(val) {
  if (val > 1) {
    val = 1;
  }
  return val;
};

