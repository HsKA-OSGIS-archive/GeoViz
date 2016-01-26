console.log("chart_ivoker wird geladen");

//#######################################################################################################################################//
//                                                            Modal content                                                              //
//#######################################################################################################################################//

var arrayChartsData = [['button_grouped','grouped'],['button_stacked','stacked'],['button_dual','dual_scale'],['button_sortable','sortable_bar'],['button_choro2', 'choropleth2'],['button_grouped2','grouped2'],['button_stacked2','stacked2'],['button_dual2','dual_scale2'],['button_sortable2','sortable_bar2'],['button_choro3', 'choropleth3'],['button_grouped3','grouped3'],['button_dual3','dual_scale3'],['button_sortable3','sortable_bar3']];


function modal_1(){
	//Array to realize changing of visualizations with buttons consisting of button-id as well as div-id:
//	var arrayChartsData = [['button_grouped','grouped'],['button_stacked','stacked'],['button_dual','dual_scale'],['button_sortable','sortable_bar']];
	
	//Problem with these charts: number of measurements per Petrograph not the same, some at least 25,
	//but other not...however still showing that e.g. Granit with the highest values!
		
	//Grouped:
	var 	grouped_div = "#grouped",
	//	grouped_filename = "../php/Geo_petrograph_statistics_total_php.csv",
		grouped_filename = "./php/Geo_petrograph_statistics_total_php.csv",
		grouped_attributes = ["PETROGRAPH","RL_AVG","BL_AVG","ODL_AVG"],	//first: attribute for x-Axis, the following attributes: attribute for y-Axis (bars)
		grouped_attributes_tooltip = [["RL_AVG","average value in room air", "Bq m-3"], ["BL_AVG","average value in bottom air", "kBq m-3"], ["ODL_AVG","average value of ODL", "nSv h-1"]],
		grouped_range = ["#98abc5","#6b486b", "#ff8c00"] //; //colors for bars
		grouped_y_axis_annotation = "Average msrmnts. [Bq m-3, kBq m-3, nSv h-1]";
		
		//Stacked:
	var 	stacked_div = "#stacked",
	//	stacked_filename = "../php/Geo_petrograph_statistics_total_php.csv",
		stacked_filename = "./php/Geo_petrograph_statistics_total_php.csv",
		stacked_attributes = ["PETROGRAPH","RL_AVG","BL_AVG","ODL_AVG"],	//first: attribute for x-Axis, the following attributes: attribute for y-Axis (bars)
		stacked_attributes_tooltip = [["RL_AVG","average value in room air", "Bq m-3"], ["BL_AVG","average value in bottom air", "kBq m-3"], ["ODL_AVG","average value of ODL", "nSv h-1"]],
		stacked_range = ["#98abc5","#6b486b", "#ff8c00"] //; //colors for bars
		stacked_y_axis_annotation = "Average msrmnts. [Bq m-3, kBq m-3, nSv h-1]";
		
		//Dual_Scale:
	var 	dual_div = "#dual_scale",
	//	dual_filename = "../php/Geo_petrograph_statistics_total_php.csv",
		dual_filename = "./php/Geo_petrograph_statistics_total_php.csv",
		dual_attributes = ["PETROGRAPH", "RL_AVG", "ODL_AVG"] //;	//first: attribute for x-Axis, second: attribute for y-Axis (left bars), second: attribute for y-Axis (right bars,
		dual_attributes_tooltip = [["average value in room air", "Bq m-3"], ["average value of ODL", "nSv h-1"]],
		dual_domain = [350,150];
		dual_y_axis_annotation = ["Average Radon msrmnt. in room air [Bq m-3]", "Average ODL msrmnt. [nSv m-1]"];
		
	//Sortable:
	var sortable_div = "#sortable_bar",
	//	sortable_filename = "../php/Geo_petrograph_statistics_total_php.csv",
		sortable_filename = "./php/Geo_petrograph_statistics_total_php.csv",
		sortable_attributes = ["PETROGRAPH", "RL_AVG"],
		sortable_attributes_tooltip = ["average value in room air", "Bq m-3"],
		sortable_y_axis_annotation = "Average Radon msrmnt. in room air [Bq m-3]";
 //    function loadScriptAfter() {
    drawDashboard("#dashboard", "./php/Geo_petrograph_statistics_total_php.csv", ["PETROGRAPH","RL_AVG_KE","RL_AVG_EG","RL_AVG_1G"],["#98abc5","#6b486b", "#ff8c00"]);   
	drawGroupedVerticalBar(grouped_div,grouped_filename,grouped_attributes,grouped_attributes_tooltip,grouped_range,grouped_y_axis_annotation);
	drawStackedVerticalBar(stacked_div,stacked_filename,stacked_attributes,stacked_attributes_tooltip,stacked_range,stacked_y_axis_annotation);
	drawDualScaleBarChart(dual_div,dual_filename,dual_attributes,dual_attributes_tooltip,dual_domain,dual_y_axis_annotation);
	drawSortableBarChart(sortable_div,sortable_filename,sortable_attributes,sortable_attributes_tooltip,sortable_y_axis_annotation);
	
	/*$('#choropleth').hide();
	$('#grouped').hide();
	$('#stacked').hide();
	$('#dual_scale').hide();
	$('#sortable_bar').hide();*/
	//button settings when loading the page:
	document.getElementById('button_grouped').disabled = true; 
	document.getElementById('button_stacked').disabled = false; 
	document.getElementById('button_dual').disabled = false; 
	document.getElementById('button_sortable').disabled = false;
	document.getElementById('button_dashboard').disabled = false;  
	document.getElementById('label_checkbox').style.visibility="hidden";
	//document.getElementById('lable_checkbox').style.display="none"; 
	//$(document.getElementById('label_checkbox')).hidden();
	document.getElementById('checkbox').checked = false;
		
	/*document.getElementById('grouped').style.display = true; 
	document.getElementById('stacked').style.display = false; 
	document.getElementById('dual_scale').style.display = false; 
	document.getElementById('sortable_bar').style.display = false; 
*/
	$(document.getElementById('grouped')).show();
	$(document.getElementById('stacked')).hide();
	$(document.getElementById('dual_scale')).hide();
	$(document.getElementById('sortable_bar')).hide();
	$(document.getElementById('dashboard')).hide();
}

