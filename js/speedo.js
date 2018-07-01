// #################### Speedometer #########################
var gaugeChart_pt = AmCharts.makeChart( "speedo_pt", {
  "type": "gauge",
  "theme": "light",
  "axes": [ {
    "fontSize": 8,
    "endValue": 10000000,
    "startValue":0,
    "axisThickness": 2,
    "color": '#BBF9E6',
    "boldLabels": true,
    "usePrefixes": true,
    "axisAlpha": 1,
    "tickAlpha": 1,
    "tickColor": '#000000',
    "valueInterval": 2000000,
    "bands": [ {
      "color": "#B4C7C7",
      "endValue": 2000000,
      "innerRadius": '90%',
      "startValue": 0
    }, {
      "color": "#82A1A1",
      "endValue": 4000000,
      "innerRadius": '92%',
      "startValue": 2000000
    }, {
      "color": "#4A8282",
      "endValue": 6000000,
      "innerRadius": 0,
      "innerRadius": '92%',
      "startValue": 4000000
    }, {
      "color": "#3B6868",
      "endValue": 8000000,
      "innerRadius": 0,
      "innerRadius": '92%',
      "startValue": 6000000
    }, {
      "color": "#2D5A5A",
      "endValue": 10000000,
      "innerRadius": 0,
      "innerRadius": '90%',
      "startValue": 8000000
    } ],
    "bottomText": "",
    "bottomTextYOffset": 10,
    "bottomTextFontSize":18,
    "bottomTextColor":'#52FAC7',
    "bottomTextBold":true,
    "endValue": 10000000
  } ],
  "arrows": [ {
      "color": "#18ADA3",
      "radius": '75%'
  } ],
  "export": {
    "enabled": true
  }
} );

  // #################### Speedometer #########################
var gaugeChart_tx = AmCharts.makeChart( "speedo_tx", {
  "type": "gauge",
  "theme": "light",
  "axes": [ {
    "fontSize": 8,
    "endValue": 1250000,
    "startValue":0,
    "axisThickness": 2,
    "color": '#BBF9E6',
    "boldLabels": true,
    "usePrefixes": true,
    "axisAlpha": 1,
    "tickAlpha": 1,
    "tickColor": '#000000',
    "valueInterval": 250000,
    "bands": [ {
      "color": "#B4C7C7",
      "endValue": 250000,
      "innerRadius": '90%',
      "startValue": 0
    }, {
      "color": "#82A1A1",
      "endValue": 500000,
      "innerRadius": '92%',
      "startValue": 250000
    }, {
      "color": "#4A8282",
      "endValue": 750000,
      "innerRadius": 0,
      "innerRadius": '92%',
      "startValue": 500000
    }, {
      "color": "#3B6868",
      "endValue": 1000000,
      "innerRadius": 0,
      "innerRadius": '92%',
      "startValue": 750000
    }, {
      "color": "#2D5A5A",
      "endValue": 1250000,
      "innerRadius": 0,
      "innerRadius": '90%',
      "startValue": 1000000
    } ],
    "bottomText": "",
    "bottomTextYOffset": 10,
    "bottomTextFontSize":18,
    "bottomTextColor":'#52FAC7',
    "bottomTextBold":true,
    "endValue": 1250000
  } ],
  "arrows": [ {
      "color": "#18ADA3",
      "radius": '75%'
  } ],
  "export": {
    "enabled": true
  }
} );


// set random value
function updateNeedlePt(speedoVal) {
  if (speedoVal < 0) { speedoVal = 0 };
  if (speedoVal > 12500000) { speedoVal = 12500000 };
  speedoVal = Math.floor(speedoVal);
  if ( gaugeChart_pt ) {
    if ( gaugeChart_pt.arrows ) {
      if ( gaugeChart_pt.arrows[ 0 ] ) {
        if ( gaugeChart_pt.arrows[ 0 ].setValue ) {
          gaugeChart_pt.arrows[ 0 ].setValue( speedoVal );
          gaugeChart_pt.axes[ 0 ].setBottomText( speedoVal  );
          gaugeChart_pt.axes[ 0 ].fontSize = 8;
        }
      }
    }
  }
}

// set random value
function updateNeedleTx(speedoVal) {
  if (speedoVal < 0) { speedoVal = 0 };
  if (speedoVal > 12500000) { speedoVal = 12500000 };
  speedoVal = Math.floor(speedoVal);
  if ( gaugeChart_tx ) {
    if ( gaugeChart_tx.arrows ) {
      if ( gaugeChart_tx.arrows[ 0 ] ) {
        if ( gaugeChart_tx.arrows[ 0 ].setValue ) {
          gaugeChart_tx.arrows[ 0 ].setValue( speedoVal );
          gaugeChart_tx.axes[ 0 ].setBottomText( speedoVal  );
          gaugeChart_tx.axes[ 0 ].fontSize = 8;
        }
      }
    }
  }
}

