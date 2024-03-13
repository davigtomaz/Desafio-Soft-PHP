import {BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import Home from "./views/Home.jsx"
import Products from "./views/Products.jsx"
import History from "./views/History.jsx"
import Categories from "./views/Categories.jsx"
import Navbar from "./components/global/Navbar.jsx"
import './index.css'
function App() {


  return (
    <Router>
     <Navbar />
      <Routes>
        <Route  path="/" element={ <Home />}></Route>
        <Route  path="/products" element={ <Products />}></Route>
        <Route  path="/categories" element={ <Categories />}></Route>
        <Route  path="/History" element={ <History />}></Route>
      </Routes>
    </Router>
  );
}

export default App
