<?php

ini_set('display_errors', 1); // show errors
error_reporting(-1); // of all levels
date_default_timezone_set('UTC'); // PHP will complain about on this error level

// function to connect to a database:
function connectToDb($conn_string) {

	//$dbh = pg_connect("host=localhost port=5432 dbname=geoviz user=postgres password=user");
	$dbh = pg_connect($conn_string);

	if (!$dbh) {

		die("Error in connection: " . pg_last_error());

	} else {
		//echo "Connection successful" . "<p />";
		$output = "<script>console.log( 'Connection to db geoviz successfull!' );</script>";
		echo $output;
		return $dbh;
	}
}

function disconnectFromDb($dbh) {
	// close connection
	pg_close($dbh);
}

function getData($dbh, $sql, $filename) {
	//$sql = "SELECT ST_X(geom) AS X, ST_Y(geom) AS Y, gid, standort, einheit, messw_bl, lon, lat, petrograph FROM public.bodenluft_4326";
	$result = pg_query($dbh, $sql);

	if (!$result) {

		die("Error in SQL query: " . pg_last_error());

	}

	//$filename = 'Bodenluft_4326_statistics_php.csv';
	$fp = fopen($filename, "w+");

	// fetch a row and write the column names (!) out to the file -> first line of CSV
	$row = pg_fetch_assoc($result);
	$line = "";
	$comma = "";
	foreach($row as $name => $value) {
		$line .= strtoupper($comma . str_replace('"', '""', $name));	//letters to uppercase and ',' and ' ' are "deleted"
		$comma = ",";
	}
	$line .= "\n";
	fputs($fp, $line);

	// remove the result pointer back to the start
	pg_result_seek($result, 0);

	// and loop through the actual data
	while($row = pg_fetch_assoc($result)) {

		$line = "";
		$comma = "";
		$replace = array(","," ");
	
		foreach($row as $value) {
			$line .= $comma . str_replace($replace,'', $value);
			$comma = ",";
		}
	
		$line .= "\n";
	
		fputs($fp, $line);

	}

	fclose($fp);

	// free memory

	pg_free_result($result);

	$output = "<script>console.log( 'Writing file finished' );</script>";
	echo $output;
	
}

$conn_string = "host=localhost port=5432 dbname=geoviz user=postgres password=user";
$dbh = connectToDb($conn_string);

//1. Bodenluft:
$sql = "SELECT ST_X(geom) AS X, ST_Y(geom) AS Y, gid, standort, einheit, messw_bl, lon, lat, petrograph FROM public.bodenluft_4326";
$filename = 'Bodenluft_4326_statistics_php.csv';
getData($dbh, $sql, $filename);

//2. Raumluft:
$sql = "SELECT ST_X(geom) AS X, ST_Y(geom) AS Y, gid, hausart, bauweise, avg_mw, min_mw, max_mw, messw_1g, messw_eg, messw_ke, lon, lat, petrograph FROM public.raumluft_4326";
$filename = 'Raumluft_4326_statistics_php.csv';
getData($dbh, $sql, $filename);

//3. ODL:
$sql = "SELECT ST_X(geom) AS X, ST_Y(geom) AS Y, gid, standort, einheit_od, messw_odl, lon, lat, petrograph FROM public.odl_4326";
$filename = 'ODL_4326_statistics_php.csv';
getData($dbh, $sql, $filename);

//4. Counties statistics:
$sql = "SELECT gid, id_2, name_2, avg_mw_bl, avg_mw_odl, avg_mw_rl, count_bl, count_odl, count_rl FROM public.deu_adm2_counties_statistics";
$filename = 'DEU_counties_statistics_php.csv';
getData($dbh, $sql, $filename);

//5. Raumluft Petrograph:
$sql = "SELECT geo, petrograph, AVG(avg_mw) AS rl_avg, MIN(min_mw) AS rl_min, MAX(max_mw) AS rl_max, AVG(messw_ke) AS rl_avg_ke, AVG(messw_eg) AS rl_avg_eg, AVG(messw_1g) AS rl_avg_1g, COUNT(*) FROM public.raumluft_4326 GROUP BY geo, petrograph  HAVING COUNT(*) >= 25 ORDER BY GEO";
$filename = 'Raumluft_4326_statistics_petrograph_php.csv';
getData($dbh, $sql, $filename);

//6. Bodenluft Petrograph:
$sql = "SELECT geo, petrograph, AVG(messw_bl) AS bl_avg, MIN(messw_bl) AS bl_min, MAX(messw_bl) AS bl_max, COUNT(*) FROM public.bodenluft_4326 GROUP BY geo, petrograph  HAVING COUNT(*) >= 25 ORDER BY GEO";
$filename = 'Bodenluft_4326_statistics_petrograph_php.csv';
getData($dbh, $sql, $filename);

//7. ODL Petrograph:
$sql = "SELECT geo, petrograph, AVG(messw_odl) AS odl_avg, MIN(messw_odl) AS odl_min, MAX(messw_odl) AS odl_max, COUNT(*) FROM public.odl_4326 GROUP BY geo, petrograph  HAVING COUNT(*) >= 25 ORDER BY GEO";
$filename = 'ODL_4326_statistics_petrograph_php.csv';
getData($dbh, $sql, $filename);

//8. Petrograph total:
$sql = "SELECT public.raumluft_4326.geo, public.raumluft_4326.petrograph, AVG(public.raumluft_4326.avg_mw) AS rl_avg, MIN(public.raumluft_4326.min_mw) AS rl_min, MAX(public.raumluft_4326.max_mw) AS rl_max, AVG(public.raumluft_4326.messw_ke) AS rl_avg_ke, AVG(public.raumluft_4326.messw_eg) AS rl_avg_eg, AVG(public.raumluft_4326.messw_1g) AS rl_avg_1g, COUNT(*), AVG(public.bodenluft_4326.messw_bl) AS bl_avg, MIN(public.bodenluft_4326.messw_bl) AS bl_min, MAX(public.bodenluft_4326.messw_bl) AS bl_max, AVG(public.odl_4326.messw_odl) AS odl_avg, MIN(public.odl_4326.messw_odl) AS odl_min, MAX(public.odl_4326.messw_odl) FROM public.raumluft_4326 LEFT JOIN (public.bodenluft_4326 LEFT JOIN public.odl_4326 ON public.bodenluft_4326.geo = public.odl_4326.geo) ON public.raumluft_4326.geo = public.bodenluft_4326.geo WHERE public.raumluft_4326.geo = 508 OR public.raumluft_4326.geo =602 OR public.raumluft_4326.geo =608 OR public.raumluft_4326.geo =659 OR public.raumluft_4326.geo =660 OR public.raumluft_4326.geo =715 OR public.raumluft_4326.geo =721 OR public.raumluft_4326.geo =760 OR public.raumluft_4326.geo =761 OR public.raumluft_4326.geo =833 OR public.raumluft_4326.geo =834 OR public.raumluft_4326.geo =858  GROUP BY public.raumluft_4326.geo, public.raumluft_4326.petrograph  HAVING COUNT(*) >= 25 ORDER BY GEO";
$filename = 'Geo_petrograph_statistics_total_php.csv';
getData($dbh, $sql, $filename);

disconnectFromDb($dbh);


?>