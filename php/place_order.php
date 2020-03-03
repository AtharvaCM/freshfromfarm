<?php
    session_start();
    if(!($username = $_SESSION['username']))
    {
        return;
    }

    $mob = $_GET['mob'];
    $fname = $_GET['fname'];
    $lname = $_GET['lname'];
    $addr = $_GET['addr'];
    $ccno = $_GET['ccno'];
    $ccexp = $_GET['ccexp'];
    $cccvv = $_GET['cccvv'];
    $ctotal = $_GET['total'];

    $dbconn = @pg_connect("host='satao.db.elephantsql.com' port='5432' dbname='dosyawaq' user='dosyawaq' password='XROAunqeu0hDD3dQl6cYmFukRFpKxiZ8'") or die("Unable to connect DB");
    
    $query1 = "select user_id from users where username='$username'";
    $result1 = pg_query($dbconn, $query1) or die("unable to fetch query1");
    $answer1= @pg_fetch_row($result1);
//    echo $answer1[0]." ".$mob." ".$fname." ".$lname." ".$addr." ".$ctotal." ".$ccno." ".$cccvv." ".$ccexp;
 
    $query = "select mobile_no from customer where user_id = '$answer1[0]'";
    $result = pg_query($dbconn, $query) or die("error fetching mobile number");
    $answer = @pg_fetch_row($result);

    // First time buying something
    if($answer[0] == "") {
        $query2 = "insert into customer values ('$answer1[0]','$mob','$fname','$lname','$addr');";
        $result2 = pg_query($dbconn, $query2) or die("unable to fetch query2");
        $answer2 = @pg_fetch_row($result2);

        $query3 = "insert into payment values ('$mob','$ccno','$cccvv','$ccexp','100000.0');";
        $result3 = pg_query($dbconn, $query3) or die("unable to fetch query3");
        $answer3 = @pg_fetch_row($result3);

        $result = pg_query($dbconn, $query); // now mob-no will be returned
        $answer = @pg_fetch_row($result);
    }

    // Now deduct the amount and make the transaction
    $query4 = "update payment set balance = balance - '$ctotal' where mobile_no = '$answer[0]';";
    $result4 = pg_query($dbconn, $query4) or die("unable to execute query4");
    $answer4 = @pg_fetch_row($result4);

    $query5 = "select balance from payment where mobile_no = '$mob';";
    $result5 = pg_query($dbconn, $query5) or die("unable to execute query5");
    $answer5 = @pg_fetch_row($result5);

    $query6 = "select email from users where user_id = '$answer1[0]';";
    $result6 = pg_query($dbconn, $query6) or die("unable to execute query6");
    $answer6 = @pg_fetch_row($result6);

    $query7 = "delete from cart where user_id = '$answer1[0]';";
    $result7 = pg_query($dbconn, $query7) or die("unable to execute query7");
    $answer7 = @pg_fetch_row($result7);

    pg_close($dbconn);
    echo "Transaction Successful ".$answer5[0]." ".$answer6[0];
?>