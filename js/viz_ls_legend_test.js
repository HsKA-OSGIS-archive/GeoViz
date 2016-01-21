//############### Open Layers part ###############//

//
// Create map object:
//

var map = new ol.Map({
  controls: [new ol.control.Attribution],	//to display source of baselayer
  target: 'map',
  view: new ol.View({
	center: ol.proj.transform([12, 49.8], 'EPSG:4326', 'EPSG:3857'),
	zoom: 9,
    rotation: 0
  })
});

//############### accordion part ###############//

$(document).ready(function(){
  $("dt").click(function(){ // trigger 
    $(this).next("dd").slideToggle("fast"); // blendet beim Klick auf "dt" die nächste "dd" ein. 
    $(this).children("a").toggleClass("closed open"); // wechselt beim Klick auf "dt" die Klasse des enthaltenen a-Tags von "closed" zu "open". 
  });
});

//############### PHP part ###############//
$.ajax("./php/getData.php");

//############### Adding layers to map object ###############//
/*Order to add layers:
		1.) OSM / MQ baselayer(s)
		2.) Project area
		3.) Grids
		4.) Radon measurements (Points)*/
		
//OpenLayers tile layer (OSM):
//defined as variable
var layerOSM = new ol.layer.Tile({
    source: new ol.source.OSM(),
	visible: true,
	isBaseLayer: true
});
map.addLayer(layerOSM);	

//OpenLayers Tile WMS layer (Project Area):
var layer_project_area = new ol.layer.Tile({
	source: new ol.source.TileWMS({
		url: 'http://localhost:8080/geoserver/geoviz/wms',
		params: {'FORMAT': 'image/png', 
                'VERSION': '1.1.0',
                tiled: true,
				LAYERS: 'geoviz:project_area_4326',//,
				STYLES: 'geoviz:geoviz_polygon_project_area'
		}
	}),
	visible: true	// false
});
project_area_visible = "true";
map.addLayer(layer_project_area);

//OpenLayers Tile WMS layer (ODL - GRID):		
var layer_odl_grid = new ol.layer.Tile({
	source: new ol.source.TileWMS({
	url: 'http://localhost:8080/geoserver/geoviz/wms',
	params: {'FORMAT': 'image/png', 
            'VERSION': '1.1.0',
            tiled: true,
			LAYERS: 'geoviz:odl_4326_grid',
			STYLES: 'geoviz:geoviz_grid_odl'
		}
	}),
	visible: true
});
odl_grid_visible = "true";
map.addLayer(layer_odl_grid);
		
//OpenLayers Tile WMS layer (Bodenluft - GRID):		
var layer_bodenluft_grid = new ol.layer.Tile({
	source: new ol.source.TileWMS({
	url: 'http://localhost:8080/geoserver/geoviz/wms',
	params: {'FORMAT': 'image/png', 
            'VERSION': '1.1.0',
            tiled: true,
			LAYERS: 'geoviz:bodenluft_4326_grid',
			STYLES: 'geoviz:geoviz_grid_bodenluft'
		}
	}),
	visible: true
});
bodenluft_grid_visible = "true";
map.addLayer(layer_bodenluft_grid);

//OpenLayers Tile WMS layer (Raumluft - GRID):
var layer_raumluft_grid = new ol.layer.Tile({
	source: new ol.source.TileWMS({
	url: 'http://localhost:8080/geoserver/geoviz/wms',
	params: {'FORMAT': 'image/png', 
            'VERSION': '1.1.0',
            tiled: true,
			LAYERS: 'geoviz:raumluft_4326_grid_combined',
			STYLES: 'geoviz:geoviz_grid_raumluft'
		}
	}),
	visible: true
});
raumluft_grid_visible = "true";
map.addLayer(layer_raumluft_grid);

//OpenLayers Tile WMS layer (ODL):
var layer_odl_points = new ol.layer.Tile({
	source: new ol.source.TileWMS({
	url: 'http://localhost:8080/geoserver/geoviz/wms',
	params: {'FORMAT': 'image/png', 
            'VERSION': '1.1.1',
            tiled: true,
			LAYERS: 'geoviz:odl_4326',
			STYLES: 'geoviz:geoviz_point_odl_gradient',
		}
	}),
	visible: true
});
odl_points_visible = "true";
map.addLayer(layer_odl_points);

//OpenLayers Tile WMS layer (Bodenluft):
var layer_bodenluft_points = new ol.layer.Tile({
	source: new ol.source.TileWMS({
	url: 'http://localhost:8080/geoserver/geoviz/wms',
	params: {'FORMAT': 'image/png', 
            'VERSION': '1.1.1',
            tiled: true,
			LAYERS: 'geoviz:bodenluft_4326',
			STYLES: 'geoviz:geoviz_point_bodenluft_gradient'
		}
	}),
	visible: true
});
bodenluft_points_visible = "true";
map.addLayer(layer_bodenluft_points);

