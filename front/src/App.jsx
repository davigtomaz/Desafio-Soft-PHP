import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,

} from "react-router-dom";
import Home from "./views/Home.jsx";
import Products from "./views/Products.jsx";
import History from "./views/History.jsx";
import Categories from "./views/Categories.jsx";
import Navbar from "./components/global/Navbar.jsx";
import Login from "./views/Login.jsx";
import Register from "./views/Register.jsx";
import "./index.css";

function Layout(){
  return (
    <div>
      <Navbar />

      <Outlet />
    </div>
  )
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={Layout()}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/History" element={<History />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
