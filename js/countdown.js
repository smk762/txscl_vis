var countDownDate = 0;
setInterval(function() {
	countDownDate = blastoff;
    var now = new Date().getTime();
    var when = countDownDate - now/1000;
    when += 120;
	//console.log(blastoff+" / "+when+" / "+countDownDate+" / "+ now)
    var days = Math.floor(when / (60 * 60 * 24));
    var hours = Math.floor((when % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((when % (60 * 60)) / (60));
    var seconds = Math.floor((when % (60)));
    document.getElementById("timer").innerHTML = "Payments per Second Scale Test - NEXT TEST IN "+days +"d "+hours+"h "+minutes+"m "+seconds+"s";
    if (when < 0) {
        document.getElementById("timer").innerHTML = "Payments per Second Scale Test - RANDOM TEST DATA ACTIVE";
    }
    if (when == 0) {
        document.getElementById("timer").innerHTML = "Payments per Second Scale Test - NEXT TEST NOT YET SCHEDULED";
    }
}, 1000);
             