<?php
    $usr_name = $_POST['username'];
    $psw = $_POST['psw'];
    $psw_repeat = $_POST['psw-repeat'];

    $dbconn = pg_connect("host=localhost dbname=slim_shady user=slim_shady password=shadyxv99") or die("Unable to connect DB");

    //$myPDO = new PDO('pgsql:host=localhost; dbname=slim_shady', 'slim_shady', 'shadyxv99');

    if(!$dbconn)
    {
        echo "error in data object<br>";
        echo $dbconn;
    }

    $query = "select * from users;";

    $result = pg_query($dbconn, $query) or die("unable to fetch query");
//    $result = $myPDO->query("SELECT * FROM users");

    if(!$result)
    {
        echo "<br>error occured<br>";
        echo $result;
    }

    $row = pg_fetch_row($result);
    echo "<br>$row[0] r1";
    echo " $row[1] r2";
    echo " $row[2] r3";
    echo " $row[3] r4";
    echo " $row[4] r5";

?>