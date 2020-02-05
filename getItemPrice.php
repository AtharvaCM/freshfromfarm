<?php
    // Data from client
    $id = $_GET['itemId'];

    $dbconn = pg_connect("host=localhost dbname=slim_shady user=slim_shady password=shadyxv99") or die("Unable to connect DB");
    //$myPDO = new PDO('pgsql:host=localhost; dbname=slim_shady', 'slim_shady', 'shadyxv99');

    $query1 = "select product_price from product where product_id='$id';";
    $result1 = @pg_query($dbconn, $query1) or die("error");
    $answer1= @pg_fetch_row($result1);
    echo $answer1[0];
?>