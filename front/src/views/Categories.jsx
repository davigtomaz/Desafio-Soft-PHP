import "../index.css";
import FormCategories from "../components/categories/FormCategories.jsx";
import TableCategories from "../components/categories/TableCategories.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogoutUser } from "../redux/user/actions.jsx";

function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logged = useSelector((rootReducer) => rootReducer.userReducer.Logged);

  function Verify() {

    if (!logged) {
      dispatch(LogoutUser())
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
          <FormCategories />
        </div>
        <div className="gridItem2">
          <TableCategories />
        </div>
      </div>
    </div>
  );
}

export default Categories;
