<?php 
include('../services/products.php');

function Request (){
    $method = $_SERVER['REQUEST_METHOD'];
    $productsClass = new ProductsClass();

    switch($method){
        case "GET":
            echo $productsClass->getProducts();
            break;
        case "POST":
            echo $productsClass->postProducts();

            break;
        case "DELETE":
            echo $productsClass->deleteProducts();
           
            break;
        };
    }
Request();

?>