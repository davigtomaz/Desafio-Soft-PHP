<?php 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Origin: *");
include('../index.php');


class OrdersClass{
    public int $code;
    public float $total;
    public float $tax;


    public function __construct()
    {
        if($_POST){

            $this->code = filter_input(INPUT_POST,'code',FILTER_SANITIZE_NUMBER_INT);
            $this->total = filter_input(INPUT_POST,'total',FILTER_SANITIZE_NUMBER_FLOAT,FILTER_FLAG_ALLOW_FRACTION);
            $this->tax = filter_input(INPUT_POST,'tax',FILTER_SANITIZE_NUMBER_FLOAT,FILTER_FLAG_ALLOW_FRACTION);
        }else {
            return "";
        }
    }

    public function getOrders() {
        $orders = myPDO->query('SELECT * FROM ORDERS');
        $orders = $orders->fetchALL();
        return json_encode($orders);
    }
    
    public function postOrders(){
        $orders = myPDO->prepare("INSERT INTO ORDERS (CODE, TOTAL, TAX) VALUES ( '$this->code','$this->total', '$this->tax') ");
        $orders = $orders->execute();

        return json_encode($orders) ;
    }
    
    public function deleteOrders(){
        $code = $_SERVER["QUERY_STRING"];
        $codeExplode = explode('code=', $code);
        $orders = myPDO->prepare("DELETE FROM orders WHERE code = $codeExplode[1] " );
        $orders = $orders->execute();
        if($orders > 0) {
            return json_encode(["data" => true]);
          } else {
            return json_encode(["data" => false]);
          }
    }


}

define('ordersClass', new OrdersClass());

?>