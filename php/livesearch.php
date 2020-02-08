
<?php

//$xmlDoc=new DOMDocument();
//$xmlDoc->load("links.xml");

$xml=simplexml_load_file("links.xml") or die("Error: Cannot create object");

//$x=$xmlDoc->getElementsByTagName('link');

//get the q parameter from URL
$q=$_GET["q"];

//lookup all links from the xml file if length of q>0
/*
if (strlen($q)>0) {
  $hint="";
  for($i=0; $i<($x->length); $i++) {
    $y=$x->item($i)->getElementsByTagName('title');
    $z=$x->item($i)->getElementsByTagName('url');
    if ($y->item(0)->nodeType==1) {
      //find a link matching the search text
      if (stristr($y->item(0)->childNodes->item(0)->nodeValue,$q)) {
        if ($hint=="") {
          $hint="<a href='" .
          $z->item(0)->childNodes->item(0)->nodeValue .
          "' target='_blank'>" .
          $y->item(0)->childNodes->item(0)->nodeValue . "</a>";
        } else {
          $hint=$hint . "<br /><a href='" .
          $z->item(0)->childNodes->item(0)->nodeValue .
          "' target='_blank'>" .
          $y->item(0)->childNodes->item(0)->nodeValue . "</a>";
        }
      }
    }
  }
}
*/

if (strlen($q)>0) {
    $hint="";
    // $links is $x for above ref
    foreach ($xml->children() as $links) {
        //echo $hint.", ";
        $y = $links->title;
        $z = $links->url;
        //find a link matching the search text
        if (stristr($y,$q)) {
            if ($hint == "") {
                $hint = "<ul class='hint-list'><li><a class='hints' href='".$z."' target='_self'>".$y."</a></li>";
            } else {
                $hint = $hint ."<li><a class='hints' href='".$z."' target='_self'>".$y."</a></li>";
            }
        }  
    }
    $hint = $hint."</ul>";
}

// Set output to "no suggestion" if no hint was found
// or to the correct values
if ($hint=="") {
  $response="no suggestion";
} else {
  $response=$hint;
}

//output the response
echo $response;
?> 