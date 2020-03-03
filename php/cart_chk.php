<?php
    session_start();
    if(!($username = $_SESSION['username']))
    {
        return;
    }
    $product_id = $_GET['item_id'];
    $qty = $_GET['qty'];

    //$dbconn = pg_connect("host=localhost dbname=slim_shady user=slim_shady password=shadyxv99") or die("Unable to connect DB");
    $dbconn = @pg_connect("host='satao.db.elephantsql.com' port='5432' dbname='dosyawaq' user='dosyawaq' password='XROAunqeu0hDD3dQl6cYmFukRFpKxiZ8'") or die("Unable to connect DB");

    $query1 = "select user_id from users where username='$username'";
    $result1 = pg_query($dbconn, $query1) or die("unable to fetch query");
    $answer1= @pg_fetch_row($result1);

    $query3 = "select count(user_id) from cart where user_id = '$answer1[0]';";
    $result3 = pg_query($dbconn, $query3) or die("unable to fetch query");
    $answer3 = @pg_fetch_row($result3);
    echo $answer3[0];

    pg_close($dbconn);
?>