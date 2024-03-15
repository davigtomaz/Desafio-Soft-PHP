import styles from "../../style/history/History.module.css";
import { useState, useEffect } from "react";

function ModalHistory ({selectOrder, setSelectedOrder}) {
    const urlOrderItem = "http://localhost/routers/order_item.php";
    const [ordersItens, setOrdersItens] = useState([])


  


  async function getOrder_ItemById(){
    setOrdersItens([])
    const response = await fetch(urlOrderItem).then(response=>response.json())
    let data = await response;
    let res = data.filter(item=>{
      if(item.order_code == selectOrder){
        return item
      }
    } )
    setOrdersItens(res)
    return res } 

    useEffect(() => {
        
        getOrder_ItemById()
      }, [selectOrder]);
      
    

    
    return(
     
        <div className={styles.container2}>
        <div id={styles.modal}>
        <div className={styles.contentModal}>
          <table>
            <thead>
              <tr id="trItens">
                <td>Product</td>
                <td>Category</td>
                <td>Amount</td>
                <td>Unit Price</td>
              </tr>
            </thead>
            <tbody id="tableHistory">
            {ordersItens.map((orderItem => (
                <tr key={orderItem.code}>
                  <td>{orderItem.product_name}</td>
                  <td>{orderItem.category_name}</td>
                  <td>{orderItem.amount}</td>
                  <td>{orderItem.price}</td>
                </tr>
              )))}
            </tbody>
          </table>
          <button onClick={() => setSelectedOrder(0)} className={styles.buttonClose}>
            X
          </button>
        </div>
      </div>
    </div>
    )
}
export default ModalHistory