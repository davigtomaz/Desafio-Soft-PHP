import styles from "../../style/categories/Categories.module.css";
import { useState } from "react";

function FormCategories() {
  const url = "http://localhost/routers/categories.php";
  const [name, setName] = useState([]);
  const [tax, setTax] = useState([]);
  const form = document.getElementById("form");
  const input_name = document.getElementById("category_name");
  const input_tax = document.getElementById("category_tax");

  const postCategories = async (e) => {
    e.preventDefault();

    if (input_tax.value < 0){
      return alert('valor inválido')
    }

    if (input_name.value === "" || input_tax.value === "") {
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
      
      );
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <form id="form">
      <input
        type="text"
        id="category_name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.inputCategory}
        placeholder="Category Name"
      />
      <input
        type="number"
        id="category_tax"
        placeholder="Tax"
        name="tax"
        value={tax}
        onChange={(e) => setTax(e.target.value)}
        className={styles.inputTax}
        min='0'/>
       <button
        className={styles.CartBtn}
        id="btn"
        type="submit"
        onClick={(e) => postCategories(e)}
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

export default FormCategories;
