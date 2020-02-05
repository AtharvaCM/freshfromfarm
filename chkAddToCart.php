<?php
    session_start();
    if(!($username = $_SESSION['username']))
    {
        return;
    }
    $dbconn = pg_connect("host=localhost dbname=slim_shady user=slim_shady password=shadyxv99") or die("Unable to connect DB");
    //$myPDO = new PDO('pgsql:host=localhost; dbname=slim_shady', 'slim_shady', 'shadyxv99');

    $query1 = "select user_id from users where username='$username'";
    $result1 = pg_query($dbconn, $query1) or die("unable to fetch query");
    $answer1= @pg_fetch_row($result1);

    $query3 = "select count(user_id) from cart where user_id = '$answer1[0]';";
    $result3 = pg_query($dbconn, $query3) or die("unable to fetch query");
    $answer3 = @pg_fetch_row($result3);

    $query2 = "select product_name,product_price,qty from users,product,cart where users.user_id=cart.user_id and product.product_id=cart.product_id and username='$username';";
    $result2 = pg_query($dbconn, $query2) or die("unable to fetch query");
    $cnt=0;
    while($answer2 = @pg_fetch_row($result2))
    {
        echo " $answer2[0]";
        echo " $answer2[1]";
        echo " $answer2[2]";
        echo ",";
    }
    echo " $answer3[0]";

  /*  $query2 = "";
    $result2 = pg_query($dbconn, $query2) or die("Item already in cart!");
    $answer2 = @pg_fetch_row($result2);
    echo "Item added in cart!";*/
?>