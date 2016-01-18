<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">

<html>

  <head></head>

  <body>

<?php

ini_set('display_errors', 1); // show errors
error_reporting(-1); // of all levels
date_default_timezone_set('UTC'); // PHP will complain about on this error level

// attempt a connection

$dbh = pg_connect("host=localhost port=5432 dbname=geoviz user=postgres password=user");

if (!$dbh) {

    die("Error in connection: " . pg_last_error());

} else {
	echo "Connection successful" . "<p />";
}

// execute query

//$sql = "SELECT * FROM public.bodenluft_4326";
//$sql = "SELECT gid, standort, einheit, messw_bl, lon, lat, petrograph FROM public.bodenluft_4326";
$sql = "SELECT ST_X(geom) AS X, ST_Y(geom) AS Y, gid, standort, einheit, messw_bl, lon, lat, petrograph FROM public.bodenluft_4326";

$result = pg_query($dbh, $sql);

if (!$result) {

    die("Error in SQL query: " . pg_last_error());

}

// iterate over result set

// print each row

/*while ($row = pg_fetch_array($result)) {

    echo "GID: " . $row[0] . "<br />";
	echo "Standort: " . $row[1] . "<br />";
	echo "Einheit: " . $row[2] . "<br />";
	echo "Messw_BL: " . $row[3] . "<br />";
	echo "LON: " . $row[4] . "<br />";
	echo "LAT: " . $row[5] . "<br />";
    echo "Petrograph name: " . $row[6] . "<p />";
}*/

//TEST:
/*$output = fopen('http://localhost:8080//GeoViz/data/processed_data/php_test/test.csv', 'w+'); //

fputcsv($output, array('gid','standort','einheit','messw_bl','lon','lat','petrograph')); //'tripid','startingLoc','endingLoc'
fputcsv($output, array());

//$rows = mysql_query('SELECT tripid, startingLoc, endingLoc FROM autoTracker_trips');
while ($row = pg_fetch_assoc($result)) fputcsv($output,$row);

fputcsv($output,["TEST"]);

fclose($output);*/

//$filename = 'http://localhost:8080//GeoViz/data/processed_data/php_test/test.csv';
//$filename = 'http://localhost:8080/GeoViz/data/processed_data/php_test/test.csv';
$filename = 'Bodenluft_4326_statistics_php.csv';
$fp = fopen($filename, "w+");

//$res = mysql_query("SELECT * FROM auctionusers");

// fetch a row and write the column names out to the file
$row = pg_fetch_assoc($result);
$line = "";
$comma = "";
foreach($row as $name => $value) {
    //$line .= $comma . '"' . str_replace('"', '""', $name) . '"';
	$line .= strtoupper($comma . str_replace('"', '""', $name));
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
        //$line .= $comma . '"' . str_replace('"', '""', $value) . '"';
		$line .= $comma . str_replace($replace,'', $value);
        $comma = ",";
    }
	echo $line . "<br />";
	
    $line .= "\n";
	
    fputs($fp, $line);

}

fclose($fp);

//mysql_close();


// execute query

//$sql = "SELECT gid, standort, einheit, messw_bl, lon, lat, petrograph FROM public.bodenluft_4326"; //INTO OUTFILE '/GeoViz/data/processed_data/php_test/test.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'
//$sql = "SELECT * FROM public.bodenluft_4326";
//$sql = "Copy (Select * From public.bodenluft_4326) To 'http://localhost/GeoViz/data/processed_data/php_test/test.csv' With CSV";

//$result = pg_query($dbh, $sql);

//while($myrow = pg_fetch_assoc($result)) {
//    fputcsv($output,$row);
//} 



// free memory

pg_free_result($result);

// close connection

pg_close($dbh);

?>

  </body>

</html>