//based on: http://bl.ocks.org/mbostock/3885705
function drawSortableBarChart(div,drawType,boolean_clearDiv) {
var margin = {top: 70, right: 50, bottom: 100, left: 80},
    width = 960 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

//var formatyAxis = d3.format(".0%");
var formatyAxis = d3.format(".4n");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, 1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatyAxis);
	
// Tooltip:
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>AVG </strong>" + drawType + "<strong> MW in </strong>" + d.name + "<strong>: </strong><span style='color:red'>" + d.value + "</span>";
  });

//If div already contains a svg element -> clear it:
if (boolean_clearDiv == true) {
	clearDiv(div);
}

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
svg.call(tip);

//d3.csv("/GeoViz/data/processed_data/adm/DEU_adm2_pa_clip_total_statistics_fixed.csv", function(error, data) {
d3.csv("../data/processed_data/adm/DEU_adm2_pa_clip_total_statistics_fixed.csv", type, function(error, data) {

  

  //x.domain(data.map(function(d) { return d.letter; }));
  //y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

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
      //.text("Frequency");
	  .text("Average " + drawType + " value");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      /*.attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });*/
	  .attr("x", function(d) { return x(d.name); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
	  //new tooltip:
      .on('mouseover', tip.show)										// event for tooltip
      .on('mouseout', tip.hide);										// event for tooltip

  d3.select("input").on("change", change);

  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 2000);

  function change() {
    clearTimeout(sortTimeout);

    // Copy-on-write since tweens are evaluated after a delay.
    var x0 = x.domain(data.sort(this.checked
		/*? function(a, b) { return b.frequency - a.frequency; }
        : function(a, b) { return d3.ascending(a.letter, b.letter); })
        .map(function(d) { return d.letter; }))
        .copy();*/
        ? function(a, b) { return b.value - a.value; }
        : function(a, b) { return d3.ascending(a.name, b.name); })
        .map(function(d) { return d.name; }))
        .copy();

    svg.selectAll(".bar")
		//.sort(function(a, b) { return x0(a.letter) - x0(b.letter); });
        .sort(function(a, b) { return x0(a.name) - x0(b.name); });

    var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 50; };

    transition.selectAll(".bar")
        .delay(delay)
		//.attr("x", function(d) { return x0(d.letter); });
        .attr("x", function(d) { return x0(d.name); });

    //Update x-axis:
	transition.select("g.x.axis")
        .call(xAxis)
		.selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-50)")
      .selectAll("g")
        .delay(delay);
  }
});
//Change function type to get right values:
function type(d) {
  console.log(drawType);
  d.name = d.NAME_2;
  if (drawType == "raumluft") {
	d.value = +d.AVG_MW_RL
  } else if (drawType == "bodenluft") {
	d.value = +d.AVG_MW_BL
  } else {
	d.value = +d.AVG_MW_ODL
  }
  return d;
}

//clear div of chart:
function clearDiv(div)
{
    //document.getElementById(div).innerHTML = "";
	var div = document.getElementById('cart_item');
	while(div.firstChild){
		div.removeChild(div.firstChild);
	}
	svg.selectAll("*").remove();
}
}
