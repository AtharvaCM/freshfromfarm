<?php
    session_start();
    if(!($username = $_SESSION['username']))
    {
        return;
    }
    $product_id = $_GET['item_id'];
    $title = $_GET['title'];

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

    $query2 = "select product_id from product where product_name='$title';";
    $result2 = pg_query($dbconn, $query2) or die("unable to fetch query");
    $answer2= @pg_fetch_row($result2);

    $query3 = "delete from cart where user_id = '$answer1[0]' and product_id='$answer2[0]';";
    $result3 = pg_query($dbconn, $query3) or die("unable to fetch query");
    $answer3 = @pg_fetch_row($result3);
    echo "Item deleted!";   
?>