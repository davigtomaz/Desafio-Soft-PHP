import styles from "../../style/products/Products.module.css";
import { useState, useEffect } from "react";

function TableProducts() {
  const [products, setProducts] = useState([]);
  const url = "http://localhost/routers/products.php";

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  });
  async function deleteProduct(code) {
    await fetch(`http://localhost/routers/products.php?code=${code}`, {
      method: "DELETE",
    });
  }

  return (
    <div className={styles.tableItens}>
      <table>
        <thead>
          <tr id="trItens">
            <td className={styles.productItens}>Code</td>
            <td>Product</td>
            <td>Amount</td>
            <td>Unit Price</td>
            <td>Category</td>
            <td>Tax</td>
            <td></td>
          </tr>
        </thead>
        <tbody id="lista">
          {products.map((product) => (
            <tr key={product.code}>
              <td>{product.code}</td>
              <td>{product.name}</td>
              <td>{product.amount}</td>
              <td>{product.price}</td>
              <td>{product.name_cat}</td>
              <td>{product.tax_cat}</td>
              <button
                className={styles.btn}
                onClick={() => deleteProduct(product.code)}
              >
                <svg
                  viewBox="0 0 15 17.5"
                  height="17.5"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.icon}
                >
                  <path
                    transform="translate(-2.5 -1.25)"
                    d="M15,18.75H5A1.251,1.251,0,0,1,3.75,17.5V5H2.5V3.75h15V5H16.25V17.5A1.251,1.251,0,0,1,15,18.75ZM5,5V17.5H15V5Zm7.5,10H11.25V7.5H12.5V15ZM8.75,15H7.5V7.5H8.75V15ZM12.5,2.5h-5V1.25h5V2.5Z"
                    id="Fill"
                  ></path>
                </svg>
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableProducts;
