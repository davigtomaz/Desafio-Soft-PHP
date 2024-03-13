import styles from "../../style/home/Home.module.css";
import { useState, useEffect, react } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/cart/actions";


function FormIndex() {
  const dispatch = useDispatch();
 
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const url = "http://localhost/routers/products.php";
  const input_tax = document.getElementById("cart_tax");
  const input_price = document.getElementById("cart_price");
  const input_amount = document.getElementById("cart_amount");

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
  },[]);

  async function getProductsById(id) {
    const response = await fetch(url).then((response) => response.json());
    let data = await response;

    const res = data.filter((item) => item.code == parseInt(id));
    return res;
  }


  function changeProduct(event) {
    getProductsById(event.target.value).then((value) => {
      setSelectedProduct(value[0]);

      input_tax.value = value[0].tax_cat;
      input_price.value = value[0].price;
    });
  }

  const handleProductsClick = async () => {
    const amount = parseInt(input_amount.value);
    const price = parseFloat(input_price.value);
    const tax = parseFloat(input_tax.value);

    if (selectedProduct.amount >= amount) {
      await dispatch(
        addProductToCart({
          product: selectedProduct,
          amount: parseInt(amount),
          total: amount * price + amount * price * (tax / 100),
        })
      );
    } else {
      alert("Quantidade Indisponível");
    }
  };

  return (
    <div>
      <select
        name="Products"
        id="product_name"
        className={styles.selectProduct}
        onClick={(e) => changeProduct(e)}
      >
        <option>Select a Product</option>
        {products.map((product) => (
          <option value={product.code} key={product.code}>
            {product.name}.(Quantidade disponível: {product.amount})
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount"
        className={styles.buttonAmount}
        id="cart_amount"
        
      />
      <input
        type="text"
        placeholder="Tax"
        className={styles.buttonTax}
        disabled
        id="cart_tax"
      />
      <input
        type="number"
        placeholder="Price"
        className={styles.buttonPrice}
        disabled
        id="cart_price"
      />
      <button
        className={styles.CartBtn}
        id="btn"
        type="submit"
        onClick={handleProductsClick}
      >
        <span className={styles.IconContainer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
            fill="rgb(17, 17, 17)"
            className={styles.cart}
          >
            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
          </svg>
        </span>
        <p className={styles.text}>Add Cart</p>
      </button>
    </div>
  );
}

export default FormIndex;
