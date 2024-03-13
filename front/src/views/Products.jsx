import "../index.css";
import FormProducts from "../components/products/FormProducts.jsx";
import TableProducts from "../components/products/TableProducts.jsx";

function Products() {
  return (
    <div>
      <div className="container">
        <div className="gridItem1">
          <FormProducts />
        </div>
        <div className="gridItem2">
          <TableProducts />
        </div>
      </div>
    </div>
  );
}

export default Products;
