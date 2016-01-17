function drawDualScaleBarChart(div,filename,attributes,y_axis_annotation) { 
/*div to append the svg element to, filename of the data, attributes to visualize [x-axis and y-axis; first: attribute for x-Axis, second: attribute for y-Axis (left bars), second: attribute for y-Axis (right bars)]*/
	
var margin = {top: 50, right: 80, bottom: 200, left: 120},
    width = 900 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
//var y0 = d3.scale.linear().domain([300, 1100]).range([height, 0]),
var y0 = d3.scale.linear().domain([0, 450]).range([height, 0]),
y1 = d3.scale.linear().domain([0, 350]).range([height, 0]);
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
    //return "<strong>Value in </strong>" + d.value_x +  "<strong>: </strong><span style='color:red'>" + d.value_y1 + "</span>" + "<strong> kBq m-3 </strong>";
	return d.value_x + ": " + d.value_y1 + " " + d.value_unit1;
  });

// Tooltip for right bars:
var tip_rb = d3.tip()		
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    //return "<strong>Value in </strong>" + d.value_x +  "<strong>: </strong><span style='color:red'>" + d.value_y2 + "</span>" + "<strong> Bq m-3 </strong>";
	return d.value_x + ": " + d.value_y2 + " " + d.value_unit2;
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
  y0.domain([0, d3.max(data, function(d) { return d.value_y1; })]); //average raumluft measurement in county
  
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
	  .attr("height", function(d,i,j) { return height - y1(d.value_y2); }) //; 
	  //new tooltip:
      .on('mouseover', tip_rb.show)										// event for tooltip
      .on('mouseout', tip_rb.hide);										// event for tooltip
});
function type(d) {
  d.value_x = d[attributes[0]];
  d.value_y1 = +d[attributes[1]];
  d.value_unit1 = d[attributes[2]];
  d.value_y2 = +d[attributes[3]];
  d.value_unit2 = d[attributes[4]];
  return d;
}
}
