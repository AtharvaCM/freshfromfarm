<?php
    session_start();

    // session is set and not empty
    if(isset($_SESSION['username']) && !empty($_SESSION['username']))
    {
        session_destroy();
        echo "1";
    }
    else
    {
        return false;
    }
?>