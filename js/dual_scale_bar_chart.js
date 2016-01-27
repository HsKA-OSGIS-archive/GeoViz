/**
Arguments:
----------
div:
id of div-tag the svg element should be appended to (including '#') as string, e.g. '#svg'

filenames:
csv-file with data to visualize, e.g. "../data/file.csv"

attributes:
array with three (!) attribute names (fields in csv) that are used to create the chart,
first entry is always used for the x-axis
the other two entries are used to create the two bars
[2. entry = left bar, 3. entry = right bar]
e.g. ["NAME","Value1","Value2"] [limited to 2 bars]
advantage of this chart: attributes with different units can be properly displayed in one chart!

attributes_tooltip:
Needed for the tooltip of the bars, array of two arrays,
these subarrays always consist of two entries:
1.) string for tooltip of bars
2.) string of unit
e.g.[["Value 1 Average", "m"], ["Value 2 Average", "km"]]

domain:
array of the maximum value of both fields,
e.g. [max. value of "Value1", max. value of "Value2"]

y_axis_annotation:
array of string for the annotation of the y-Axis,
first entry: left bar = left y-Axis, second entry: right bar = right y-Axis
in this case e.g. ["Average Value 1 [m]", "Average Value 2 [km]"]

based on, but enhanced: https://github.com/liufly/Dual-scale-D3-Bar-Chart 
**/
function drawDualScaleBarChart(div,filename,attributes,attributes_tooltip,domain,y_axis_annotation) {
	
var margin = {top: 50, right: 80, bottom: 300, left: 120},
    width = 855 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
//var y0 = d3.scale.linear().domain([300, 1100]).range([height, 0]),
var y0 = d3.scale.linear().domain([0, domain[0]]).range([height, 0]),
y1 = d3.scale.linear().domain([0, domain[1]]).range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
// create left yAxis - Raumluft:
var yAxisLeft = d3.svg.axis().scale(y0).ticks(6).orient("left");
// create right yAxis - Bodenluft:
var yAxisRight = d3.svg.axis().scale(y1).ticks(6).orient("right");

 // Tooltip for left bars:
var tip_lb = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
	return attributes_tooltip[0][0] + ": " + d.value_y1 + " " + attributes_tooltip[0][1];
  });

// Tooltip for right bars:
var tip_rb = d3.tip()		
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
		return attributes_tooltip[1][0] + ": " + d.value_y2 + " " + attributes_tooltip[1][1];
  });
  
var svg = d3.select(div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip_lb);	
svg.call(tip_rb);

d3.csv(filename, type, function(error, data) {
  x.domain(data.map(function(d) { return d.value_x; }));
  y0.domain([0, d3.max(data, function(d) { return d.value_y1; })]);
  
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis) //;
	  //new:
	  .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-50)");
	  
  svg.append("g")
	  .attr("class", "y axis axisLeft")
	  .attr("transform", "translate(0,0)")
	  .call(yAxisLeft)
	.append("text")
	  .attr("transform", "rotate(-90)")
      .attr("y", 6)
	  .attr("dy", "-10em")
	  .attr("dy", "-4em")
      .style("text-anchor", "end")
	  .text(y_axis_annotation[0]);
	
  svg.append("g")
	  .attr("class", "y axis axisRight")
	  .attr("transform", "translate(" + (width) + ",0)")
	  .call(yAxisRight)
	.append("text")
	  .attr("transform", "rotate(-90)")
      .attr("y", 6)
	  .attr("dy", "-10em")
	  .attr("dy", "4em")
      .style("text-anchor", "end")
	  .text(y_axis_annotation[1]);
	  
  bars = svg.selectAll(".bar").data(data).enter();
  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.value_x); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y0(d.value_y1); })
	  .attr("height", function(d,i,j) { return height - y0(d.value_y1); }) //;
	  //new tooltip:
      .on('mouseover', tip_lb.show)										// event for tooltip
      .on('mouseout', tip_lb.hide);										// event for tooltip
	  
  bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.value_x) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.value_y2); })
	  .attr("height", function(d,i,j) { return height - y1(d.value_y2); })
      .on('mouseover', tip_rb.show)										// event for tooltip
      .on('mouseout', tip_rb.hide);										// event for tooltip
});
function type(d) {
  d.value_x = d[attributes[0]];
  d.value_y1 = +d[attributes[1]];
  d.value_y2 = +d[attributes[2]];
  return d;
}
}
