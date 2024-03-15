<?php 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include ('../index.php');

class UsersClass {
    public string $name;
    public string $password;

    public function __construct()
    {
        if($_POST){
            $this->name = filter_input(INPUT_POST, 'name' ,FILTER_SANITIZE_SPECIAL_CHARS);
            $this->password = $_POST['password'];
        } else {
            return "";
        }
    }

    public function getUsers(){
        $users = myPDO->query('SELECT * FROM users');
        $users = $users->fetchALL();
        return json_encode($users);
    }

    public function createUsers(){
        $passwordHash = password_hash($this->password, PASSWORD_DEFAULT);
        $users = myPDO->prepare("INSERT INTO users (name, password) VALUES ( '$this->name', '$passwordHash') ");
        $users = $users->execute();
        
        return json_encode($users);
    }
    public function LoginUsers(){
        
        $readUsers = myPDO->query("SELECT * FROM users where name = '$this->name'");
        $users = $readUsers->fetch();
        
        
       if ($users){
            if(password_verify($this->password, $users['password'])){
                echo $users['code'];
            }
        } else {
            return json_encode(array('error' => 'N dei'));
        }
   }
}

define ('usersClass', new UsersClass())



?>