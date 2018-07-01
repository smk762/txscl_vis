'use strict'
var j_5min = [];
function setHistory(json) {
    $.getJSON("http://cryptocartography.io/json/history_txscl.json")
        .done(function (data) {
            data.forEach(function(element) {
                j_5min.push(element);                
            });
            let range = j_5min.length;
            let top_time = 1530199707395;
            if (Date.now()/1000 > top_time) {
                let gap = Date.now()/1000 - top_time;
                let gap_points = Math.floor(gap/5000);
                for (var i = 0; i <= gap_points; i++) {
                    j_5min.push([(top_time+5000*i+1),0]);
                }
            }
            let loadtime = (Date.now() - init_time)/1000;
            console.log(j_5min.length+" history records loaded in "+loadtime)
            drawGraphs();
        return j_5min; 
    });
}
setHistory();

/* STYLING */
Highcharts.theme_pt = {
    colors: ['#3258FF', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, 'rgba(1, 28, 22, 0)'],
                [1, 'rgba(1, 28, 22, 0)']
            ]
        },
        style: {
            fontFamily: 'verdana, sans-serif'
        },
        plotBorderColor: '#FF0000'  // ?
    },
    title: {
        style: {
            color: '#4272B2', //graph title text color
            textTransform: 'uppercase',
            fontSize: '20px'
        }
    },
    subtitle: {
        style: {
            color: '#E0E0E3',
            textTransform: 'uppercase'
        }
    },
    xAxis: {
        gridLineColor: '#E5001E', // ?
        labels: {
            style: {
                color: '#4272B2' // top graph x-labels
            }
        },
        lineColor: '#4272B2',  // top graph baseline
        minorGridLineColor: '#4272B2', // ?
        tickColor: '#4272B2', // ?
        title: {
          text: '',
            style: {
                color: '#4272B2' // ?
            }
        },
        min: 0
    },
    yAxis: {
        gridLineColor: 'rgba(139, 139, 139, .3)', // top graph inner lines
        labels: {
            style: {
                color: '#4272B2'  // top graph y-labels
            }
        },
        lineColor: '#4272B2', // ?
        minorGridLineColor: '#4272B2', // ?
        tickColor: '#4272B2', // ?
        tickWidth: 1,
        title: {
          text: 'TRANSACTIONS PER SECOND   |   PAYMENTS PER SECOND',
            style: {
                color: '#4272B2' // ?
            }
        }
    },
    tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        style: {
            color: '#F0F0F0'
        },
        formatter: function () {
            var s = '<b>' +new Date(this.x).toUTCString()+'</b>';
            $.each(this.points, function () {
                s += '<br/>'+Math.round(this.y)+' '+this.series.name;
            });
            return s;
        },
        shared: true
    },
    plotOptions: {
        series: {
            dataLabels: {
                color: '#4272B2' // ?
            },
            marker: {
                lineColor: '#4272B2' // ?
            }
        },
        boxplot: {
            fillColor: '#4272B2' // ?
        },
        candlestick: {
            lineColor: '#4272B2' // ?
        },
        errorbar: {
            color: '4272B2' // ?
        },
        area: {
          fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            },
            stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
            }
        },
    },
    legend: {
        enabled: true,
        itemStyle: {
            color: '#4272B2' // ?
        },
        itemHoverStyle: {
            color: '#4272B2' // ?
        },
        itemHiddenStyle: {
            color: '#4272B2' // ?
        }
    },
    credits: {
        style: {
            color: '#4272B2' // ?
        }
    },
    labels: {
        style: {
            color: '#4272B2' // ?
        }
    },

    drilldown: {
        activeAxisLabelStyle: {
            color: '#4272B2' // ?
        },
        activeDataLabelStyle: {
            color: '#4272B2' // ?
        }
    },

    navigation: {
        buttonOptions: {
            symbolStroke: '#4272B2', // ?
            theme: {
                fill: '#4272B2' // ?
            }
        }
    },

    boost: {
        useGPUTranslations: true
    },

    // scroll charts
    rangeSelector: {
        buttonTheme: {
            fill: '#2D5A5A', // range buttons
            stroke: '#0137de', // ?
            style: {
                color: '#CDDDEA' // button text
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: '#CDDDEA' // button text
                    }
                },
                select: {
                    fill: '#28840E',
                    stroke: '#000000',
                    style: {
                        color: '#CDDDEA' // button text
                    }
                }
            }
        },
        inputBoxBorderColor: '#CDDDEA', 
        inputStyle: {
            backgroundColor: '#726B27',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        }
    },
    scrollbar: {
        enabled: true
    },
    navigator: {
        enabled: false
    },
    legendBackgroundColor: 'rgba(0, 0, 0, 0.9)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#FFD800',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
};

    /* STYLING */
    Highcharts.theme_tx = {
        colors: ['#3258FF', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                stops: [
                    [0, 'rgba(1, 28, 22, 0)'],
                    [1, 'rgba(1, 28, 22, 0)']
                ]
            },
            style: {
                fontFamily: 'verdana, sans-serif'
            },
            plotBorderColor: '#FF0000'  // ?
        },
        title: {
            style: {
                color: '#4272B2', //graph title text color
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase'
            }
        },
        xAxis: {
            gridLineColor: '#E5001E', // ?
            labels: {
                style: {
                    color: '#4272B2' // top graph x-labels
                }
            },
            lineColor: '#4272B2',  // top graph baseline
            minorGridLineColor: '#4272B2', // ?
            tickColor: '#4272B2', // ?
            title: {
                style: {
                    color: '#4272B2' // ?
                }
            }
        },
        yAxis: {
            gridLineColor: 'rgba(139, 139, 139, .3)', // top graph inner lines
            labels: {
                style: {
                    color: '#4272B2'  // top graph y-labels
                }
            },
            lineColor: '#4272B2', // ?
            minorGridLineColor: '#4272B2', // ?
            tickColor: '#4272B2', // ?
            tickWidth: 1,
            title: {
                style: {
                    color: '#4272B2' // ?
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    color: '#4272B2' // ?
                },
                marker: {
                    lineColor: '#4272B2' // ?
                }
            },
            boxplot: {
                fillColor: '#4272B2' // ?
            },
            candlestick: {
                lineColor: '#4272B2' // ?
            },
            errorbar: {
                color: '4272B2' // ?
            }
        },
        legend: {
            enabled: true,
            itemStyle: {
                color: '#4272B2' // ?
            },
            itemHoverStyle: {
                color: '#4272B2' // ?
            },
            itemHiddenStyle: {
                color: '#4272B2' // ?
            }
        },
        credits: {
            style: {
                color: '#4272B2' // ?
            }
        },
        labels: {
            style: {
                color: '#4272B2' // ?
            }
        },

        drilldown: {
            activeAxisLabelStyle: {
                color: '#4272B2' // ?
            },
            activeDataLabelStyle: {
                color: '#4272B2' // ?
            }
        },

        navigation: {
            buttonOptions: {
                symbolStroke: '#4272B2', // ?
                theme: {
                    fill: '#4272B2' // ?
                }
            }
        },

        boost: {
            useGPUTranslations: true
        },

        // scroll charts
        rangeSelector: {
            buttonTheme: {
                fill: '#2D5A5A', // range buttons
                stroke: '#0137de', // ?
                style: {
                    color: '#CDDDEA' // button text
                },
                states: {
                    hover: {
                        fill: '#707073',
                        stroke: '#000000',
                        style: {
                            color: '#CDDDEA' // button text
                        }
                    },
                    select: {
                        fill: '#28840E',
                        stroke: '#000000',
                        style: {
                            color: '#CDDDEA' // button text
                        }
                    }
                }
            },
            inputBoxBorderColor: '#CDDDEA', 
            inputStyle: {
                backgroundColor: '#726B27',
                color: 'silver'
            },
            labelStyle: {
                color: 'silver'
            }
        }
    };


