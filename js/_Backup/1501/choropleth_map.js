function drawChoroplethMap(div) {

  var height = 1024;
  var width = 768;
  var projection = d3.geo.mercator();
  var counties_var = void 0;
  var db = d3.map();
  var b, s, t;
  var sparkline = d3.charts.sparkline().height(50).width(138);
  var map = void 0; // update global
  
  /*// New function
  var zoomed = function () {
    map.attr("transform", "translate("+ d3.event.translate + ")scale(" + d3.event.scale + ")");
  };

  // New function
  var zoom = d3.behavior.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);*/

  /*var setDb = function(data) {
    data.forEach(function(d) {
      db.set(d.ID_2, [ //COUNT_BL,AVG_MW_BL,COUNT_ODL,AVG_MW_ODL,COUNT_RL,AVG_MW_RL
        {"x": 1, "y": +d.AVG_MW_BL},
        {"x": 2, "y": +d.AVG_MW_ODL},
        {"x": 3, "y": +d.AVG_MW_RL}
	  ]);
    });
  };*/

  var geoID = function(d) {
	console.log(d.properties.id);
    return d.properties.id;
  };

  var hover = function(d) {
    var div = document.getElementById('tooltip');
    div.style.left = event.pageX +'px';
    div.style.top = event.pageY + 'px';
    div.innerHTML = d.properties.name;
	console.log(d.properties.id);

    var id = geoID(d);
    d3.select("#tooltip").datum(db.get(id)).call(sparkline.draw);
  };
	
  var color = d3.scale.threshold().domain([60, 100, 150, 250, 350])
			.range(["#0a6e01", "#40ff05", "#E4FF05", "#FFDB00", "#ff6700", "#ff0000"]); //<-A
			//.range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]); //<-A
			//.range(["#000", "#222", "#333", "#444", "#555", "#666"]);
			
  var path = d3.geo.path().projection(projection);

  var svg = d3.select(div)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
	  .call(d3.behavior.zoom()
	  .on("zoom", redraw));
	  
  function redraw() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }
  
  var tooltip = d3.select(div)                               // NEW
          .append('div')                                                // NEW
          .attr('class', 'tooltip');                                    // NEW
                      
        tooltip.append('div')                                           // NEW
          .attr('class', 'hausart');                                      // NEW
		  
		  tooltip.append('div')                                           // NEW
          .attr('class', 'bauweise');                                      // NEW
             
        tooltip.append('div')                                           // NEW
          .attr('class', 'mw_avg');                                      // NEW

        tooltip.append('div')                                           // NEW
          .attr('class', 'mw_1g');                                    // NEW
		  
		  tooltip.append('div')                                           // NEW
          .attr('class', 'mw_eg');                                    // NEW
		  
		  tooltip.append('div')                                           // NEW
          .attr('class', 'mw_ke');                                    // NEW

  d3.json("../data/processed_data/adm/DEU_adm2_pa_clip_total_statistics2_topo.json", function(data) {
	d3.csv("../data/processed_data/adm/DEU_adm2_pa_clip_total_statistics_fixed.csv", function(statistics) {
	
		//CSV:
		//setDb(statistics);
		var setDb = function(data) {
			data.forEach(function(d) {
				db.set(d.ID_2, [ //COUNT_BL,AVG_MW_BL,COUNT_ODL,AVG_MW_ODL,COUNT_RL,AVG_MW_RL
					{"x": 1, "y": +d.AVG_MW_BL},
					{"x": 2, "y": +d.AVG_MW_ODL},
					{"x": 3, "y": +d.AVG_MW_RL}
				]);
			});
		};
		setDb(statistics);
		
		var rateByAVG = {};
				
        statistics.forEach(function (d) { // <-B
                rateByAVG[d.ID_2] = Math.round( d.AVG_MW_RL );
				console.log(d.ID_2, d.NAME_2, rateByAVG[d.ID_2])
		});	
		
		
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
    
      
    
	
	d3.csv('../data/processed_data/bfs/raumluft_4326_statistics_attributes_total_csv.csv', function(raumluft_data) {
      var raumluftPoints = svg.selectAll('circle').data(raumluft_data);

      raumluftPoints.enter()
          .append('circle')
          .attr('cx', function(d) {return projection([d.X, d.Y])[0]})
          .attr('cy', function(d) {return projection([d.X, d.Y])[1]})
          .attr('r', 4)
          .attr('fill', 'steelblue')
		  .attr('stroke', 'black')
		  .on('mouseover', function(d) {                            // NEW
            tooltip.select('.hausart').html(d.HAUSART);                // NEW
			tooltip.select('.bauweise').html(d.BAUWEISE);                // NEW
            tooltip.select('.mw_avg').html(Math.round(d.AVG_MW));                // NEW
            tooltip.select('.mw_1g').html(Math.round(d.MESSW_1G));             // NEW
			tooltip.select('.mw_eg').html(Math.round(d.MESSW_EG));             // NEW
			tooltip.select('.mw_ke').html(Math.round(d.MESSW_KE));             // NEW
            tooltip.style('display', 'block');                          // NEW
          });                                                           // NEW
          
          raumluftPoints.on('mouseout', function() {                              // NEW
            tooltip.style('display', 'none');                           // NEW
          });  
    
	});
	
	d3.json('../data/processed_data/bfs/project_area_4326_topo.json', function(pa_data) {
		var project_area = topojson.feature(pa_data, pa_data.objects.project);
		
		var project_var = map.selectAll('path').data(project_area.features);
		
		project_var.enter()
			.append('path')
			.attr('d', path)
			.attr('stroke', '#999');
			
		/*svg.append("rect")
			.attr("class", "overlay")
			.attr("width", width)
			.attr("height", height)
			.call(zoom);*/
		
	
	});
	});	
	
  });
 
}