function modal_2(){

		//Array to realize changing of visualizations with buttons consisting of button-id as well as div-id:
	//	var arrayChartsData = [['button_choro2', 'choropleth2'],['button_grouped2','grouped2'],['button_stacked2','stacked2'],['button_dual2','dual_scale2'],['button_sortable2','sortable_bar2']];
		
		//Choropleth: would be nice if two additional choropleth maps (min and max) could be created and chosen using buttonset...but only if you like @Sebastian :D
		var choro_div = "#choropleth2",
			choro_filenames = ["./data/processed_data/adm/DEU_adm2_pa_clip_total_statistics2_topo.json","./php/DEU_counties_statistics_php.csv",'./php/Raumluft_4326_statistics_php.csv'],
			choro_attributes_topojson = ["counties","id"],
			choro_attribute_choropleth = ["ID_2","AVG_MW_RL"],
			choro_attributes_tooltip = ["HAUSART","BAUWEISE","AVG_MW","MESSW_1G","MESSW_EG","MESSW_KE"],
			choro_domain = [65, 129, 194, 259, 323],
			choro_range = ["#1a9641", "#89cb61", "#dbef9d", "#fede9a", "#f59053", "#d7191c"] //gradient now better?
		
		//Grouped:
		var grouped_div = "#grouped2",
			grouped_filename = "./php/Raumluft_4326_statistics_petrograph_php.csv",
			grouped_attributes = ["PETROGRAPH","RL_AVG","RL_MIN","RL_MAX"],	//first: attribute for x-Axis, the following attributes: attribute for y-Axis (bars)
			grouped_attributes_tooltip = [["RL_AVG","average value in room air", "Bq m-3"], ["RL_MIN","minimum value in room air", "Bq m-3"], ["RL_MAX","maximum value in room air", "Bq m-3"]],
			grouped_range = ["#98abc5","#6b486b", "#ff8c00"] //; //colors for bars
			grouped_y_axis_annotation = "Radon msrmnt. in room air [Bq m-3]";
		
		//Stacked:
		var stacked_div = "#stacked2",
			stacked_filename = "./php/Raumluft_4326_statistics_petrograph_php.csv",
			stacked_attributes = ["PETROGRAPH","RL_AVG_KE","RL_AVG_EG","RL_AVG_1G"],	//first: attribute for x-Axis, the following attributes: attribute for y-Axis (bars)
			stacked_attributes_tooltip = [["RL_AVG_KE","average value in basement", "Bq m-3"], ["RL_AVG_EG","average value on ground floor", "Bq m-3"], ["RL_AVG_1G","average value on first floor", "Bq m-3"]],
			stacked_range = ["#98abc5","#6b486b", "#ff8c00"] //; //colors for bars
			stacked_y_axis_annotation = "Average Radon msrmnt. in room air [Bq m-3]";
		
		//Dual_Scale:
		var dual_div = "#dual_scale2",
			dual_filename = "./php/DEU_counties_statistics_php.csv",
			dual_attributes = ["NAME_2", "AVG_MW_RL", "AVG_MW_ODL"] //;	//first: attribute for x-Axis, second: attribute for y-Axis (left bars), second: attribute for y-Axis (right bars,
			dual_attributes_tooltip = [["average value in room air", "Bq m-3"], ["average value of ODL", "nSv h-1"]],
			dual_domain = [400,325];
			dual_y_axis_annotation = ["Average Radon msrmnt. in room air [Bq m-3]", "Average ODL msrmnt. [nSv m-1]"];
		
		//Sortable:
		var sortable_div = "#sortable_bar2",
			sortable_filename = "./php/DEU_counties_statistics_php.csv",
			sortable_attributes = ["NAME_2", "AVG_MW_RL"],
			sortable_attributes_tooltip = ["average value in room air", "Bq m-3"],
			sortable_y_axis_annotation = "Average Radon msrmnt. in room air [Bq m-3]";

        /*var script = document.getElementById("diagram");
        script.src = "GeoViz_local/js/stacked_vertical_bar.js";
        document.body.appendChild(script);*/
		
		drawChoroplethMap(choro_div,choro_filenames,choro_attributes_topojson,choro_attribute_choropleth,choro_attributes_tooltip,choro_domain,choro_range);
		drawGroupedVerticalBar(grouped_div,grouped_filename,grouped_attributes,grouped_attributes_tooltip,grouped_range,grouped_y_axis_annotation);
		drawStackedVerticalBar(stacked_div,stacked_filename,stacked_attributes,stacked_attributes_tooltip,stacked_range,stacked_y_axis_annotation);
		drawDualScaleBarChart(dual_div,dual_filename,dual_attributes,dual_attributes_tooltip,dual_domain,dual_y_axis_annotation);
		drawSortableBarChart(sortable_div,sortable_filename,sortable_attributes,sortable_attributes_tooltip,sortable_y_axis_annotation);
		
		/*$('#choropleth').hide();
		$('#grouped').hide();
		$('#stacked').hide();
		$('#dual_scale').hide();
		$('#sortable_bar').hide();*/
		//button settings when loading the page:
		document.getElementById('button_choro2').disabled = true; 
		document.getElementById('button_grouped2').disabled = false; 
		document.getElementById('button_stacked2').disabled = false; 
		document.getElementById('button_dual2').disabled = false; 
		document.getElementById('button_sortable2').disabled = false; 
		document.getElementById('label_checkbox2').style.visibility="hidden"; 
		//$(document.getElementById('label_checkbox')).hidden();
		document.getElementById('checkbox2').checked = false;
		
		//div display settings when loading the page:
	/*	document.getElementById('choropleth2').style.visibility="visible"; 
		document.getElementById('choropleth2').style.display = true; 	
		document.getElementById('grouped2').style.display = false; 
		document.getElementById('stacked2').style.display = false; 
		document.getElementById('dual_scale2').style.display = false; 
		document.getElementById('sortable_bar2').style.display = false;*/
		$(document.getElementById('choropleth2')).show();
		$(document.getElementById('grouped2')).hide();
		$(document.getElementById('stacked2')).hide();
		$(document.getElementById('dual_scale2')).hide();
		$(document.getElementById('sortable_bar2')).hide();
	//	setTimeout(function() { updateData("button_choro2"); }, 50);
	//	updateData(button_choro2);
      
}

