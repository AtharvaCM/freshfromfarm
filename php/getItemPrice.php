<?php
    // Data from client
    $id = $_GET['itemId'];

    //$dbconn = pg_connect("host=localhost dbname=slim_shady user=slim_shady password=shadyxv99") or die("Unable to connect DB");
    $dbconn = @pg_connect("host='satao.db.elephantsql.com' port='5432' dbname='dosyawaq' user='dosyawaq' password='XROAunqeu0hDD3dQl6cYmFukRFpKxiZ8'") or die("Unable to connect DB");

    $query1 = "select product_price from product where product_id='$id';";
    $result1 = @pg_query($dbconn, $query1) or die("error");
    $answer1= @pg_fetch_row($result1);
    echo $answer1[0];

    pg_close($dbconn);
?>