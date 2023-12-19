import { useSendLogoutMutation } from "../redux/api/authApiSlice";
import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserRole } from "../redux/slices/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = useSelector(selectCurrentUserRole);

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  console.log(userRole);

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  const isLoginPage = location.pathname === "/";

  if (isLoginPage) {
    return null; // Render nothing if it's the login page
  }
  const content = (
    <div>
      <Link className="float-right topNavBar" onClick={sendLogout}>
        Log Out
      </Link>
      <Link to="/menu" className="float-right topNavBar">
        Menu
      </Link>
      {userRole === "manager" && (
        <Link to="/managementMenu" className="float-right topNavBar">
          Management
        </Link>
      )}
    </div>
  );
  return content;
};
export default NavBar;
