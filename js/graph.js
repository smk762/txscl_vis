'use strict'
var j_5min = [];
function setHistory(json) {
    $.getJSON("http://cryptocartography.io/json/recent.json")
        .done(function (data) {
            data.forEach(function(element) {
                j_5min.push(element);
            });   
        return j_5min; 
    });
}
setHistory();

/* STYLING */
Highcharts.theme = {
    colors: ['#3258FF', '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, 'rgba(1, 28, 22, .2)'],
                [1, 'rgba(1, 28, 22, .8)']

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
        gridLineColor: '#4272B2', // ?
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
        gridLineColor: '#4272B2', // top graph inner lines
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

    navigator: {
        handles: {
            backgroundColor: '#CDDDEA', // ?
            borderColor: '#CDDDEA' // ?
        },
        outlineColor: '#CDDDEA',
        maskFill: 'rgba(255,237,158,0.2)',  //yellow
        series: {
            color: '#CDDDEA', // ?
            lineColor: '#00C416', // lower graph line
            fill: '#CDDDEA' // ?
        },
        xAxis: {
            gridLineColor: '#505053' // lower graph interval outlines
        }
    },

    scrollbar: {
        barBackgroundColor: '#0F173E', // lower graph scrollbar
        barBorderColor: '#808083',
        buttonArrowColor: '#CCC',
        buttonBackgroundColor: '#606063',
        buttonBorderColor: '#606063',
        rifleColor: '#111',
        trackBackgroundColor: '#404043',
        trackBorderColor: '#404043'
    },

    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#FFD800',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
};


function drawGraph() {
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

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
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = pt_60sec;
              series.addPoint([x, y], true, true);
            }, 5000);
          }
        }
      },

      rangeSelector: {
        buttons: [{
          count: 5,
          type: 'minute',
          text: '5M'
        }, {
          count: 30,
          type: 'minute',
          text: '30M'
        }, {
          type: 'all',
          text: 'All'
        }],
        inputEnabled: false,
        selected: 0
      },

      title: {
        text: ''
      },

      exporting: {
        enabled: false
      },

      series: [{ // top graph
        type: 'area',
        color: '#062D14', // fill area color
        lineColor: 'rgba(60,101,101,0.9)', // line color
        name: 'Payments per second', 
        data: (function () {
            var j_xy = [];
            let p_total = 0;
            j_5min.sort(function(a, b){ return a.max_time-b.max_time });
            j_5min.forEach(function(element) {
                console.log("check - "+JSON.stringify(j_5min[0])+" -------------------------------------------")
                j_5min.push(element);
                j_xy.push([
                    element.max_time,
                    element.sum_pt
                ]);
            });   
            console.log(j_xy);
            for (var i = 0; i <= j_xy.length-1; i++) {
                let m = 0;
                for (var j = 6; j >= -5; j--) {
                    let k = 0;
                    if (j+i<0) {
                        k=0;
                    }
                    else if (j+i>j_xy.length-1) {
                        k=j_xy.length-1;
                    }
                    else {
                        k=j+i;
                    }
                    m = m + j_xy[k][1];
                }
                j_xy[i][1] = m/60;
                console.log(i+"/"+j_xy.length);
                console.log(j_xy[i][1]);
            }
            return j_xy;
        }())
      }]
    });
}
setTimeout(function() { drawGraph(); }, 5000);
     