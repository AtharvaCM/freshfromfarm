<?php
    session_start();
    if(!($username = $_SESSION['username']))
    {
        return;
    }
    $product_id = $_GET['item_id'];
    $qty = $_GET['qty'];

    $dbconn = pg_connect("host=localhost dbname=slim_shady user=slim_shady password=shadyxv99") or die("Unable to connect DB");
    //$myPDO = new PDO('pgsql:host=localhost; dbname=slim_shady', 'slim_shady', 'shadyxv99');
    if(!$dbconn)
    {
        echo "error in data object<br>";
        echo $dbconn;
    }

    $query1 = "select user_id from users where username='$username'";
    $result1 = pg_query($dbconn, $query1) or die("unable to fetch query");
    $answer1= @pg_fetch_row($result1);

    $query3 = "select count(user_id) from cart where user_id = '$answer1[0]';";
    $result3 = pg_query($dbconn, $query3) or die("unable to fetch query");
    $answer3 = @pg_fetch_row($result3);
    echo $answer3[0];
?>