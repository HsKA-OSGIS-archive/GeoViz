<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">

<html>

  <head></head>

  <body>

   <table border="1">

    <tr>

     <td>Field name</td>

     <td>Field type</td>

     <td>Field length</td>

     <td>Field NOT NULL?</td>

    </tr>

   

<?php

// attempt a connection

$dbh = pg_connect("host=localhost port=5432 dbname=geoviz user=postgres password=user");

if (!$dbh) {

    die("Error in connection: " . pg_last_error());

}

// get table metadata

$meta = pg_meta_data($dbh, "bodenluft_4326");

foreach ($meta as $key => $value) {

    echo "<tr>";

    echo "<td>$key</td>";

    echo "<td>" . $value['type'] . "</td>";   

    echo "<td>" . $value['len'] . "</td>";   

    echo "<td>" . (($value['not null'] == 1) ? 'true' : 'false') .  "</td>";   

    echo "</tr>";

}

// close connection

pg_close($dbh);

?>

   </table>

  </body>

</html>

There's also a pg_parameter_status() function, which you can use to retrieve the current values of server variables, such as 'max_connections' or 'work_mem'. Here's an example of how  you can use pg_parameter_status():

<?php

// attempt a connection

$dbh = pg_connect("host=localhost port=5432 dbname=geoviz user=postgres password=user");

if (!$dbh) {

    die("Error in connection: " . pg_last_error());

}

// get value of 'server_version' variable

echo "Server version: " . pg_parameter_status($dbh, 'server_version');

?>