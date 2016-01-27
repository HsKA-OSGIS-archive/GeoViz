//############### Open Layers part ###############//
//
// Create map object:
//
var view = new ol.View({
	center: [1366999.813852092, 6405117.222184629],	//ol.proj.transform([12, 49.8], 'EPSG:4326', 'EPSG:3857'),
	zoom: 9,
	minZoom: 9,
	maxZoom: 15,
    rotation: 0
  });
  
var map = new ol.Map({
  controls: [new ol.control.Attribution],	//to display source of baselayer
  target: 'map',
  view: view
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

document.getElementById("image_legend_pa").src = "http://localhost:8080/geoserver/geoviz/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=geoviz:project_area_4326&STYLE=geoviz:geoviz_polygon_project_area";

//############### Preparation for Layer Selection ###############//
var array_layer = [
					["label_ls_rl",raumluft_points_visible,layer_raumluft_points,["legend_rl","label_legend_rl","image_legend_rl"]],
					["label_ls_bl",bodenluft_points_visible,layer_bodenluft_points,["legend_bl","label_legend_bl","image_legend_bl"]],
					["label_ls_odl",odl_points_visible,layer_odl_points,["legend_odl","label_legend_odl","image_legend_odl"]],
					["label_ls_rl_grid",raumluft_grid_visible,layer_raumluft_grid,["legend_rl_grid","label_legend_rl_grid","image_legend_rl_grid"]],
					["label_ls_bl_grid",bodenluft_grid_visible,layer_bodenluft_grid,["legend_bl_grid","label_legend_bl_grid","image_legend_bl_grid"]],
					["label_ls_odl_grid",odl_grid_visible,layer_odl_grid,["legend_odl_grid","label_legend_odl_grid","image_legend_odl_grid"]],
					["label_ls_pa",project_area_visible,layer_project_area,["legend_pa","label_legend_pa","image_legend_pa"]]
				  ];
				  
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
		subarray_layer = array_layer[i];				// get subarray -> array for single layer
		if (id_clicked_label == subarray_layer[0]) {
			console.log(subarray_layer[0]);
			if (subarray_layer[1] == "true") {			//*_visible control variable
				subarray_layer[1] = "false";			//set control variable to false
				document.getElementById(subarray_layer[0]).style.color = "#CCC";		//change color to grey when layer not visible
				//clicked_layer = subarray_layer[2];
				//clicked_layer.setVisible(false);		
				subarray_layer[2].setVisible(false);	//set visibility of OL layer object to false
				subarray_legend = subarray_layer[3];
				for (j = 0; j<subarray_legend.length; j++) {
					$(document.getElementById(subarray_legend[j])).hide();
				}
			} else {
				subarray_layer[1] = "true";	//set to false
				document.getElementById(subarray_layer[0]).style.color = "#000";		//change color back to black when layer visible
				//clicked_layer = subarray_layer[2];
				//clicked_layer.setVisible(true);
				subarray_layer[2].setVisible(true);		//set visibility of OL layer object to true
				subarray_legend = subarray_layer[3];
				for (j = 0; j<subarray_legend.length; j++) {
					$(document.getElementById(subarray_legend[j])).show();
				}
			}
		}
	}  
}

//############### Zoom functionality: ###############//
document.getElementById("zoom_out_closed").onclick = function() {
	var view = map.getView();
	var zoom = view.getZoom();
	view.setZoom(zoom-1);
};

document.getElementById("zoom_in_closed").onclick = function() {
	var view = map.getView();
	var zoom = view.getZoom();
	view.setZoom(zoom+1);
};

document.getElementById("zoom_in_open").onclick = function() {
	var view = map.getView();
	var zoom = view.getZoom();
	view.setZoom(zoom+1);
};

document.getElementById("zoom_out_open").onclick = function() {
	var view = map.getView();
	var zoom = view.getZoom();
	view.setZoom(zoom-1);
};

//############### Print functionality: ###############//
//with a little help of our friends @GCK: https://github.com/HsKA-OSGIS/GCK

$('#print_image').on('click', function() {print(view)});


