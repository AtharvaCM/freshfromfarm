<?php
    // Data from client
    $id = $_GET['itemId'];
    //echo "value = ".$id;

    $xml = simplexml_load_file("productPrice.xml") or die("Error: Cannot create object");

    $ans = 0;
    foreach ($xml->children() as $products) {
        $y = intval($products->id);
        $z = intval($products->price);
        //echo $y." ".$z;
        //find a product matching the id
        //echo "passedID ".$id."loopID ".$y;
        if ($id == $y) {
            $ans = $z;
            //echo "inside";
        }   
    }

    if ($ans == 0) {
        $response = "no price value found";
    } else {
        $response = $ans;
    }

    //output the response
    echo $response;
?>