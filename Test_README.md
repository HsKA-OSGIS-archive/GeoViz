# GeoViz

Visualizing Radon Measurements

done by the virtual Company GeoViz Ltd. at the University of Applied Sciences Karlsruhe

Version: GeoViz 1.0

About:

The objective of this project is to visualize the radon measurements in parts of Germany in a web application. The different measurements of radon over the study area can be spatially analysed, compared and visualized. This gives an overview of the radon measurements in the basements and inside the houses and can also be studied further with the different factors influencing the radon gas, for example rock type.  
// Barcharts, bubble charts, the parameters


Authors:

Georg Stubenrauch
Rajesh Mahalingam
Md Kamrul Ahsan
Sebastian Lemstra

Software Used:

PostgreSQL 9.5
GeoServer 2.8.1
Apache Tomcat 9.0
QGIS 2.12.1-Lyon
OpenLayers 3.0
GitHub Desktop v3.0.11


Installation Procedure:

1.PostgreSQL 9.5
Download and install PostgreSQL 9.5 for windows. The package includes pgAdmin III and PostGIS 2.0 shapefile and DBF loader exporter.
Install the required extensions.

2. In pgAdmin III create a database
Name: geoviz
Port: 5432
User: postgres
Password: user

3. In PostGIS shapefile import/export manager 
Connect to the database by PostGIS Connection and fill the name, password, port and database name.
Now the database is connected.
Add the files from the folder, the shapefile is shown in the import list. You can give the SRID as 4326. Then import the shapefiles. Now the shapefiles are imported to database geoviz.

Geoserver 2.8.1

Install Geoserver for windows and start geoserver.
Run it as http://localhost:8080/geoserver/ in a web browser.
User name as admin and password as geoserver for login into the geoserver.
After the shapefiles are imported to the database, they should be published in Geoserver.
Now a workspace is created 'geoviz' and in 'stores' the workspace is connected to the database (PostGIS database) by giving the database information.
The layers from the database are now available in geoserver.
The layers are published with publish button with respective feature types. During publishing the coordinate reference system is defined to EPSG:4326. 
The styling is also given for the different features.

Apache Tomcat 9.0

Install the Apache Tomcat for windows and start it.
All the files are stored in the Apache Tomcat and executed from the localhost.





External Libraries:

JqueryUI
BootStrap
Openlayers
D3.JS


License:
Please refer the License file