function modal_3(){
	//Array to realize changing of visualizations with buttons consisting of button-id as well as div-id:
		//var arrayChartsData = [['button_choro', 'choropleth'],['button_grouped','grouped'],['button_dual','dual_scale'],['button_sortable','sortable_bar']];
		
		//Choropleth:
		var 	choro_div = "#choropleth3",
				choro_filenames = ["./data/processed_data/adm/DEU_adm2_pa_clip_total_statistics2_topo.json","./php/DEU_counties_statistics_php.csv",'./php/ODL_4326_statistics_php.csv'],
				choro_attributes_topojson = ["counties","id"],
				choro_attribute_choropleth = ["ID_2","AVG_MW_ODL"],
				choro_attributes_tooltip = ["STANDORT","MESSW_ODL","PETROGRAPH"],
				choro_domain = [18,35,53,71,88],
				choro_range = ["#1a9641", "#89cb61", "#dbef9d", "#fede9a", "#f59053", "#d7191c"] //gradient now better?
		
		//Grouped:
		var 	grouped_div = "#grouped3",
				grouped_filename = "./php/ODL_4326_statistics_petrograph_php.csv",
				grouped_attributes = ["PETROGRAPH","ODL_AVG","ODL_MIN","ODL_MAX"],	//first: attribute for x-Axis, the following attributes: attribute for y-Axis (bars)
				grouped_attributes_tooltip = [["ODL_AVG","average value of ODL", "nSv h-1"], ["ODL_MIN","minimum value of ODL", "nSv h-1"], ["ODL_MAX","maximum value of ODL", "nSv h-1"]],
				grouped_range = ["#98abc5","#6b486b", "#ff8c00"] //; //colors for bars
				grouped_y_axis_annotation = "ODL msrmnt. [nSv h-1]";
		
		//Dual_Scale:
		var 	dual_div = "#dual_scale3",
				dual_filename = "./php/DEU_counties_statistics_php.csv",
				dual_attributes = ["NAME_2", "AVG_MW_ODL", "AVG_MW_RL"] //;	//first: attribute for x-Axis, second: attribute for y-Axis (left bars), second: attribute for y-Axis (right bars,
				dual_attributes_tooltip = [["average value of ODL", "nSv h-1"], ["average value in room air", "Bq m-3"]],
				dual_domain = [125,400];
				dual_y_axis_annotation = ["Average ODL msrmnt. [nSv h-1]", "Average Radon msrmnt. in room air [Bq m-3]"];
		
		//Sortable:
		var sortable_div = "#sortable_bar3",
			sortable_filename = "./php/DEU_counties_statistics_php.csv",
			sortable_attributes = ["NAME_2", "AVG_MW_ODL"],
			sortable_attributes_tooltip = ["average value of ODL", "nSv h-1"],
			sortable_y_axis_annotation = "Average ODL msrmnt. [nSv h-1]";

        /*var script = document.getElementById("diagram");
        script.src = "GeoViz_local/js/stacked_vertical_bar.js";
        document.body.appendChild(script);*/
		
		drawChoroplethMap(choro_div,choro_filenames,choro_attributes_topojson,choro_attribute_choropleth,choro_attributes_tooltip,choro_domain,choro_range);
		drawGroupedVerticalBar(grouped_div,grouped_filename,grouped_attributes,grouped_attributes_tooltip,grouped_range,grouped_y_axis_annotation);
		drawDualScaleBarChart(dual_div,dual_filename,dual_attributes,dual_attributes_tooltip,dual_domain,dual_y_axis_annotation);
		drawSortableBarChart(sortable_div,sortable_filename,sortable_attributes,sortable_attributes_tooltip,sortable_y_axis_annotation);
		
		/*$('#choropleth').hide();
		$('#grouped').hide();
		$('#stacked').hide();
		$('#dual_scale').hide();
		$('#sortable_bar').hide();*/
		//button settings when loading the page:
		document.getElementById('button_choro3').disabled = true; 
		document.getElementById('button_grouped3').disabled = false;
		document.getElementById('button_dual3').disabled = false; 
		document.getElementById('button_sortable3').disabled = false; 
		document.getElementById('label_checkbox3').style.visibility="hidden"; 
		//$(document.getElementById('label_checkbox')).hidden();
		document.getElementById('checkbox3').checked = false;
		
		//div display settings when loading the page:
		document.getElementById('choropleth').style.display = true; 	
		document.getElementById('grouped').style.display = false; 
		document.getElementById('stacked').style.display = false; 
		document.getElementById('dual_scale').style.display = false; 
		document.getElementById('sortable_bar').style.display = false; 
/*		$(document.getElementById('choropleth3')).show();
		$(document.getElementById('grouped3')).hide();
		$(document.getElementById('dual_scale3')).hide();
		$(document.getElementById('sortable_bar3')).hide();*/
}

