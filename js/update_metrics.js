let borderWidth = document.getElementById('tx5minBorder').clientWidth;

function detectWindowChange() {

}

function receiveData() {

}

// updateStatusBar(id, stat);  // 2 writes per metric bar, no DOM reads.

//updateGraph // all write, no DOM read

updateNeedle(); // two writes, no DOM reads.

 // animateBubble