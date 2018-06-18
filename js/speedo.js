// #################### Speedometer #########################
var gaugeChart = AmCharts.makeChart( "speedo", {
  "type": "gauge",
  "theme": "light",
  "axes": [ {
    "fontSize": 8,
    "endValue": 10000000,
    "startValue":0,
    "axisThickness": 2,
    "color": '#4A8282',
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
    "bottomTextYOffset": 16,
    "bottomTextFontSize":18,
    "bottomTextColor":'#4A8282',
    "bottomTextBold":true,
    "endValue": 10000000
  } ],
  "arrows": [ {
      "color": "#2D5A5A",
      "radius": '75%'
  } ],
  "export": {
    "enabled": true
  }
} );
let speedoVal = 0;
// set random value
function updateNeedle(speedoVal) {
  if (speedoVal < 0) { speedoVal = 0 };
  if (speedoVal > 12500000) { speedoVal = 12500000 };
  speedoVal = Math.floor(speedoVal);
  if ( gaugeChart ) {
    if ( gaugeChart.arrows ) {
      if ( gaugeChart.arrows[ 0 ] ) {
        if ( gaugeChart.arrows[ 0 ].setValue ) {
          gaugeChart.arrows[ 0 ].setValue( speedoVal );
          gaugeChart.axes[ 0 ].setBottomText( speedoVal  );
          gaugeChart.axes[ 0 ].fontSize = 8;
        }
      }
    }
  }
}

