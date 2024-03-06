<?php 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Origin: *");

include('../index.php');

class OrderItemClass {
    public int $code;
    public int $order_code;
    public int $product_code;
    public int $amount;
    public float $price;
    public float $tax;
 
    

    public function __construct()
    {
        if($_POST){
            $this->order_code = filter_input(INPUT_POST,'order_code',FILTER_SANITIZE_NUMBER_INT);
            $this->product_code = filter_input(INPUT_POST,'product_code',FILTER_SANITIZE_NUMBER_INT);
            $this->amount = filter_input(INPUT_POST,'amount',FILTER_SANITIZE_NUMBER_INT);
            $this->price = filter_input(INPUT_POST,'price',FILTER_SANITIZE_NUMBER_FLOAT,FILTER_FLAG_ALLOW_FRACTION);
            $this->tax = filter_input(INPUT_POST,'tax',FILTER_SANITIZE_NUMBER_FLOAT,FILTER_FLAG_ALLOW_FRACTION);
        } else {
            return "";
        }
    }

    public function getOrderItem (){
        $order_item = myPDO->query('SELECT order_item.*, products.name AS product_name, categories.name AS category_name,  categories.tax AS category_tax
        FROM order_item INNER JOIN products ON order_item.product_code = products.code
        INNER JOIN categories ON products.category_code = categories.code;');
        $order_item = $order_item->fetchALL();
        return json_encode($order_item);
    }
    
    public function postOrderItem () {
        
        $order_item = myPDO->prepare("INSERT INTO order_item (order_code, product_code, amount, price, tax) VALUES ('$this->order_code', '$this->product_code', '$this->amount', '$this->price', '$this->tax')");
        $order_item = $order_item->execute();
        $this->updateStorage();
        return json_encode($order_item);
    }
    
    public function deleteOrderItem(){
        $code = $_SERVER['QUERY_STRING'];
        $codeExplode = explode('code=', $code);
    
        $order_item = myPDO->prepare("DELETE FROM order_item where code = $codeExplode[1]");
        $order_item = $order_item->execute();
        if($$order_item > 0) {
            return json_encode(["data" => true]);
          } else {
            return json_encode(["data" => false]);
          }
    }

    public function updateStorage(){
        $read = $this->itensStorage($this->product_code);
        $newAmount = $read['amount'] - $this->amount;
        $order_item = myPDO->query("UPDATE products set amount = $newAmount where code = '$this->product_code'");
        $order_item = $order_item->execute();
        return "foi";
    }

 
    public function itensStorage(){
        $itensProducts = myPDO->query("SELECT * FROM products where code = '$this->product_code'");
        $itemProduct = $itensProducts->fetch();
        return $itemProduct ;
    }

}

define('orderItemClass', new OrderItemClass());

?>