function updateData(clicked_buttonid) {
		
	//Disable clicked button and change drawType as well as enable other buttons:
	for (i = 0; i<arrayChartsData.length; i++) {
		singleChartArray = arrayChartsData[i];
		console.log(singleChartArray[0]);
		console.log(singleChartArray[1]);
		if (clicked_buttonid == singleChartArray[0]) {
			//Disable clicked button:
			document.getElementById(clicked_buttonid).disabled = true; 	
			$(document.getElementById(singleChartArray[1])).show();
			if (clicked_buttonid == "button_sortable") {
				document.getElementById(singleChartArray[1]).style.display = true;
			//	document.getElementById('lable_checkbox').style.display="inline"; 
				document.getElementById('label_checkbox').style.visibility="visible";

			}
			if (clicked_buttonid == "button_sortable2") {
				document.getElementById(singleChartArray[1]).style.display = true;
			//	document.getElementById('lable_checkbox').style.display="inline"; 
				document.getElementById('label_checkbox2').style.visibility="visible";

			}
			if (clicked_buttonid == "button_sortable3") {
				document.getElementById(singleChartArray[1]).style.display = true;
			//	document.getElementById('lable_checkbox').style.display="inline"; 
				document.getElementById('label_checkbox3').style.visibility="visible";

			}
		} else {
			//Enable other buttons:
			document.getElementById(singleChartArray[0]).disabled = false;
			//Disable display of div:
		//	document.getElementById(singleChartArray[1]).style.display = false;
			$(document.getElementById(singleChartArray[1])).hide();
			if (clicked_buttonid != "button_sortable") {
				document.getElementById('label_checkbox').style.visibility="hidden";
			//	document.getElementById('lable_checkbox').style.display="none";  
			}
			if (clicked_buttonid != "button_sortable2") {
				document.getElementById('label_checkbox2').style.visibility="hidden";
			//	document.getElementById('lable_checkbox').style.display="none";  
			}
			if (clicked_buttonid != "button_sortable3") {
				document.getElementById('label_checkbox3').style.visibility="hidden";
			//	document.getElementById('lable_checkbox').style.display="none";  
			}
		}			
	}	
};	