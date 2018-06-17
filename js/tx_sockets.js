'use strict'
const hoarder_socket = io.connect(hoarder_url, { secure: true, reconnect: true, rejectUnauthorized : false });
// http://txscl.meshbits.io/insight-api/txs/?block=00b25e955aba9c6812eeb605eb1bcb04d59a8a1cbb2c560330fe650a3b83aab2
hoarder_socket.on('connect', function () {
    console.log("++++++++++++++++++  Connected to "+hoarder_url+" +++++++++++++++++++++++");
    hoarder_socket.emit('subscribe', 'max_time');
    hoarder_socket.emit('subscribe', 'ac_active_5min');
    hoarder_socket.emit('subscribe', 'tx_60sec');
    hoarder_socket.emit('subscribe', 'pt_60sec');
    hoarder_socket.emit('subscribe', 'tx_5min');
    hoarder_socket.emit('subscribe', 'pt_5min');
    hoarder_socket.emit('subscribe', 'blk_5min');
    hoarder_socket.emit('subscribe', 'client_count');
});

hoarder_socket.on('max_time', function (data) {
  max_time = parseInt(data);
});

hoarder_socket.on('ac_active_5min', function (data) {
    ac_active_5min = parseInt(data);
    updateStatusBar('ac_active_5min',parseInt(ac_active_5min));
});

hoarder_socket.on('tx_60sec', function (data) {
  tx_60sec = parseInt(data); // per second, averaged over 1 minute
  tx_sec = tx_60sec/60; 
});

hoarder_socket.on('pt_60sec', function (data) {
  pt_60sec = parseInt(data);
  pt_sec = pt_60sec/60;
  console.log(pt_sec+" ************************")
  updateNeedle(pt_sec); // per second, averaged over 1 minute
});

hoarder_socket.on('tx_5min', function (data) {
    tx_5min = parseInt(data);
    updateStatusBar('tx_5min',tx_5min);
});

hoarder_socket.on('pt_5min', function (data) {
    pt_5min = parseInt(data);
    updateStatusBar('pt_5min',pt_5min);
});

hoarder_socket.on('blk_5min', function (data) {
    blk_5min = parseInt(data);
    updateStatusBar('blk_5min',blk_5min);
});

hoarder_socket.on('client_count', function (data) {
    client_count = parseInt(data);
    //updateStatusBar('client_count',client_count);
});

function calcRatios() {
    tx_per_block = tx_5min/blk_5min;
    pt_per_block = pt_5min/blk_5min; 
    tx_per_chain = tx_5min/ac_active_5min;
    pt_per_chain = pt_5min/ac_active_5min;
    pt_per_tx = pt_5min/tx_5min;
    block_per_chain = blk_5min/ac_active_5min;
    
    maxBlock5min = 8*ac_active_5min;
    maxTx5min = maxTxPerBlock*ac_active_5min*8;
    maxPt5min = pt_per_tx*tx_per_block*ac_active_5min*8;

    updateStatusBar('tx_per_block',tx_per_block);
    updateStatusBar('pt_per_block',pt_per_block);
    updateStatusBar('tx_per_chain',tx_per_chain);
    updateStatusBar('pt_per_chain',pt_per_chain);
    updateStatusBar('pt_per_tx',pt_per_tx);
    updateStatusBar('block_per_chain',block_per_chain);
}
setInterval(function() { calcRatios(); },5000 );
// let needle = setInterval(function() { updateNeedle(globalTX); } ,2000);
// needle = setInterval(function() { console.log("globalTX = "+globalTX); updateNeedle(globalTX); } ,3050);