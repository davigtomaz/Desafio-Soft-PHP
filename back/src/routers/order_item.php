<?php 
include('../services/order_item.php');

function Request(){
    $method = $_SERVER['REQUEST_METHOD'];
    $orderItemClass = new OrderItemClass();

    switch($method){
        case 'GET':
            echo  $orderItemClass->getOrderItem();
            break;
        case 'POST':
            echo $orderItemClass->postOrderItem();
            
            break;
        case "DELETE":
            echo $orderItemClass->deleteOrderItem();

            break;
        };
}

Request()
?>