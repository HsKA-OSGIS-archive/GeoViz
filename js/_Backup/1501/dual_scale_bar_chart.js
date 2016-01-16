function drawDualScaleBarChart(div) {
	
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

// Tooltip for Raumluft:
var tip_rl = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>AVG RL MW in </strong>" + d.NAME_2 +  "<strong>: </strong><span style='color:red'>" + d.AVG_MW_RL + "</span>" + "<strong> Bq m-3 </strong>";
  });
  
 // Tooltip for Bodenluft:
var tip_bl = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>AVG BL MW in </strong>" + d.NAME_2 +  "<strong>: </strong><span style='color:red'>" + d.AVG_MW_BL + "</span>" + "<strong> kBq m-3 </strong>";
  });
  
var svg = d3.select(div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
svg.call(tip_rl);
svg.call(tip_bl);

d3.csv("../data/processed_data/adm/DEU_adm2_pa_clip_total_statistics_fixed.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.NAME_2; }));
  y0.domain([0, d3.max(data, function(d) { return d.AVG_MW_RL; })]); //average raumluft measurement in county
  
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
	  /*.attr("y", 6)
	  .attr("dy", "-2em")
	  .style("text-anchor", "end")
	  .style("text-anchor", "end")
	  .text("Avg. Raumluft Measurement");*/
	  .attr("transform", "rotate(-90)")
      .attr("y", 6)
      //.attr("dy", ".71em")
	  .attr("dy", "-10em")
	  .attr("dy", "-4em")
      .style("text-anchor", "end")
      //.text("Frequency");
	  .text("Average Raumluft value [Bq m-3]");
	
  svg.append("g")
	  .attr("class", "y axis axisRight")
	  .attr("transform", "translate(" + (width) + ",0)")
	  .call(yAxisRight)
	.append("text")
	  /*.attr("y", 6)
	  .attr("dy", "-2em")
	  .attr("dx", "2em")
	  .style("text-anchor", "end")
	  .text("Avg. Bodenluft Measurement");*/
	  .attr("transform", "rotate(-90)")
      .attr("y", 6)
      //.attr("dy", ".71em")
	  .attr("dy", "-10em")
	  .attr("dy", "4em")
      .style("text-anchor", "end")
      //.text("Frequency");
	  .text("Average Bodenluft value [kBq m-3]");
	  
  bars = svg.selectAll(".bar").data(data).enter();
  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x(d.NAME_2); })
      .attr("width", x.rangeBand()/2)
      .attr("y", function(d) { return y0(d.AVG_MW_RL); })
	  .attr("height", function(d,i,j) { return height - y0(d.AVG_MW_RL); }) //;
	  //new tooltip:
      .on('mouseover', tip_rl.show)										// event for tooltip
      .on('mouseout', tip_rl.hide);										// event for tooltip
	  
  bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x(d.NAME_2) + x.rangeBand()/2; })
      .attr("width", x.rangeBand() / 2)
      .attr("y", function(d) { return y1(d.AVG_MW_BL); })
	  .attr("height", function(d,i,j) { return height - y1(d.AVG_MW_BL); }) //; 
	  //new tooltip:
      .on('mouseover', tip_bl.show)										// event for tooltip
      .on('mouseout', tip_bl.hide);										// event for tooltip
});
function type(d) {
  d.AVG_MW_RL = +d.AVG_MW_RL;
  return d;
}
}
