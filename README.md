# GeoViz

Visualizing Radon Measurements

done by the virtual Company GeoViz Ltd. at the University of Applied Sciences Karlsruhe

# About:

The objective of this project is to visualize radon measurements in parts of Germany in a web application. Different measurements of radon over the study area can be spatially analysed, compared and visualized. This gives an overview of radon measurements in basements and inside houses and can also be studied further with different factors influencing the radon gas, for example "rock type" (=petrograph).  
In addition to the "classic" web application where the user can choose between different layers, it is also possible to display further statistical information about the visualized datasets. These charts are created using d3 and are displayed in a modal window.

When we created the functions for the creation of the charts, we tried to get them as generalized as possible.
This means that you can take these functions and use them to create your own d3 visualizations.
Therefore you do not even need to understand how d3 works.
At the beginning of each script there is a list with descriptions and explanations of all necessary arguments that are needed to run these functions.

# Authors:

-	Sebastian Lemstra (alienus@gmx.de)
-	Georg Stubenrauch
-	Md Kamrul Ahsan
-	Rajesh Mahalingam

# Software Used:

-	PostgreSQL 9.5
-	GeoServer 2.8.1
-	Geoserver 2.8.1 Printing-Plugin
-	Apache Tomcat 9.0
-	QGIS 2.12.1-Lyon
-	Quercus 4.0.39
-	GitHub Desktop v3.0.11

# Data and data sources

All datasets used in this project are stored inside the folder "data\processed_data" and were derived from the following sources:

-	GADM database of Global Administrative Areas - Counties in Germany - http://www.gadm.org/
-	Radon measurements by Federal Office for Radiation Protection, additional important information about the origin is stored in a license file inside "data\processed_data\bfs"  - http://www.bfs.de/EN/home/home_node.html
-	OSM Basemap - OpenStreetMap Tile Server - ODbl
-	We also used datasets from the Bundesanstalt für Geowissenschaften und Rohstoffe for statistical analysis. Please refer to their website (only available in German) for the datasets - http://www.bgr.bund.de

# Structure of project folders:

|Folder name | Description |
|:------------|:-------------|
|css |contains all necessary css-files|
|fonts|contains all necessary fonts|
|geoserver|workspace-folder for Geoserver|
|html|contains all necessary html-files
|img|contains all necessary image-files, e.g. for the GUI|
|js|contains all necessary javascript-files, e.g. charts as well as OpenLayers implementation|
|lib|contains all additional javascript libraries used|
|php|contains the csv-files with the latest datasets for the charts as well as the php-file that creates them|
|printing_plugin|data for the installation of the printing plugin|
|WEB-INF|contains Quercus files to use PHP|

# Installation Procedure:

-	PostgreSQL 9.5 with pgAdmin III

Download and install PostgreSQL 9.5 for windows.
The package includes pgAdmin III and PostGIS 2.0 shapefile and DBF loader exporter.
Install the required extensions.

In pgAdmin III irst create a database with the following settings.

|Name|Setting|
|:---|:------|
|Name|geoviz|
|Port|5432|
|User|postgres|
|Password|user|

After you created the database add the extension PostGIS.
The next step is to add the needed tables. There are two ways of doing that:

Restoring the data automatically:

However, if you are using an other User/Password combination it might lead to problems when trying to use our backup file.
You can restore our database by right-clicking it and choosing "Restore".
In the folder "data\processed_data" there are two backup-files (both contain the same data, just different formats) that you can now choose from.
After successfully restoring the database you should have 7 tables:

-	bodenluft_4326
-	deu_adm2_counties_statistics
-	odl_4326
-	pointcloud_formats
-	project_area_4326
-	raumluft_4326
-	spatial_ref_sys

Adding the tables manually:

If there are errors during the restore process, you might have to add the tables / shapefiles manually.
Therefore start the PostGIS Shapefile Import/Export Manager and import the following shapefiles stored in the "\processed_data"-folder:

|Name of shapefile|Folder|
|:------|:------|
|bodenluft_4326_attributes_total.shp|bfs|
|odl_4326_attributes_total.shp|bfs|
|project_area_4326.shp|bfs|
|raumluft_4326_statistics_attributes_total.shp|bfs|
|DEU_adm2_pa_clip_total_statistics_fixed.shp|adm|

Change the SRID to 4326 and then you can start importing the shapefiles.
Now the shapefiles are imported to the database and are displayed as tables.


-	Geoserver 2.8.1

Install Geoserver and if possible use 8080 as the port, otherwise you would need to change it in the "\js\viz.js" file where all the OpenLayers and Geoserver settings
are done.
To be able to display our datasets there are again two possibilities.

Adding the data (workspace, stores, layers and styles) automatically:

Again, if you are using different PostGIS settings, you probably need to skip this part and do it by hand.
In the folder "\geoserver" of this repository there is the folder of this projects' workspace.
Copy it to "data_dir\workspace" of your Geoserver.
After that you only have to make three changes by hand to the "coveragestore.xml" file of the three stores for the corresponding grids.
They are stored inside the folders of the different stores "data\geoviz\".
Inside these files you have to fix the <url>-tag which stores the filepath of the tiff-files.

When you now start Geoserver you should be able to see the following additions:

