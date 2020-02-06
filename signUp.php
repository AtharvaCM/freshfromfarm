<?php
    $username=$_POST['username'];
    $password=$_POST['password'];
    $passwordConf=$_POST['passwordConf'];

    //$dbconn = pg_connect("host=localhost dbname=slim_shady user=slim_shady password=shadyxv99") or die("Unable to connect DB");
    $dbconn = @pg_connect("host='satao.db.elephantsql.com' port='5432' dbname='dosyawaq' user='dosyawaq' password='XROAunqeu0hDD3dQl6cYmFukRFpKxiZ8'") or die("Unable to connect DB");

    $cdate=getdate();
    $date_val=array_values($cdate);
    $date=$date_val[3]."/".$date_val[5]."/".$date_val[6];

    if( (strcmp($password,$passwordConf))==0 )
    {
        $query = "select user_id from users;";
        $result = @pg_query($dbconn, $query) or die("unable to fetch query");
        while($arr = @pg_fetch_row($result))
        {
            echo "<br>".$arr[0];
            $uid = $arr[0];
        }
        $uid++;

        $query1 = "select username from users;";
        $i=0;
        $result1 = @pg_query($dbconn, $query1) or die("unable to fetch query1");
        while($row=pg_fetch_row($result1))
        {
            echo "<br>".$row[0];
            if($row[0]==$username)
            {
                echo "Username already present! meh!";
            }
        }
        //print_r($row);
        
        echo "<br>".$uid;
        echo " ".$username;
        echo " ".$password;
        echo " ".$date;
        $query2 = "insert into users values('$uid','$username','$password','$date','C');";
        if( $result2 = @pg_query($dbconn, $query2) )
        {
            header('Location: login_transparent.html');
        }
        else
        {
            die("Unable to execute query 2");
        }

        if(!$result2) // if the query returned something
        {
            echo "<br>SignUp Succesful<br>";
        }
        else
        {
            echo "SignUp unsuccesful";
        }
    }
    else
        echo "<br><h1>Passwords don't match wtf<h1><br>"
/* 
    /getdate() function return values/

    [seconds] - seconds
    [minutes] - minutes
    [hours] - hours
    [mday] - day of the month
    [wday] - day of the week (0=Sunday, 1=Monday,...)
    [mon] - month
    [year] - year
    [yday] - day of the year
    [weekday] - name of the weekday
    [month] - name of the month
    [0] - seconds since Unix Epoch

*/
?>
