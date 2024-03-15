import styles from "../../style/history/History.module.css";
import { useState, useEffect } from "react";
import ModalHistory from "./ModalHistory";
import { useSelector } from "react-redux";

function HistoryComponent() {
  const users_code = useSelector((rootReducer) => rootReducer.userReducer.currentUser.code);

  const url = `http://localhost/routers/orders.php?users_code=${users_code}`;
  const [orders, setOrders] = useState([]);

  
  const [selectOrder, setSelectedOrder] = useState(0)
    function loadingOrders(){

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setOrders(data);
        })
        .catch((err) => console.log(err));
    }

  useEffect(() => {
    loadingOrders()
  },[]);

  
  

  return (
    <div className={styles.container2}>
      <div className={styles.tableItens}>
        <table>
          <thead>
            <tr id="trItens">
              <td>Code</td>
              <td>Tax</td>
              <td>Total</td>
              <td></td>
            </tr>
          </thead>
          <tbody id="lista">
            {orders.map((order) => (
                <tr key={order.code}>
                    <td>{order.code}</td>
                    <td>{order.tax}</td>
                    <td>{order.total}</td>
                    <td ><button className={styles.buttonView}  onClick={() => {setSelectedOrder(order.code)}} >View</button></td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    {
      selectOrder != 0 && 

    <ModalHistory selectOrder={selectOrder} setSelectedOrder={setSelectedOrder} />
    }
      
    </div>
  );
}

export default HistoryComponent;
