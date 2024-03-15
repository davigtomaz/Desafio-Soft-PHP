import styles from "../../style/products/Products.module.css";
import { useState, useEffect } from "react";

function FormProducts() {
  const urlCategories = "http://localhost/routers/categories.php";
  const url = "http://localhost/routers/products.php";
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState([]);
  const [amount, setAmount] = useState([]);
  const [price, setPrice] = useState([]);
  const input_name = document.getElementById("product_name");
  const input_amount = document.getElementById("product_amount");
  const input_price = document.getElementById("product_price");
  
  const form = document.getElementById("form");

  useEffect(() => {
    fetch(urlCategories, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  });

  const postProducts = async (e) => {
    e.preventDefault();

    if (input_amount.value < 0 || input_price.value < 0){
      return alert('valor inválido')
    }

    if (input_name.value === "" || input_amount.value === "" || input_price.value === "") {
      return alert("Preencha Todos os Dados!");
    }   

    const data = new FormData(form);
    try {
        await fetch(
        url,
        {
          method: "POST",
          body: data,
        },
        window.location.reload()
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form id="form">
      <input
        name="name"
        className={styles.inputProduct}
        placeholder="Name"
        id="product_name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        className={styles.inputButton}
        id="product_amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        name="price"
        type="number"
        placeholder="Unit Price"
        className={styles.inputUnit}
        id="product_price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <select
        name="category"
        className={styles.selectProduct}
        id="product_category"
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category) => (
          <option
            value={category.code}
            key={category.code}
            onChange={(e) => setCategories(e.target.value)}
          >
            {category.name}
          </option>
        ))}
      </select>

      <button
        className={styles.CartBtn}
        id="btn"
        type="submit"
        onClick={(e) => postProducts(e)}
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
        <p className={styles.text}>Add Products</p>
      </button>
    </form>
  );
}

export default FormProducts;
