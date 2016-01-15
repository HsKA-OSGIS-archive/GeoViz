function drawChoroplethMap(div,filenames,attribute_choropleth,attributes_tooltip,domain,range) {
	console.log(attributes_tooltip.length);
  var height = 1024;
  var width = 768;
  var projection = d3.geo.mercator();
  var counties_var = void 0;
  var db = d3.map();
  var b, s, t;
  //var sparkline = d3.charts.sparkline().height(50).width(138);
  var map = void 0; // update global

  var geoID = function(d) {
	console.log(d.properties.id);
    return d.properties.id;
  };
	
  var color = d3.scale.threshold().domain(domain)
			.range(range); //<-A
			
  var path = d3.geo.path().projection(projection);
  
  //Tooltip:
  /*var divs_tooltip = [];
  for (i=0; i<attributes_tooltip.length;i++) {	//attributes_tooltip.length <=6
	//tooltip.append('div').attr('class', attributes_tooltip[i]);
	divs_tooltip[i] = "." + attributes_tooltip[i];
  }*/
   var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		console.log(attributes_tooltip.length);
		var tooltip = "";
		if (attributes_tooltip.length >= 1) {
			console.log("1");
			tooltip += attributes_tooltip[0] + ": " + d[attributes_tooltip[0]]; 
		}
        if (attributes_tooltip.length >= 2) {
			console.log("2");
			tooltip += "<br>" + attributes_tooltip[1] + ": " + d[attributes_tooltip[1]];
		}
		if (attributes_tooltip.length >= 3) {
			console.log("3");
			tooltip += "<br>" + attributes_tooltip[2] + ": " + d[attributes_tooltip[2]];
		}
		if (attributes_tooltip.length >= 4) {
			console.log("4");
			tooltip += "<br>" + attributes_tooltip[3] + ": " + d[attributes_tooltip[3]];
		}
		if (attributes_tooltip.length >= 5) {
			console.log("5");
			tooltip += "<br>" + attributes_tooltip[4] + ": " + d[attributes_tooltip[4]];
		}
		if (attributes_tooltip.length = 6) {
			console.log("6");
			tooltip += "<br>" + attributes_tooltip[5] + ": " + d[attributes_tooltip[5]];
		}
		return tooltip;
  });

  var svg = d3.select(div)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
	  .call(d3.behavior.zoom()
	  .on("zoom", redraw));
	  
  function redraw() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }
  
  svg.call(tip);
  
  
  
  /*if (divs_tooltip.length > 0 & attributes_tooltip.length > 0) {
	var tooltip = d3.select(div);
	tooltip.append('div').attr('class','tooltip');
	//var tooltip = d3.select(div).append('div').attr('class', 'tooltip');
		if (divs_tooltip.length >= 1) {
			tooltip.append('div').attr('class', divs_tooltip[0]);
		}
        if (divs_tooltip.length >= 2) {
			tooltip.append('div').attr('class', divs_tooltip[1]);
		}
		if (divs_tooltip.length >= 3) {
			tooltip.append('div').attr('class', divs_tooltip[2]);
		}
		if (divs_tooltip.length >= 4) {
			tooltip.append('div').attr('class', divs_tooltip[3]);
		}
		if (divs_tooltip.length >= 5) {
			tooltip.append('div').attr('class', divs_tooltip[4]);
		}
		if (divs_tooltip.length = 6) {
			tooltip.append('div').attr('class', divs_tooltip[5]);
		}
  }*/
  

  d3.json(filenames[0], function(data) {
	d3.csv(filenames[1], function(statistics) {
		
		//get color for choropleth map:
		var rateByAVG = {};
				
        statistics.forEach(function (d) { // <-B
                rateByAVG[d[attribute_choropleth[0]]] = Math.round( d[attribute_choropleth[1]] );
		});	
		
		//change also later to get lates topojson from PostGIS database?
		var counties = topojson.feature(data, data.objects.counties);

    
		projection.scale(1).translate([0, 0]);
		var b = path.bounds(counties);
		var s = .9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
		var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
		projection.scale(s).translate(t);

		map = svg.append('g').attr('class', 'boundary');
	
		counties_var = map.selectAll('path').data(counties.features);

		counties_var.enter()
		.append('path')
		.attr('d', path);
		//.on('mouseover', hover);

		//counties_var.attr('fill', '#123');
		counties_var.attr("fill", function (d) {
						var col = color(rateByAVG[d.properties.id]);
						console.log(col);
						return col; // <-C
        });

		counties_var.exit().remove();

		
		//legend (source: http://stackoverflow.com/questions/21838013/d3-choropleth-map-with-legend)                           
		var legend = svg.selectAll('g.legendEntry')
			//.data(color.range().reverse())
			.data(color.range())
			.enter()
			.append('g').attr('class', 'legendEntry');

		legend
			.append('rect')
			.attr("x", width - 120)
			.attr("y", function(d, i) {
				return i * 20;
			})
			.attr("width", 10)
			.attr("height", 10)
			.style("stroke", "black")
			.style("stroke-width", 1)
			.style("fill", function(d){return d;}); 
		
		//the data objects are the fill colors

		legend
			.append('text')
			.attr("x", width - 105) //leave 5 pixel space after the <rect>
			.attr("y", function(d, i) {
				return i * 20;
			})
			.attr("dy", "0.8em") //place text one line *below* the x,y point
			.text(function(d,i) {
				var extent = color.invertExtent(d);
				//extent will be a two-element array, format it however you want:
				var format = d3.format("0.2f");
				return format(+extent[0]) + " - " + format(+extent[1]);
			});
    
      
    
	
	d3.csv(filenames[2], function(point_data) {
      var measurementPoints = svg.selectAll('circle').data(point_data);
	  /* console.log("Bevor saveTooltips");
	  Get Tooltips for measurements:
	  var tooltip_dictionary = saveTooltips(raumluft_data,attributes_tooltip);*/

      measurementPoints.enter()
          .append('circle')
          .attr('cx', function(d) {return projection([d.X, d.Y])[0]})
          .attr('cy', function(d) {return projection([d.X, d.Y])[1]})
          .attr('r', 4)
          .attr('fill', 'steelblue')
		  .attr('stroke', 'black')
		  //new tooltip:
		  .on('mouseover', tip.show)			// event for tooltip
		  .on('mouseout', tip.hide);			// event for tooltip
		  /*.on('mouseover', function(d) {
				console.log("inMouseOver");
				if (divs_tooltip.length >= 1) {
					console.log(d[attributes_tooltip[0]]);
					tooltip.select(divs_tooltip[0]).html(d[attributes_tooltip[0]]);
				}
				if (divs_tooltip.length >= 2) {
					tooltip.select(divs_tooltip[1]).html(d[attributes_tooltip[1]]);
				}
				if (divs_tooltip.length >= 3) {
					tooltip.select(divs_tooltip[2]).html(d[attributes_tooltip[2]]);
				}
				if (divs_tooltip.length >= 4) {
					tooltip.select(divs_tooltip[3]).html(d[attributes_tooltip[3]]);
				}
				if (divs_tooltip.length >= 5) {
					tooltip.select(divs_tooltip[4]).html(d[attributes_tooltip[4]]);
				}
				if (divs_tooltip.length = 6) {
					tooltip.select(divs_tooltip[5]).html(d[attributes_tooltip[5]]);
				}
				tooltip.style('display', 'block');
          }); 
		  
          raumluftPoints.on('mouseout', function() {                              // NEW
            tooltip.style('display', 'none');
          });*/  
    
	});
	
	});	
	
  });
}

/*function saveTooltips(d,attributes_tooltip) {
	//console.log(d);
	var tooltip_dictionary = {};
	
	d.forEach(function(data) {
		tooltip = "";
		for (i=0;attributes_tooltip.length;i++) {
			tooltip += attributes_tooltip[i] + ": " +  data[attributes_tooltip[i]] + "<br>";
		}
		console.log(tooltip);
		tooltip_dictionary[data] = tooltip;
	});
	
	/*for (i=0;attributes_tooltip.length;i++) {
		console.log(tooltip);
		tooltip += attributes_tooltip[i] + ": " +  d[attributes_tooltip[i]] + "<br>";
	}*/
	/*return tooltip_dictionary;
}*/