let legendMagnitude = 1;
function rescaleBubbles() {
	let scale = document.getElementById("bubbleScale").value;
	switch (scale) {
		case '1':
			legendMagnitude = 1;
			break;
		case '2':
			legendMagnitude = 10;
			break;
		case '3':
			legendMagnitude = 100;
			break;
		case '4':
			legendMagnitude = 1000;
			break;
	}
	if (legendMagnitude == 1000) {
		document.getElementById('lbl_1').innerHTML = "2k";
		document.getElementById('lbl_2').innerHTML = "4k";
		document.getElementById('lbl_3').innerHTML = "6k";
		document.getElementById('lbl_4').innerHTML = "8k";
		document.getElementById('lbl_5').innerHTML = "10k";
	}
	else {
		document.getElementById('lbl_1').innerHTML = ""+(2*legendMagnitude);
		document.getElementById('lbl_2').innerHTML = ""+4*legendMagnitude;
		document.getElementById('lbl_3').innerHTML = ""+6*legendMagnitude;
		document.getElementById('lbl_4').innerHTML = ""+8*legendMagnitude;
		document.getElementById('lbl_5').innerHTML = ""+10*legendMagnitude;
	}
}