function print(view) {

	//Configuration of OSM base layer:
	printConfiguration.layers[0].baseURL='http://a.tile.openstreetmap.org';
	printConfiguration.layers[0].type='OSM';
	printConfiguration.layers[0].extension='png';

	var zoom = view.getZoom();
	
	if (zoom==9){printConfiguration.pages[0].scale=1250000;}		//tested
	else if (zoom==10){printConfiguration.pages[0].scale=850000;}	//tested
	else if (zoom==11){printConfiguration.pages[0].scale=450000;}	//tested
	else if (zoom==12){printConfiguration.pages[0].scale=250000;}	//tested
	else if (zoom==13){printConfiguration.pages[0].scale=100000;}	//NOT tested!
	else if (zoom==14){printConfiguration.pages[0].scale=80000;}	//NOT tested!
	else if (zoom==15){printConfiguration.pages[0].scale=50000;}	//NOT tested!

	/*Array of printable GeoServer layers as well as the corresponding styles:,
	elements have to be in same order!:*/
	var printableLayers = [layer_odl_grid,layer_bodenluft_grid,layer_raumluft_grid,layer_odl_points,layer_bodenluft_points,layer_raumluft_points,layer_project_area];
	var array_styles = ["geoviz:geoviz_grid_odl","geoviz:geoviz_grid_bodenluft","geoviz:geoviz_grid_raumluft","geoviz:geoviz_point_odl_gradient","geoviz:geoviz_point_bodenluft_gradient","geoviz:geoviz_point_raumluft_gradient","geoviz:geoviz_polygon_project_area"]
	
	//empty arrays to store visible layers and their styles in:
	var array_printLayer=[];
	var array_layerStyles=[];
	
	//Iteration through GeoServer Layers:
	for (j = 0; j <= printableLayers.length-1; j++){
		var selectedlayer = printableLayers[j];
		var booleanLayerVisible = selectedlayer.getVisible();

		if(booleanLayerVisible==true){
			//Get parameters of selected layer:
			var layerParameters = printableLayers[j].getSource().getParams().LAYERS;
			//Add parameters to array with all visible layers -> are printed!
			array_printLayer.push(layerParameters);
			//Add style name of selected layer:
			array_layerStyles.push(array_styles[j]);
		}
		
		//Configure overlay layers:
		//a) add parameter array of layers:
		printConfiguration.layers[1].layers=array_printLayer;
		//b) add style array of layers:
		printConfiguration.layers[1].styles = array_layerStyles;
		printConfiguration.pages[0].center = view.getCenter();
	}

	printUrl= 'http://localhost:8080/geoserver/pdf/print.pdf?spec='+JSON.stringify(printConfiguration);
	
	$('#print_image').attr("href", printUrl);
};

//initialize the print function: (settings need to be available in config.yaml!):
var printConfiguration = {
 
    "layout":"A4 portrait",
    "srs":"EPSG:3857",
    "units":"m",
    "dpi":200,
    "outputFilename": "RadonByGeoViz.pdf",
    "layers":[
     {baseURL: 'http://a.tile.osm.org', 
            singleTile: false, 
	    opacity: 1,
            type: 'OSM', 
            maxExtent: [-20037508.3392,-20037508.3392,20037508.3392,20037508.3392], 
            tileSize: [256, 256], 
            extension: 'png',
            resolutions: [156543.0339, 78271.51695, 39135.758475, 19567.8792375, 9783.93961875, 4891.969809375, 2445.9849046875, 1222.99245234375, 611.496226171875, 305.7481130859375, 152.87405654296876, 76.43702827148438, 38.21851413574219, 19.109257067871095, 9.554628533935547, 4.777314266967774, 2.388657133483887, 1.1943285667419434, 0.5971642833709717, 0.2985821416854859, 0.1492910708427430, 0.07464553542137148] 
        },	

	{"baseURL":"http://localhost:8080/geoserver/geoviz/wms",
        "opacity":1,
        "singleTile":true,
        "customParams":{},
        "type":"WMS",
        layers:[],
        "format":"image/png",
        "styles":[],
        "overview":true},        
		    ],
    "pages":[
        {
		"titlePage": false,
        "center":[],
        "mapTitle":"Radon measurements",
        "comment":"by GeoViz",
        "rotation":0,
        "icon":""}],
	"legends": [
        {
            "classes": [
                {
                    "icons": [
                        ""
                    ],
                    "name": "",
                    "iconBeforeName": true
                }
            ]
        }
    ]
};

//Run function once to initiale href:
print(view);

//Tooltip for image in accordion:
$('.tooltip_image_master').hover(function(){
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip_image"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
}, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip_image').remove();
}).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip_image')
        .css({ top: mousey, left: mousex })
});

