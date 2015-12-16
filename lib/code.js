(function() {
	var width = 960,
		height = 600;
		
	var svg = d3.select("#graph")
		.append("svg")
		.attr("width",width)
		.attr("height",height);
	var projection = d3.geo.mercator()	
		.scale(1280)
		.translate([width/2,height/2]),
		path= d3.geo.path()
			.projection(projection);
			
	var counties_map = d3.map({	
		/* ID: "NAME"*/
	});
	
	queue()
		.defer(d3.json, '/data/processed_data/adm/DEU_adm2_pa_clip_total_statistics_topo.json')
		.await(function(err, data_counties) {
			var counties = svg.append("g")
				.attr("class","counties")
				.selectAll("g")
				.data(topojson.feature(data_counties, data_counties.objects.counties).features)
				.enter()
				.append("g");
			
			counties.append("path")
				.attr("d", path);
				
			counties.append("path")
				.datum(topojson.mesh(data_counties, data_counties.objects.counties, function (a,b) { return a != b; }))
				.attr("class", "borders")
				.attr("d", path);
				
			/*counties.append("text")
				.text(function(d) { return counties_map.get(d.ID_2) || d.ID_2; })
				.attr({
					x: function (d) { return path.centroid(d)[0] || 0; },
					y: function (d) { return path.centroid(d)[1] || 0; }
				});*/
				
		
			
		});
})();