//Global variables
var margin = {top: 20, right: 20, bottom: 200, left: 200},
    padding = {top: 60, right: 60, bottom: 60, left: 60},
    totHeight = 600,//total size of the svg element
    totWidth = 600,
    innerWidth = totHeight - margin.left - margin.right,//offet to the axis
    innerHeight = totWidth - margin.top - margin.bottom;
    width = innerWidth - padding.left - padding.right,//just the area where bubbles are visible
    height = innerHeight - padding.top - padding.bottom,
    myYcol = 'Nutzung',
    myXcol = 'Hausart';

//controlprints to the console
console.log("the variable totHeight has the value: " + totHeight);
console.log("the variable totHeight has the value: " + totWidth);
console.log("the variable totHeight has the value: " + innerHeight);
console.log("the variable totHeight has the value: " + innerWidth);
console.log("the variable totHeight has the value: " + height);
console.log("the variable totHeight has the value: " + width);

function draw(data) {
  //definition of x-scale 
  var xScale = d3.scale.ordinal()//defines the ordinal (qualitative) scale-type
    .rangeRoundBands([0, width], .2);

  //definition of y-scale 
  var yScale = d3.scale.ordinal()
    .rangeRoundBands([0, height], .2);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")//defines direction the labels of the axis are placed
    .ticks(function(d) {
      return d[myXcol];
    });//defines number of subelements

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(function(d) {
      return d[myYcol];
    });

  //fill the x axis with data
  xScale.domain(data.map(function(d) {
    return d[myXcol];
  }));

  //fill the y axis with data
  yScale.domain(data.map(function(d) {
    return d[myYcol];
  }));

  //check out the margin-conventions set up by mike bostock
  //http://bl.ocks.org/mbostock/3019563

  //create the svg element and add the margins for the chart
  //append the svg element to the DOM-Element "body"
  var svg = d3.select("body").append("svg")
      .attr("width", totWidth)
      .attr("height", totHeight)

  //object, which has the size of the chart and contains the axis and the bubbles
  var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //adding X-Axis
  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-50)");

  //adding Y-Axis
  g.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em");

  //adding the circles for the diagram
  g.selectAll("circle")
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
    .attr("transform", "translate(" + padding.left * 0.5 + "," + padding.top * 0.5 + ")");
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
