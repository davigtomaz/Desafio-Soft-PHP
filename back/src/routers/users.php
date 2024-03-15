<?php 

include ('../services/users.php');

function Request(){
    $method = $_SERVER['REQUEST_METHOD'];
    $usersClass = new UsersClass();

    switch ($method){
        case "GET";
            echo $usersClass->getUsers();
            break;
        case "POST";
            echo $usersClass->createUsers();
            break;
    };
}
Request()

?>