

// updateStatusBar(id, stat);  // 2 writes per metric bar, no DOM reads.

//updateGraph // all write, no DOM read

//updateNeedle(); // two writes, no DOM reads.

function calcRatios() {
    tx_per_block = Math.round(tx_5min/blk_5min);
    pt_per_block = Math.round(pt_5min/blk_5min); 
    tx_per_chain = Math.round(tx_5min/ac_active_5min);
    pt_per_chain = Math.round(pt_5min/ac_active_5min);
    pt_per_tx = Math.round(pt_5min/tx_5min);
    block_per_chain = Math.round(blk_5min/ac_active_5min);
    updateStatusBar('tx_per_block',tx_per_block);
    updateStatusBar('pt_per_block',pt_per_block);
    updateStatusBar('tx_per_chain',tx_per_chain);
    updateStatusBar('pt_per_chain',pt_per_chain);
    updateStatusBar('pt_per_tx',pt_per_tx);
    updateStatusBar('block_per_chain',block_per_chain);
}
setInterval(function() { calcRatios(); },3000 );

var j_5min = [];
function setHistory(json) {
    $.getJSON("/json/recent.json")
        .done(function (data) {
            data.forEach(function(element) {
                j_5min.push(element);
            });   
        console.log(j_5min);
        console.log(typeof j_5min[0].max_time);
        return j_5min; 
    });
}
setHistory();

function getGraphPoint() {
              var x = (new Date()).getTime(), // current time
                y =pt_60sec;
              series.addPoint([x, y], true, true);
}

function parseGraphHistory() {
    j_5min.sort(function(a, b){ return a.max_time-b.max_time });
    j_5min.forEach(function(element) {
        console.log(element.max_time);
        j_5min.push(element);
        j_xy.push([
            element.max_time,
            element.sum_pt
        ]);
    });
    return j_xy;
}