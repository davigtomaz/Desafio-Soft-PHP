import styles from "../../style/categories/Categories.module.css";
import { useState, useEffect } from "react";

function TableCategories() {
  const [categories, setCategories] = useState([]);
  const url = "http://localhost/routers/categories.php";

  useEffect(() => {
    fetch(url, {
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
    async function deleteCategory(code) {
      await fetch(`http://localhost/routers/categories.php?code=${code}`, {
        method:"DELETE",
      });
    }

  return (
    <div className={styles.tableItens}>
      <table>
        <thead>
          <tr id="trItens">
            <td className={styles.productItens}>Code</td>
            <td>Category</td>
            <td>Tax</td>
            <td></td>
          </tr>
        </thead>
        <tbody id="lista">
          {categories.map((category) => (
            <tr key={category.code}>
              <td>{category.code}</td>
              <td>{category.name}</td>
              <td>{category.tax}</td>
              <td>
              <button className={styles.btn} onClick={() => deleteCategory(category.code)}>
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
  );
}

export default TableCategories;
