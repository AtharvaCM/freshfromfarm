<?php
    session_start();
    //$_SESSION['username']=$_POST['username'];
    //$_SESSION['password']=$_POST['password'];
    $username=$_POST['username'];
    $password=$_POST['password'];

    $dbconn = pg_connect("host=localhost dbname=slim_shady user=slim_shady password=shadyxv99") or die("Unable to connect DB");
    //$myPDO = new PDO('pgsql:host=localhost; dbname=slim_shady', 'slim_shady', 'shadyxv99');
    if(!$dbconn)
    {
        echo "error in data object<br>";
        echo $dbconn;
    }

    $query1 = "select username from users where username='$username';";
    $query2 = "select password from users where username='$username';";
    $result1 = pg_query($dbconn, $query1) or die("unable to fetch query");
    $result2 = pg_query($dbconn, $query2) or die("unable to fetch query");
    //$result = $myPDO->query("SELECT * FROM users");
    if(!$result1 && !$result2)
    {
        echo "<br>error occured<br>";
        echo $result;
    }

    $answer1=@pg_fetch_row($result1);
    $answer2=@pg_fetch_row($result2);
    if($username===$answer1[0] && $password===$answer2[0])
    {
        echo "username = ".$answer1[0]."<br>";
        echo "password = ".$answer2[0]."<br>";
        $_SESSION['username'] = $username;
        header('location:http://localhost/FreshFromFarm/order.html');
    }
    else
    { 
        header('location:http://localhost/FreshFromFarm/login_transparent.html');
    }
    //header('location:http://localhost/FreshFromFarm/order.html');
?>