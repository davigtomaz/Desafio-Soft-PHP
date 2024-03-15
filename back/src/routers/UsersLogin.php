<?php 

include ('../services/users.php');
if($_SERVER['REQUEST_METHOD'] === "POST" ){
    $usersClass = new UsersClass();
    
    echo $usersClass->LoginUsers();
}

?>
