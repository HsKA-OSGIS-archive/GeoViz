//Global variables
var margin = {top: 20, right: 20, bottom: 200, left: 200},
    totHeight = 600,
    totWidth = 600,
    innerWidth = totHeight - margin.left - margin.right,
    innerHeight = totWidth - margin.top - margin.bottom;


function draw(data) {
  //definition of x-scale 
  var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, innerWidth], .2);

  //definition of y-scale 
  var yScale = d3.scale.ordinal()
    .rangeRoundBands([0, innerHeight], .2);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(function(d) {
      return d.Hausart;
    });

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(function(d) {
      return d.Nutzung;
    });

  xScale.domain(data.map(function(d) {
    return d.Hausart;
  }));

  yScale.domain(data.map(function(d) {
    return d.Nutzung;
  }));

  //check out the margin-conventions set up by mike bostock
  //http://bl.ocks.org/mbostock/3019563

  //create the svg element and add the margins for the chart
  var svg = d3.select("body").append("svg")
    .attr("width", innerWidth + margin.left + margin.right)
    .attr("height", innerHeight + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //adding X-Axis
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + innerHeight + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-50)");

  //adding Y-Axis
  svg.append("g")
    .attr("class", "axis")
  //  .attr("transform", "translate(" + width + ", 0 )")
  //  .attr("transform", "translate(0," + width + ")")
    .call(yAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em");

  //adding the circles for the diagram
  svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", function(d) {
      return xScale(d.Hausart);
    })//define x offset
    .attr("cy", function(d) {
      return yScale(d.Nutzung);
    })//define y offset 
    .attr("r", function(d) {
       return d.Messwert*0.4;
    })//define radius 
    .attr('fill', 'steelblue')//define colour and (no) stroke
    .attr('fill-opacity', 0.3)//set opacity
/*    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")*/;
/*    .attr("radius", function(d) {
       return d.Messwert;
    });*/
}//draw

//defining some testdata
var data =[{
  ID: 1,
  Hausart: 'Reihenhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 1,
  Stockwerk: 0,
  Messwert: 0,
  Nutzung: 'Keller'
},{
  ID: 2,
  Hausart: 'Reihenhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 2,
  Stockwerk: 0,
  Messwert: 0,
  Nutzung: 'Keller'
},{
  ID: 3,
  Hausart: 'Mehrfamilienhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 3,
  Stockwerk: 0,
  Messwert: 223,
  Nutzung: 'Keller'
},{
  ID: 4,
  Hausart: 'Einfamilienhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 4,
  Stockwerk: 0,
  Messwert: 56,
  Nutzung: 'Keller'
},{
  ID: 5,
  Hausart: 'Reihenhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 2,
  Stockwerk: 1,
  Messwert: 68,
  Nutzung: 'Wohn-/Esszimmer'
},{
  ID: 6,
  Hausart: 'Mehrfamilienhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 3,
  Stockwerk: 1,
  Messwert: 56,
  Nutzung: 'Kinderzimmer'
},{
  ID: 7,
  Hausart: 'Einfamilienhaus',
  Bauweise: 'Massivhaus',
  Haus_ID: 4,
  Stockwerk: 1,
  Messwert: 87,
  Nutzung: 'Kinderzimmer'
}]

draw(data);