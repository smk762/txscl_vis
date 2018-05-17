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
    "bottomTextFontSize":24,
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
function updateNeedle(numTX) {
  if (sendMany_state == 'on') {
      sendMany_multiplier = 100;
      tx_payment = "pymt";
  }
  else {
    sendMany_multiplier = 1;
    tx_payment = "tx";
  }
  numTX = numTX * sendMany_multiplier;
  if (numTX > 1) {
    numTX =  parseFloat(numTX).toFixed(2);
  }
  else if (numTX > 10) {
    numTX =  parseFloat(numTX).toFixed(1);

  }
  else if (numTX > 1000) {
    numTX = Math.round(parseFloat(numTX));

  }
  if ( gaugeChart ) {
    if ( gaugeChart.arrows ) {
      if ( gaugeChart.arrows[ 0 ] ) {
        if ( gaugeChart.arrows[ 0 ].setValue ) {
          // console.log('#########################    needle value - '+value);
          gaugeChart.arrows[ 0 ].setValue( numTX );
          gaugeChart.axes[ 0 ].setBottomText( numTX + " "+tx_payment+"/s" );
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