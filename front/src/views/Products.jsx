import "../index.css";
import FormProducts from "../components/products/FormProducts.jsx";
import TableProducts from "../components/products/TableProducts.jsx";
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Products() {
 
    const navigate = useNavigate()
    const logged = useSelector((rootReducer) => rootReducer.userReducer.Logged)

  
  function Verify(){
    if(!logged){
      return navigate('/')
    }
  }
    useEffect(() => {
      Verify();
    }, []);
  
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
