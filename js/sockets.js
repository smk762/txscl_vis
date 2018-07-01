'use strict'
let hoarder_url = "http://cryptocartography.io:9762/";
const hoarder_socket = io.connect(hoarder_url, { secure: true, reconnect: true, rejectUnauthorized : false });
hoarder_socket.on('connect', function () {
    console.log("++++++++++++++++++  Connected to "+hoarder_url+" +++++++++++++++++++++++");
    hoarder_socket.emit('subscribe', 'max_time');
    hoarder_socket.emit('subscribe', 'num_chains');
    hoarder_socket.emit('subscribe', 'tx_60sec');
    hoarder_socket.emit('subscribe', 'pt_60sec');
    hoarder_socket.emit('subscribe', 'tx_5min');
    hoarder_socket.emit('subscribe', 'blastoff');
    hoarder_socket.emit('subscribe', 'pt_5min');
    hoarder_socket.emit('subscribe', 'blk_5min');
    hoarder_socket.emit('subscribe', 'client_count');
    hoarder_socket.emit('subscribe', 'txscl_table');
});

// listen for blastoff time
hoarder_socket.on('blastoff', function (data) {
    blastoff = data;
});
// listen for number of chains
hoarder_socket.on('num_chains', function (data) {
    num_chains = data;
    maxBlock5min = 10*num_chains; // flexible based on connected clients
    maxTx5min = maxTxPerBlock*num_chains*8;
    maxPt5min = maxPtPerBlock*num_chains*8;
});

// listen for highest recieved timestamp
hoarder_socket.on('max_time', function (data) {
  max_time = parseInt(data);
});

// listen for sum of block tx aggregates over last 60 seconds
hoarder_socket.on('tx_60sec', function (data) {
    tx_60sec = parseInt(data);
    // calculate tx per second with 1 minute average.
    tx_sec = tx_60sec/60; 
});

hoarder_socket.on('pt_60sec', function (data) {
  pt_60sec = parseInt(data);
  //updateNeedle(Math.ceil(pt_sec)); // per second, averaged over 1 minute
    pt_sec = pt_60sec/60; 
});

hoarder_socket.on('tx_5min', function (data) {
    tx_5min = parseInt(data);
    updateStatusBar('tx_5min',tx_5min);
  if (Date.now()-runTime < 60) {
        tx5_sec = tx_5min/runtime; 
    }
    else {
        tx5_sec = tx_5min/300;
    }
});

hoarder_socket.on('pt_5min', function (data) {
    pt_5min = parseInt(data);
    updateStatusBar('pt_5min',pt_5min);
  if (Date.now()-runTime < 60) {
        pt5_sec = pt_5min/runtime; 
    }
    else {
        pt5_sec = pt_5min/300;
    }    
    pt_updated = Date.now();
});

hoarder_socket.on('blk_5min', function (data) {
    blk_5min = parseInt(data);
    updateStatusBar('blk_5min',blk_5min);
});

hoarder_socket.on('client_count', function (data) {
    client_count = parseInt(data);
    console.log(client_count+" Users Connected")
    //updateStatusBar('client_count',client_count);
});
function calcRatios() {
    //console.log("............................................................");
    //console.log(tx_5min);
    //console.log(typeof tx_5min);
    //console.log(pt_5min);
    //console.log(typeof pt_5min);
    //console.log(blk_5min);
    //console.log(typeof blk_5min);
    //console.log(num_chains);
    //console.log(typeof num_chains);
    //console.log("............................................................");

    if (pt_updated+15000 < Date.now()) {
        tx_per_block = 0;
        pt_per_block = 0; 
        tx_per_chain = 0;
        pt_per_chain = 0;
        pt_per_tx = 0;
        block_per_chain = 0;
        pt_sec = 0;
        tx_sec = 0;
        pt5_sec = 0;
        tx5_sec = 0;
        pt_60sec = 0;
        tx_60sec = 0;
        tx_5min = 0;
        blk_5min = 0;
        num_chains = 0;
    }
    else {
        tx_per_block = tx_5min/blk_5min;
        pt_per_block = pt_5min/blk_5min; 
        tx_per_chain = tx_5min/num_chains/5;
        pt_per_chain = pt_5min/num_chains/5;
        pt_per_tx = pt_5min/tx_5min;
        block_per_chain = blk_5min/5/num_chains;
        
        maxBlock5min = 8*num_chains;
        maxTx5min = maxTxPerBlock*num_chains*8;
        maxPt5min = pt_per_tx*tx_per_block*num_chains*8;

    }
    updateStatusBar('tx_per_block',tx_per_block);
    updateStatusBar('pt_per_block',pt_per_block);
    updateStatusBar('tx_per_chain',tx_per_chain);
    updateStatusBar('pt_per_chain',pt_per_chain);
    updateStatusBar('pt_per_tx',pt_per_tx);
    updateStatusBar('tx_5min',tx_5min);
    updateStatusBar('blk_5min',blk_5min);
    updateStatusBar('pt_5min',pt_5min);

}
setInterval(function() { calcRatios();  },3000 );
calcRatios(); 
// let needle = setInterval(function() { updateNeedle(globalTX); } ,2000);
// needle = setInterval(function() { console.log("globalTX = "+globalTX); updateNeedle(globalTX); } ,3050);