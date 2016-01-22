# GeoViz

Visualizing Radon Measurements

done by the virtual Company GeoViz Ltd. at the University of Applied Sciences Karlsruhe

# About:

The objective of this project is to visualize radon measurements in parts of Germany in a web application. Different measurements of radon over the study area can be spatially analysed, compared and visualized. This gives an overview of radon measurements in basements and inside houses and can also be studied further with different factors influencing the radon gas, for example "rock type" (=petrograph).  
In addition to the "classic" web application where the user can choose between different layers, it is also possible to display further statistical information about the visualized datasets. These charts are created using d3 and are displayed in different modal windows.

# Authors:

-	Sebastian Lemstra
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

All datasets used in this project were derived from the following sources:

-	GADM database of Global Administrative Areas - Counties in Germany - http://www.gadm.org/
-	Radon measurements by Federal Office for Radiation Protection - http://www.bfs.de/EN/home/home_node.html
-	OSM Basemap - OpenStreetMap Tile Server - ODbl

# Strucutre of project folders:

- css:		contains all necessary css-files
- fonts:	contains all necessary fonts
- html:		contains all necessary html-files
- img:		contains all necessary image-files, e.g. for the GUI
- js:		contains all necessary javascript-files,
			e.g. charts as well as OpenLayers implementation
- lib:		contains all additional javascript libraries used
- php:		contains the csv-files with the latest datasets for the charts
			as well as the php-file that creates them
- WEB-INF:	contains Quercus files to use PHP

# Installation Procedure:

1.PostgreSQL 9.5

Download and install PostgreSQL 9.5 for windows.
The package includes pgAdmin III and PostGIS 2.0 shapefile and DBF loader exporter.
Install the required extensions.

2. In pgAdmin III create a database

- Name:		geoviz
- Port:		5432
- User:		postgres
- Password:	user

3. In PostGIS shapefile import/export manager 

Connect to the database by PostGIS Connection and fill the name, password, port and database name.
Now the database is connected.
Add the files from the folder, the shapefile is shown in the import list.
You can give the SRID as 4326. Then import the shapefiles.
Now the shapefiles are imported to database geoviz.
Moreover in the folder "data\processed_data" there are two backup-files (both contain the same data, just different formats) that can also be used to "restore" the shapefiles.
Hence a manual import is hopefully not necessary.

4. Geoserver 2.8.1

Install Geoserver for windows and start geoserver.
Run it as http://localhost:8080/geoserver/ in a web browser.
User name as admin and password as geoserver for login into the geoserver.
After the shapefiles are imported to the database, they should be published in Geoserver.
Now a workspace is created 'geoviz' and in 'stores' the workspace is connected to the database (PostGIS database) by giving the database information.
The layers from the database are now available in geoserver.
The layers are published with publish button with respective feature types. During publishing the coordinate reference system is defined to EPSG:4326. 
The styling is also given for the different features. The corresponding sld-files are stored in the "sld" folder of this project!

Additionally, we are using the Geoserver printing plugin to be able to create PDF-files of our web map.
Therefore, you have to extract the zip-file in the "printing_plugin" folder into the "webapps\geoserver\WEB-INF\lib" of your Geoserver folder.
When you run Geoserver for the first time, e.g. by starting your local server, the plugin should be automatically detected and installed.
If this is successful, you will find the file "config.yaml" in the folder "data_dir\printing" of Geoserver.
This means that you now can you the plugin. If this is not the case, please use the available online documentation.

5. Apache Tomcat 9.0

Install the Apache Tomcat for windows and start it.
All the files are stored in the Apache Tomcat and executed from the localhost.

6. Quercus 4.0.39

To be able to use php with Apache Tomcat we decided to use a Java implementation of PHP5 called Quercus.
The latest version can be downloaded here: http://quercus.caucho.com/ and is released under the Open Source GPL license.
For this project we used version Quercus 4.0.39.war

Installation guide:

a) Open War-file with e.g. WinRar and extract "quercus.jar" as well as "javamail-141.jar" to the \lib\ folder of Apache Tomcat.

b) Add the following lines to the web.xml file in the \conf\ folder of Apache Tomcat:

<!--Quercus stuff:-->
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
  
c) Uncommend these two extensions in the file "php.ini" in the folder of your php-installation, e.g. in the folder EnterpriseDB-ApachePHP that comes with PostgreSQL:
extension=php_pdo_pgsql.dll
extension=php_pgsql.dll

With the help of Quercus and by using PHP everytime the index.html file is loaded, the csv-files with the latest data are created.
This way the different charts are always up-to-date.

Hint: 	You could also use the OSGeo-Live 9.0 that can be downloaded here: http://live.osgeo.org/de/
		In this case you would only need to install Quercus.

# External libraries:

JqueryUI
BootStrap
OpenLayers 3.0
D3.JS

# License:
Please refer the License file