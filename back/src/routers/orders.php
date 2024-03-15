<?php 
include('../services/orders.php');

function Request() {
    $method = $_SERVER["REQUEST_METHOD"];
    $ordersClass = new OrdersClass();

    switch($method){
        case 'GET':
            if($_SERVER['QUERY_STRING']){
                echo $ordersClass->getOrders($_GET['users_code']);
            } 
            break;
        case 'POST':
            echo $ordersClass->postOrders();
            break;
        case 'DELETE':
            echo $ordersClass->deleteOrders();
            break;
        
    };
};

Request();

?>