|Count|Type|Name|Source|
|:----|:---|:---|:-----|
|1|Workspace|geoviz||
|4|Stores|geoviz,geoviz_grid_bodenluft,geoviz_grid_odl,geoviz_grid_raumluft|PostGIS,GeoTIFF,GeoTIFF,GeoTIFF|
|8|Layers|bodenluft_4326,deu_adm2_counties_statistics,odl_4326,project_area_4326,raumluft_4326,bodenluft_4326_grid,odl_4326_grid,raumluft_4326_grid_combined||
|10|Styles|geoviz_grid_bodenluft,geoviz_grid_odl,geoviz_grid_raumluft,geoviz_point_bodenluft / _gradient,geoviz_point_odl / _gradient,geoviz_point_raumluft / _gradient,geoviz_polygon_project_area||

If there are problems displaying the layers, you might have to manually add the styles to the layers (Layers -> click on layer -> publishing -> add styles).

Adding the data manually:

At first a workspace is created called "geoviz".
After that you need to create the four stores inside the workspace "geoviz" (1 PostGIS, 4 GeoTIFF, see above!).
The layers from the database are now available in Geoserver.
Additionally, you can add the styles for the layers that are stored inside the folder "geoserver\geoviz\styles".
Now everything should be set to publish the different layers.
During publishing process the coordinate reference system is defined to EPSG:4326 as well as the corresponding styles are chosen.

Additionally, we are using the Geoserver printing plugin to be able to create PDF-files of our web map.
Therefore, you have to extract the zip-file in the "printing_plugin" folder into the "webapps\geoserver\WEB-INF\lib" of your Geoserver folder.
When you run Geoserver for the first time, e.g. by starting your local server, the plugin should be automatically detected and installed.
If this is successful, you will find the file "config.yaml" in the folder "data_dir\printing" of Geoserver.
This means that you now can you the plugin. If this is not the case, please use the available online documentation.


-	Apache Tomcat 9.0

Moreover, we used Apache Tomcat as a the webserver for this project since this is the recommended application server (http://docs.geoserver.org/stable/en/user/installation/war.html).


-	Quercus 4.0.39

To be able to use php with Apache Tomcat we decided to use a Java implementation of PHP5 called Quercus.
The latest version can be downloaded here: http://quercus.caucho.com/ and is released under the Open Source GPL license.
For this project we used version Quercus 4.0.39.war

Installation guide:

a) Open War-file with e.g. WinRar and extract "quercus.jar" as well as "javamail-141.jar" to the \lib\ folder of Apache Tomcat.

b) Add the following lines to the web.xml file in the \conf\ folder of Apache Tomcat:

<!--Quercus settings:-->

  <servlet>
    <servlet-name>Quercus Servlet</servlet-name>
    <servlet-class>com.caucho.quercus.servlet.QuercusServlet</servlet-class>

    <!--
      Specifies the encoding Quercus should use to read in PHP scripts.
    -->
    <!--
    <init-param>
      <param-name>script-encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
    -->

    <!--
      Tells Quercus to use the following JDBC database and to ignore the
      arguments of mysql_connect().
    -->
    <!--
    <init-param>
      <param-name>database</param-name>
      <param-value>jdbc/test</param-value>
    </init-param>
    -->

    <!--
    <init-param>
      <param-name>ini-file</param-name>
      <param-value>WEB-INF/php.ini</param-value>
    </init-param>
    -->
    
    <!--
      Location of the license to enable php to java compilation.
    -->
    <init-param>
      <param-name>license-directory</param-name>
      <param-value>WEB-INF/licenses</param-value>
    </init-param>
  </servlet>

  <servlet-mapping>
    <servlet-name>Quercus Servlet</servlet-name>
    <url-pattern>*.php</url-pattern>
  </servlet-mapping>

  <welcome-file-list>
    <welcome-file>index.php</welcome-file>
  </welcome-file-list>
<!-- End of Quercus settings-->

 
c) Uncomment these two extensions in the file "php.ini" in the folder of your php-installation, e.g. in the folder EnterpriseDB-ApachePHP that comes with PostgreSQL:
extension=php_pdo_pgsql.dll
extension=php_pgsql.dll

With the help of Quercus and by using PHP everytime the index.html file is loaded, the csv-files with the latest data are created.
This way the different charts are always up-to-date.

Hint: 	You could also use the OSGeo-Live 9.0 that can be downloaded here:http://live.osgeo.org/de/
		In this case you would only need to install Quercus.
		

# External libraries (stored in folder "lib"):

-	jQueryUI
-	BootStrap
-	OpenLayers 3.0
-	d3.js

# Known Issues:
-	print functionality not always working, legends missing, not all scales set up
-	statistical visualizations of petrographic attributes are accessible via the property button of the room air grid
-	sorting functionality only working for petrographic visualizations (room air grid), not working in other modal windows, probably problem with the checkbox ids
-	search function not implemented (-> nominatim)
-	language switcher not implemented
-	d3 bug in choropleth maps (panning)
-	realization of modal windows not sophisticated, could be done with one function (rough description in js\charts_invoker.js)
-	"problem" of extrapolation in grids is know, accepted for the sole purpose of functionality demonstration
-	"problem" in dashboard of multiple bars and disapearing pie slices: only because attribute of x-value not unique, problem only because of our chosen attributes for the presentation, function itself is working fine with unique keys!

# License:
Please refer to the license file