// #################### Speedometer #########################
var gaugeChart = AmCharts.makeChart( "speedo", {
  "type": "gauge",
  "theme": "light",
  "axes": [ {
    "fontSize": 11,
    "endValue": 1250000,
    "startValue":0,
    "axisThickness": 2,
    "boldLabels": true,
    "axisAlpha": 1,
    "tickAlpha": 0.5,
    "valueInterval": 125000,
    "bands": [ {
      "color": "#008141",
      "endValue": 250000,
      "startValue": 0
    }, {
      "color": "#67C700",
      "endValue": 500000,
      "startValue": 250000
    }, {
      "color": "#fdd400",
      "endValue": 750000,
      "startValue": 500000
    }, {
      "color": "#EFA510",
      "endValue": 1000000,
      "startValue": 750000
    }, {
      "color": "#cc4748",
      "endValue": 1250000,
      "innerRadius": "95%",
      "startValue": 1000000
    } ],
    "bottomText": " tx/s",
    "bottomTextYOffset": 20,
    "bottomTextFontSize":18,
    "bottomTextColor":'#000000',
    "bottomTextBold":true,
    "endValue": 1250000
  } ],
  "arrows": [ {} ],
  "export": {
    "enabled": true
  }
} );

// set random value
function updateNeedle(num) {
  num = num * sendMany_multiplier;
  if (num > 1) {
    num =  parseFloat(num).toFixed(2);
  }
  else if (num > 10) {
    num =  parseFloat(num).toFixed(1);

  }
  else if (num > 1000) {
    num = Math.round(parseFloat(num));

  }
  if ( gaugeChart ) {
    if ( gaugeChart.arrows ) {
      if ( gaugeChart.arrows[ 0 ] ) {
        if ( gaugeChart.arrows[ 0 ].setValue ) {
          // console.log('#########################    needle value - '+value);
          gaugeChart.arrows[ 0 ].setValue( num );
          gaugeChart.axes[ 0 ].setBottomText( num + " Payments/s" );
        }
      }
    }
  }
  return gaugeChart;
}



  if (sendMany_state == 'on') {
      sendMany_multiplier = 100;
  }
  else {
    sendMany_multiplier = 1;
  }