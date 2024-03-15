import "../index.css";
import FormHome from "../components/home/FormHome.jsx";
import TableHome from "../components/home/TableHome.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const logged = useSelector((rootReducer) => rootReducer.userReducer.Logged);

  function Verify() {
    if (!logged) {
      return navigate("/");
    }
  }
  useEffect(() => {
    Verify();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="gridItem1">
          <FormHome />
        </div>
        <div className="gridItem2">
          <TableHome />
        </div>
      </div>
    </div>
  );
}

export default Home;
