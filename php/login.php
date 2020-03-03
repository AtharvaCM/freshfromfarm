<?php
    session_start();

    $username=$_POST['username'];
    $password=$_POST['password'];

    //$dbconn = pg_connect("host=localhost dbname=slim_shady user=slim_shady password=shadyxv99") or die("Unable to connect DB");
    $dbconn = @pg_connect("host='satao.db.elephantsql.com' port='5432' dbname='dosyawaq' user='dosyawaq' password='XROAunqeu0hDD3dQl6cYmFukRFpKxiZ8'") or die("Unable to connect DB");

    $query1 = "select username from users where username='$username';";
    $query2 = "select password from users where username='$username';";
    $result1 = pg_query($dbconn, $query1) or die("unable to fetch query");
    $result2 = pg_query($dbconn, $query2) or die("unable to fetch query");

    $answer1=@pg_fetch_row($result1);
    $answer2=@pg_fetch_row($result2);
    if($username===$answer1[0] && $password===$answer2[0])
    {
        echo "username = ".$answer1[0]."<br>";
        echo "password = ".$answer2[0]."<br>";
        $_SESSION['username'] = $username;
        pg_close($dbconn);
        header('location:http://localhost/FreshFromFarm/order.html');
    }
    else
    { 
        pg_close($dbconn);
        header('location:http://localhost/FreshFromFarm/login_transparent.html');
    }
?>