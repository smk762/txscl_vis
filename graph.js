var chartData = generateChartData();

function generateChartData() {
  var chartData = [];
  var firstDate = new Date( 2012, 0, 1 );
  firstDate.setDate( firstDate.getDate() - 1000 );
  firstDate.setHours( 0, 0, 0, 0 );

  // 1 hour in milliseconds
  for ( var i = 0; i < 3600; i++ ) {
    var newDate = new Date( firstDate );
    newDate.setHours( 0, 0, 0, i );

    var a = Math.round( Math.random() * ( 40 + i ) ) + 100 + i;
    var b = Math.round( Math.random() * 100000000 );

    chartData.push( {
      "date": newDate,
      "value": a,
      "volume": b
    } );
  }
  return chartData;
}

var chart = AmCharts.makeChart( "chartdiv", {

  "type": "stock",
  "theme": "light",

  "categoryAxesSettings": {
    "minPeriod": "fff", // set minimum to milliseconds
    "groupToPeriods": [ 'fff', 'ss' ] // specify period grouping
  },

  "dataSets": [ {
    "color": "#b0de09",
    "fieldMappings": [ {
      "fromField": "value",
      "toField": "value"
    }, {
      "fromField": "volume",
      "toField": "volume"
    } ],

    "dataProvider": chartData,
    "categoryField": "date"
  } ],


  "panels": [ {
      "showCategoryAxis": false,
      "title": "Value",
      "percentHeight": 70,

      "stockGraphs": [ {
        "id": "g1",
        "valueField": "value",
        "type": "smoothedLine",
        "lineThickness": 2,
        "bullet": "round"
      } ],


      "stockLegend": {
        "valueTextRegular": " ",
        "markerType": "none"
      }
    },

    {
      "title": "Volume",
      "percentHeight": 30,
      "stockGraphs": [ {
        "valueField": "volume",
        "type": "column",
        "cornerRadiusTop": 2,
        "fillAlphas": 1
      } ],

      "stockLegend": {
        "valueTextRegular": " ",
        "markerType": "none"
      }
    }
  ],

  "chartScrollbarSettings": {
    "graph": "g1",
    "usePeriod": "fff",
    "position": "left"
  },

  "chartCursorSettings": {
    "valueBalloonsEnabled": true,
    "categoryBalloonDateFormats": [ {
      "period": "ss",
      "format": "NN:SS"
    }, {
      "period": "fff",
      "format": "NN:SS:QQQ"
    } ]
  },

  "periodSelector": {
    "position": "left",
    "dateFormat": "NN:SS:QQQ", // date format with milliseconds
    "inputFieldWidth": 150,
    "periods": [ {
      "period": "fff",
      "count": 10,
      "label": "10 ms",
      "selected": true

    }, {
      "period": "fff",
      "count": 50,
      "label": "50 ms"
    }, {
      "period": "ss",
      "count": 1,
      "label": "1 second"
    }, {
      "period": "mm",
      "count": 1,
      "label": "1 minute"
    }, {
      "period": "hh",
      "count": 1,
      "label": "1 hour"
    }, {
      "period": "MAX",
      "label": "MAX"
    } ]
  },

  "panelsSettings": {
    "usePrefixes": true
  }
} );