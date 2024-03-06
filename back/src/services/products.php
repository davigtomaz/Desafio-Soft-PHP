<?php 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Origin: *");
include ('../index.php');


class ProductsClass {
    public string $name;
    public int $amount;
    public float $price;
    public int $category;

    public function __construct()
    {
        if ($_POST){
            $this->name = filter_input(INPUT_POST,'name',FILTER_SANITIZE_SPECIAL_CHARS);
            $this->amount = filter_input(INPUT_POST,'amount',FILTER_SANITIZE_NUMBER_INT);
            $this->price = filter_input(INPUT_POST,'price',FILTER_SANITIZE_NUMBER_FLOAT,FILTER_FLAG_ALLOW_FRACTION);
            $this->category = filter_input(INPUT_POST,'category',FILTER_SANITIZE_NUMBER_INT);
        } else {
            return "";
        }
    }
    
    public function getProducts(){
        $products = myPDO->query('SELECT products.*, categories.name as name_cat, categories.tax as tax_cat 
        FROM products INNER JOIN categories ON products.category_code = categories.code;');
        $products = $products->fetchALL();
        return json_encode($products);
    }
    
    public function postProducts(){
        $products = myPDO->prepare("INSERT INTO products (name, amount ,price, category_code) VALUES ('$this->name', '$this->amount', '$this->price', '$this->category')");
        $products = $products->execute();
        return json_encode($products);
    }

    public function deleteProducts(){
        $code = $_SERVER['QUERY_STRING'];
        $codeExplode = explode('code=', $code);
    
        $products = myPDO->prepare("DELETE FROM products where code = $codeExplode[1]");
        $products = $products->execute();
        if($products > 0) {
            return json_encode(["data" => true]);
          } else {
            return json_encode(["data" => false]);
          }
    }
    

}

define('productsClass', new ProductsClass())

?>