import styles from "../../style/home/Home.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import rootReducer from "../../redux/rootReducer";

import { removeItensToCart } from "../../redux/cart/actions";

import { removeProductToCart } from "../../redux/cart/actions";

function TableHome() {
  const [products, setProducts] = useState([]);
  const productsCart = useSelector((rootReducer) => rootReducer.cartReducer);
  const dispatch = useDispatch();
  const urlOrder = "http://localhost/routers/orders.php";
  const urlProducts = "http://localhost/routers/products.php";
  const urlOrder_Item = "http://localhost/routers/order_item.php";
  const user = useSelector((rootReducer => rootReducer.userReducer.currentUser.code))
  let Tax = 0;
  let Total = 0;
  

  const handleRemoveClick = () => {
    dispatch(removeProductToCart(products));
  };
  const handleRemoveClickCart = () => {
    dispatch(removeItensToCart());
  };

  function transformFormData(obj) {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }
  function loadingProducts() {
    fetch(urlProducts, {
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
  }

 

  useEffect(() => {
    loadingProducts();
  }, []);

  const postOrder = async (itensOrder) => {
    try {
      const res = await fetch(urlOrder, {
        method: "POST",
        body: itensOrder,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const postOrderItem = async (itensOrderItens) => {
    try {
      const res = await fetch(urlOrder_Item, {
        method: "POST",
        body: itensOrderItens,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const CartFinish = async () => {
    const data = loadingProducts();
    let newProductsCart = productsCart;
    setProducts(data);

    for (let productCart of newProductsCart.products) {
      for (let product of products) {
        if (product.code == productCart.product.code) {
          if (parseInt(productCart.amount) > parseInt(product.amount)) {
            alert("Quantidade insdisponível no estoque");
            return false;
          }
        }
      }
    }
    const order = {
      code: parseInt((Math.random() * 1000000).toFixed(0)),
      users_code: user,
      total: Total.toFixed(2),
      tax: Tax.toFixed(2),
    };

   
    const itensOrder = transformFormData(order);
    await postOrder(itensOrder);

    let newCart = productsCart.products;
    for (let item of newCart) {
      let order_item = {
        order_code: parseInt(order.code),
        product_code: item.product.code,
        amount: parseInt(item.amount),
        price: item.product.price,
        tax: item.product.tax_cat,
      };
      let itensOrderItens = transformFormData(order_item);
      await postOrderItem(itensOrderItens);
    }
    window.location.reload();
    handleRemoveClickCart();
  };
  productsCart.products.forEach((cart) => {
    Tax += (cart.product.price * cart.amount * cart.product.tax_cat) / 100;
    Total +=
      cart.amount * cart.product.price +
      cart.amount *
        cart.product.price *
        (cart.product.tax_cat / 100).toFixed(2);
  });

  return (
    <div>
      <div className={styles.tableItens}>
        <table>
          <thead>
            <tr id="trItens">
              <td className={styles.productItens}>Product</td>
              <td>Unit Price</td>
              <td>Amount</td>
              <td>Total</td>
              <td></td>
            </tr>
          </thead>
          <tbody id="lista">
            {productsCart.products.length != 0 &&
              productsCart.products.map((cart) => (
                <tr key={Math.random() * 1000000}>
                  <td>{cart.product.name}</td>
                  <td>{cart.product.price}</td>
                  <td>{cart.amount}</td>
                  <td>
                    {cart.amount * cart.product.price +
                      cart.amount *
                        cart.product.price *
                        (cart.product.tax_cat / 100)}
                  </td>
                  <td>
                    <button
                      className={styles.btn}
                      onClick={() => {
                        handleRemoveClick();
                      }}
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
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={styles.areaFinish}>
        <div className={styles.totalFinish} id="totalFinish">
          Tax: {Tax.toFixed(2)}
          <br />
          Total: {Total.toFixed(2)}
        </div>
        <div className={styles.buttonFinish}>
          <button className={styles.buttonFinish2} onClick={CartFinish}>
            Finish
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableHome;