var pt_xy = [];
var tx_xy = [];
var pt5_xy = [];
var tx5_xy = [];
function drawGraphs() {
    let smoothSpan = 12;
    let smoothSpan5 = 60;
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme_pt);
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    // Create the chart
    Highcharts.stockChart('txscl_graph', {
      chart: {
        events: {
          load: function () {
            // set up the updating of the chart each second
            var seriesPt = this.series[0];
            var seriesPt_smooth = this.series[1];
            var seriesTx = this.series[2];
            var seriesTx_smooth = this.series[3];
            //var seriesTx = this.series[1];
            setInterval(function () {
              var x = (Math.round(new Date().getTime())/5)*5; // current time
                if (pt_updated+15000 < Date.now()) {
                    tx_sec = 0;
                    pt_sec = 0;
                }
                seriesTx.addPoint([x, Math.round(tx_sec)], true, true);
                updateNeedleTx(Math.round(tx_sec)); // per second
                seriesPt.addPoint([x, Math.round(pt_sec)], true, true);
                updateNeedlePt(Math.round(pt_sec)); // per second
                seriesPt_smooth.addPoint([x, Math.round(pt5_sec)], true, true); // averaged over 5 minute
                seriesTx_smooth.addPoint([x, Math.round(tx5_sec)], true, true); // averaged over 5 minute
                console.log("x: "+x+" tx_sec: "+tx_sec+" pt_sec: "+pt_sec+" tx5: "+tx5_sec+" pt5: "+pt5_sec)
            }, 5000); 
          }
        },
      zoomType: 'x'
      },
    rangeSelector: {
        inputPosition: {
            align: 'left'
        },
        buttonPosition: {
            align: 'left'
        },
        buttons: [{
          type: 'minute',
          count: 15,
          text: '15m'
        }, {
          type: 'hour',
          count: 1,
          text: '1h'
        }, {
          type: 'hour',
          count: 6,
          text: '6h'
        }, {
          type: 'day',
          count: 1,
          text: '1d'
        }, {
          type: 'day',
          count: 3,
          text: '3d'
        }, {
          type: 'all',
          text: 'All'
        }],
        },
      title: {
        text: ''
      },

      exporting: {
        enabled: false
      },
      series: [
        { //  // ============================================== Payments per second ==========================================================
        type: 'areaspline',
        color: 'rgba(80,240,190,0.05)', // fill area color
        lineColor: 'rgba(80,240,190,0.05)', // line color
        name: 'Payments per second (1 minute average)', 
        data: (function () {
            let p_total = 0;
            j_5min.sort(function(a, b){ return a.max_time-b.max_time });
            j_5min.forEach(function(element) {
                if (element.max_time < 1530057600000 ) {
                    p_total = element.sum_pt;
                }
                else {
                    p_total = element.sum_pt/5;   
                }
                    
                pt_xy.push([
                    Math.round(element.max_time/5)*5,
                    p_total
                ]);
            });
            return smoothHistory(pt_xy,smoothSpan);
        }()) },
        { // ============================================== Payments per second (5 min average) ==========================================================
        type: 'spline',
        lineColor: 'rgba(80,240,190,0.45)', // line color
        name: 'Payments per second (5 min average)', 
        data: (function () {
            let p_total = 0;
            j_5min.forEach(function(element) {
                if (element.max_time < 1530057600000 ) {
                    p_total = element.sum_pt;
                }
                else {
                    p_total = element.sum_pt/5;   
                }
                    
                pt5_xy.push([
                    Math.round(element.max_time/5)*5,
                    p_total
                ]);
            });
            return smoothHistory(pt5_xy,smoothSpan5);
        }()) },
        { // ============================================== Transactions per second ==========================================================
        type: 'areaspline',
        color: 'rgba(255,200,0,0.10)', // fill area color
        lineColor: 'rgba(255,200,0,0.15)', // line color
        name: 'Transactions per second (1 minute average)', 
        data: (function () {
            let t_total = 0;
            j_5min.sort(function(a, b){ return a.max_time-b.max_time });
            j_5min.forEach(function(element) {
                if (element.max_time < 1530057600000 ) {
                    t_total = element.sum_tx;
                }
                else {
                    t_total = element.sum_tx/5;   
                }
                    
                tx_xy.push([
                    Math.round(element.max_time/5)*5,
                    t_total
                ]);
            });
            return smoothHistory(tx_xy,smoothSpan);
            }()) },
            { //  // ============================================== Transactions per second (5 min average) ==========================================================
            type: 'spline',
            lineColor: 'rgba(255,200,0,0.35)', // line color
            name: 'Transactions per second (5 min average)', 
            data: (function () {
            let t_total = 0;
            j_5min.forEach(function(element) {
                if (element.max_time < 1530057600000 ) {
                    t_total = element.sum_tx;
                }
                else {
                    t_total = element.sum_tx/5;   
                }
                    
                tx5_xy.push([
                    Math.round(element.max_time/5)*5,
                    t_total
                ]);
            });
            return smoothHistory(tx5_xy,smoothSpan5);
            }()) }
        ]
    })
     document.getElementById("txscl_graph").style.opacity = "0.95";
     
}
//setTimeout(function() { drawGraph(); }, 15000);
     

function smoothHistory(xy,span) {
    if (span>1) {
        for (var i = 0; i < xy.length-span; i++) {
            let m = 0;
            for (var j = 0; j < span; j++) {
                m += xy[i+j][1];
            }
            xy[i][1] = Math.round(m/span);
        }
        let k = 0;
        for (var i = xy.length-span; i < xy.length; i++) {
            let m = 0;
            for (var j = 0; j < span-k; j++) {
                m += xy[i+j][1];
            }
            xy[i][1] = Math.round(m/(span-k));
            k++;
        }
    }
    return xy;
}
let smoothSum = [];
smoothSum.pt = [];
smoothSum.tx = [];
function smoothLive(y,span,id) {
    (smoothSum[id]).push(y);
    if (smoothSum[id].length > span) { smoothSum[id].pop(); }
    let smoothVal = Math.round(smoothSum[id].reduce(getSum)/smoothSum[id].length);
    return smoothVal;
}

function getSum(total, num) {
    return total + num;
}