<?php 
include('../services/orders.php');

function Request() {
    $method = $_SERVER["REQUEST_METHOD"];
    $ordersClass = new OrdersClass();

    switch($method){
        case 'GET':
            echo $ordersClass->getOrders();
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