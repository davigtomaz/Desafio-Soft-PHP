<?php 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Origin: *");

include('../index.php');

class CategoriesClass {
    public string $name;
    public float $tax;

    public function __construct( )
    {
        if($_POST){
        $this->name = filter_input(INPUT_POST,'name',FILTER_SANITIZE_SPECIAL_CHARS);
        $this->tax = filter_input(INPUT_POST,'tax',FILTER_SANITIZE_NUMBER_FLOAT,FILTER_FLAG_ALLOW_FRACTION);
    }   else {
        return "";
    }
    }

    public function getCategories(){
        $categories = myPDO->query('SELECT * FROM categories');
        $categories = $categories->fetchALL();
        return json_encode($categories);
}

    public function postCategories(){
        $categories = myPDO->prepare("INSERT INTO categories ( name, tax) VALUES ( '$this->name', '$this->tax')");
        $categories = $categories->execute();
        return json_encode($categories);
    }

    public function deleteCategories(){
        $code = $_SERVER["QUERY_STRING"];
        $codeExplode = explode('code=', $code);
    
        $categories = myPDO->prepare("DELETE FROM categories where code = $codeExplode[1]");
        $categories = $categories->execute();
        if($categories > 0) {
            return json_encode(["data" => true]);
          } else {
            return json_encode(["data" => false]);
          }
        }

}




define('categoriesClass' , new CategoriesClass())



?>