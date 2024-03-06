<?php

include ('../services/categories.php');


function Request(){
    $method = $_SERVER['REQUEST_METHOD'];
    $categoriesClass = new CategoriesClass();

    switch($method){
        case "GET":
            echo $categoriesClass->getCategories();
            break;
        case "POST":
            echo $categoriesClass->postCategories();
        
            break;
        case "DELETE":
            echo $categoriesClass->deleteCategories();

            break;
    }
}

Request();