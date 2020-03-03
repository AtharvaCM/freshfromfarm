<?php 
    // Data from client
    $username = $_GET['username'];
    $password = $_GET['password'];
    $passwordConf = $_GET['passwordConf'];
    $email = $_GET['email'];
    // Data is succesfully imported

    //$dbconn = pg_connect("host=localhost dbname=slim_shady user=slim_shady password=shadyxv99") or die("Unable to connect DB");
    $dbconn = @pg_connect("host='satao.db.elephantsql.com' port='5432' dbname='dosyawaq' user='dosyawaq' password='XROAunqeu0hDD3dQl6cYmFukRFpKxiZ8'") or die("Unable to connect DB");

    // setting the date variable to get the current date
    $cdate=getdate();
    $date_val=array_values($cdate);
    $date=$date_val[5]."/".$date_val[3]."/".$date_val[6];

    if( (strcmp($password,$passwordConf))==0 )
    {
        // to set id to the new user
        $query = "select user_id from users;";
        $result = @pg_query($dbconn, $query) or die("unable to fetch userId");
        while($arr = @pg_fetch_row($result))
        {
            //echo "<br>".$arr[0];
            $uid = $arr[0];
        }
        $uid++;
        
        // checking if the username is already present!
        $query1 = "select username from users;";
        $i=0;
        $result1 = @pg_query($dbconn, $query1) or die("unable to fetch username");
        while($row=pg_fetch_row($result1))
        {
            //echo "<br>".$row[0];
            if($row[0] == $username)
            {
                echo "Username already present! meh!";
                pg_close($dbconn);
                return;
            }
        }

        // inserting the new user info into DB
        $query2 = "insert into users values('$uid','$username','$password','$date','C','$email');";
        if( $result2 = @pg_query($dbconn, $query2) )
        {
            echo "success";
            pg_close($dbconn);
        }
        else
        {
            pg_close($dbconn);
            die("failed to insert");
        }
    }
    else
    {
        pg_close($dbconn);
        echo "passwords dont match";
    }
?>