//OpenLayers Tile WMS layer (Raumluft):
var layer_raumluft_points = new ol.layer.Tile({
	source: new ol.source.TileWMS({
	url: 'http://localhost:8080/geoserver/geoviz/wms',
	params: {'FORMAT': 'image/png', 
            'VERSION': '1.1.0',
            tiled: true,
			LAYERS: 'geoviz:raumluft_4326',
			STYLES: 'geoviz:geoviz_point_raumluft_gradient'
		}
	}),
	visible: true
});
raumluft_points_visible = "true";
map.addLayer(layer_raumluft_points);

//############### Get legend images for Legend part: ###############//
document.getElementById("image_legend_rl").src = "http://localhost:8080/geoserver/geoviz/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=geoviz:raumluft_4326&STYLE=geoviz:geoviz_point_raumluft_gradient";

document.getElementById("image_legend_bl").src = "http://localhost:8080/geoserver/geoviz/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=geoviz:bodenluft_4326&STYLE=geoviz:geoviz_point_bodenluft_gradient";

document.getElementById("image_legend_odl").src = "http://localhost:8080/geoserver/geoviz/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=geoviz:odl_4326&STYLE=geoviz:geoviz_point_odl_gradient";

document.getElementById("image_legend_rl_grid").src = "http://localhost:8080/geoserver/geoviz/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=geoviz:raumluft_4326_grid_combined&STYLE=geoviz:geoviz_grid_raumluft";

document.getElementById("image_legend_bl_grid").src = "http://localhost:8080/geoserver/geoviz/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=geoviz:bodenluft_4326_grid&STYLE=geoviz:geoviz_grid_bodenluft";

document.getElementById("image_legend_odl_grid").src = "http://localhost:8080/geoserver/geoviz/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=geoviz:odl_4326_grid&STYLE=geoviz:geoviz_grid_odl";

document.getElementById("label_legend_pa").src = "http://localhost:8080/geoserver/geoviz/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=geoviz:project_area_4326&STYLE=geoviz:geoviz_polygon_project_area";

//############### Preparation for Layer Selection ###############//
var array_layer = [
					["label_ls_rl",raumluft_points_visible,layer_raumluft_points,["legend_rl","label_legend_rl","image_legend_rl"]],
					["label_ls_bl",bodenluft_points_visible,layer_bodenluft_points,["legend_bl","label_legend_bl","image_legend_bl"]],
					["label_ls_odl",odl_points_visible,layer_odl_points,["legend_odl","label_legend_odl","image_legend_odl"]],
					["label_ls_rl_grid",raumluft_grid_visible,layer_raumluft_grid,["legend_rl_grid","label_legend_rl_grid","image_legend_rl_grid"]],
					["label_ls_bl_grid",bodenluft_grid_visible,layer_bodenluft_grid,["legend_bl_grid","label_legend_bl_grid","image_legend_bl_grid"]],
					["label_ls_odl_grid",odl_grid_visible,layer_odl_grid,["legend_odl_grid","label_legend_odl_grid","image_legend_odl_grid"]],
					["label_ls_pa",project_area_visible,layer_project_area,["legend_pa","label_legend_pa","image_legend_pa"]]
				  ]
//############### Layer Selection part ###############//
//############### a) bind function to button: ###############//
$('#label_ls_rl').on('click', function() {layerSelection('label_ls_rl')});
$('#label_ls_bl').on('click', function() {layerSelection('label_ls_bl')}); 
$('#label_ls_odl').on('click', function() {layerSelection('label_ls_odl')}); 
$('#label_ls_rl_grid').on('click', function() {layerSelection('label_ls_rl_grid')}); 
$('#label_ls_bl_grid').on('click', function() {layerSelection('label_ls_bl_grid')}); 
$('#label_ls_odl_grid').on('click', function() {layerSelection('label_ls_odl_grid')}); 
$('#label_ls_pa').on('click', function() {layerSelection('label_ls_pa')}); 


//############### b) function to switch layers ###############//
function layerSelection(id_clicked_label) {
	console.log("layerSelection");
	for (i = 0; i<array_layer.length; i++) {
		subarray_layer = array_layer[i];
		if (id_clicked_label == subarray_layer[0]) {
			console.log(subarray_layer[0]);
			if (subarray_layer[1] == "true") {	//*_visible control variable
				subarray_layer[1] = "false";	//set to false
				clicked_layer = subarray_layer[2];
				clicked_layer.setVisible(false);
				subarray_layer[2].setVisible(false);
				subarray_legend = subarray_layer[3];
				for (j = 0; j<subarray_legend.length; j++) {
					$(document.getElementById(subarray_legend[j])).hide();
				}
			} else {
				subarray_layer[1] = "true";	//set to false
				clicked_layer = subarray_layer[2];
				clicked_layer.setVisible(true);
				subarray_legend = subarray_layer[3];
				for (j = 0; j<subarray_legend.length; j++) {
					$(document.getElementById(subarray_legend[j])).show();
				}
			}
		}
	}  
}