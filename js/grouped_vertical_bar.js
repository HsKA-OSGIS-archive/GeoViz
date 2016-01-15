function drawGroupedVerticalBar(div,filename,attributes,range) {
/*div = div to append svg to, filename = csv-file with data to visualize, attributes = array with attribute names (fields in csv), range = colors for bars
div,filenames,attribute_choropleth,attributes_tooltip,domain,range*/
	
var margin = {top: 40, right: 50, bottom: 200, left: 50},
    width = 1024 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(range);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));
	
// Tooltip:
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
		/*var name = d.name;
		if (d.name == "rl_eg") {
			name = "<strong>Avg. msrmnt. on ground floor</strong>";
		}
		if (d.name == "rl_1g") {
			name = "<strong>Avg. msrmnt. on first floor</strong>";
		}
		if (d.name == "rl_ke") {
			name = "<strong>Avg. msrmnt. in basement</strong>";
		}
		var measurement = Math.round(d.value);
		//return "<strong>Floor </strong>" + d.name name +  "<strong>: </strong><span style='color:red'>" + d.y0 + "</span>";
		return name +  "<strong>: </strong><span style='color:red'>" + measurement + "</span>";*/
		
		return d.name + " " + d.value;  });

var svg = d3.select(div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv(filename, function(error, data) {
  if (error) throw error;

	var chart_keys = d3.keys(data[0]).filter(function(key) { return ((attributes.indexOf(key)>-1)& key != attributes[0] )});

  data.forEach(function(d) {
    d.values = chart_keys.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(data.map(function(d) { console.log(d[attributes[0]]); return d[attributes[0]]; }));
  x1.domain(chart_keys).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.values, function(d) { console.log(d.name); console.log(d.value); return d.value; }); })]);

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
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Radon [Bq m-3]");

  var chart = svg.selectAll(".chart")
      .data(data)
    .enter().append("g")
      //.attr("class", "chart")
	  .attr("class", "g")
      .attr("transform", function(d) { console.log(d[attributes[0]]); return "translate(" + x0(d[attributes[0]]) + ",0)"; });

  chart.selectAll("rect")
      .data(function(d) { return d.values; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); }) //;
	  //new tooltip:
      .on('mouseover', tip.show)										// event for tooltip
      .on('mouseout', tip.hide);										// event for tooltip

  var legend = svg.selectAll(".legend")
      .data(chart_keys.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { 
	    /*var name = "";
		if (d == "rl_ke") {
			name = "Msrmnt. in basement";
		}
		if (d == "rl_1g") {
			name = "Msrmnt. on first floor";
		}
		if (d == "rl_eg") {
			name = "Msrmnt. on ground floor";
		}
		return name; });*/
		return d;});
});
}
