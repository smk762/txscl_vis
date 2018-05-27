// #################### Speedometer #########################
var gaugeChart = AmCharts.makeChart( "speedo", {
  "type": "gauge",
  "theme": "light",
  "axes": [ {
    "fontSize": 8,
    "endValue": 1250000,
    "startValue":0,
    "axisThickness": 2,
    "color": '#ffffff',
    "boldLabels": true,
    "usePrefixes": true,
    "axisAlpha": 1,
    "tickAlpha": 1,
    "tickColor": '#000000',
    "valueInterval": 125000,
    "bands": [ {
      "color": "#008141",
      "endValue": 250000,
      "innerRadius": '90%',
      "startValue": 0
    }, {
      "color": "#67C700",
      "endValue": 500000,
      "innerRadius": '92%',
      "startValue": 250000
    }, {
      "color": "#fdd400",
      "endValue": 750000,
      "innerRadius": 0,
      "innerRadius": '92%',
      "startValue": 500000
    }, {
      "color": "#EFA510",
      "endValue": 1000000,
      "innerRadius": 0,
      "innerRadius": '92%',
      "startValue": 750000
    }, {
      "color": "#cc4748",
      "endValue": 1250000,
      "innerRadius": 0,
      "innerRadius": '90%',
      "startValue": 1000000
    } ],
    "bottomText": " tx/s",
    "bottomTextYOffset": 20,
    "bottomTextFontSize":14,
    "bottomTextColor":'#FFFFFF',
    "bottomTextBold":true,
    "endValue": 1250000
  } ],
  "arrows": [ {} ],
  "export": {
    "enabled": true
  }
} );
let speedoVal = 0;
// set random value
function updateNeedle() {
  if (speedoVal < 0) { speedoVal = 0 };
  if (speedoVal > 12500000) { speedoVal = 12500000 };
  speedoVal = Math.floor(speedoVal);
  console.log(speedoVal);
  if ( gaugeChart ) {
    if ( gaugeChart.arrows ) {
      if ( gaugeChart.arrows[ 0 ] ) {
        if ( gaugeChart.arrows[ 0 ].setValue ) {
          gaugeChart.arrows[ 0 ].setValue( speedoVal );
          gaugeChart.axes[ 0 ].setBottomText( speedoVal + " Payments/s" );
          gaugeChart.axes[ 0 ].fontSize = 8;
        }
      }
    }
  }
}

