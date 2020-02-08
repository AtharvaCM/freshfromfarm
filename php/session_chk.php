<?php
    session_start();

    // session is set and not empty
    if(isset($_SESSION['username']) && !empty($_SESSION['username']))
    {
        echo $_SESSION['username'];
    }
    else
    {
        return false;
    }
?>