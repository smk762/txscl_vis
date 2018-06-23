'use strict'

var j_5min = [];
function setHistory(json) {
    $.getJSON("http://cryptocartography.io/json/sorted_history.json")
        .done(function (data) {
            data.forEach(function(element) {
                j_5min.push(element);                
            }); 
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
            fill: '#E800D4' // ?
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
                fill: '#E800D4' // ?
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

        legendBackgroundColor: 'rgba(0, 0, 0, 0.9)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#FFD800',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
    };



function drawGraphs() {
    // Apply the theme

    Highcharts.setOptions(Highcharts.theme_pt);
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
    // Create the chart
    Highcharts.stockChart('ptscl_graph', {
      chart: {
        events: {
          load: function () {
            // set up the updating of the chart each second
            var seriesPt = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(); // current time
              seriesPt.addPoint([x, Math.round(pt_sec)], true, true);
            }, 5000);
          }
        },
        events: {
          load: function () {
            // set up the updating of the chart each second
            var seriesTx = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(); // current time
              seriesTx.addPoint([x, Math.round(tx_sec)], true, true);
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
        type: 'areaspline',
        color: 'rgba(25,55,55,0.05)', // fill area color
        lineColor: 'rgba(247,225,187,0.25)', // line color
        name: 'Payments per second', 
        data: (function () {
            var tx_xy = [];
            let p_total = 0;
            j_5min.sort(function(a, b){ return a.max_time-b.max_time });
            j_5min.forEach(function(element) {
                tx_xy.push([
                    element.max_time,
                    element.sum_tx
                ]);
            });
            // smooth over minute
            for (var i = 0; i <= tx_xy.length-1; i++) {
                let m = 0;
                // handle tip and tail
                for (var j = 6; j >= -5; j--) {
                    let k = 0;
                    if (j+i<0) {
                        k=0;
                    }
                    else if (j+i>tx_xy.length-1) {
                        k=tx_xy.length-1;
                    }
                    else {
                        k=j+i;
                    }
                    m = m + tx_xy[k][1];
                }
                tx_xy[i][1] =Math.round(m/12);
            }
            return tx_xy;
        }()) }],
      series: [{ // top graph
        type: 'areaspline',
        color: 'rgba(25,55,55,0.05)', // fill area color
        lineColor: 'rgba(247,225,187,0.25)', // line color
        name: 'Payments per second', 
        data: (function () {
            var pt_xy = [];
            let p_total = 0;
            j_5min.sort(function(a, b){ return a.max_time-b.max_time });
            j_5min.forEach(function(element) {
                pt_xy.push([
                    element.max_time,
                    element.sum_pt
                ]);
            });
            // smooth over minute
            for (var i = 0; i <= pt_xy.length-1; i++) {
                let m = 0;
                // handle tip and tail
                for (var j = 6; j >= -5; j--) {
                    let k = 0;
                    if (j+i<0) {
                        k=0;
                    }
                    else if (j+i>pt_xy.length-1) {
                        k=pt_xy.length-1;
                    }
                    else {
                        k=j+i;
                    }
                    m = m + pt_xy[k][1];
                }
                pt_xy[i][1] =Math.round(m/12);
            }
            return pt_xy;
        }()) }]
    });
     document.getElementById("ptscl_graph").style.opacity = "0.95";
     
}
//setTimeout(function() { drawGraph(); }, 15000);
     