import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ apenasAdmin = false }) {
  const { autenticado, user } = useAuth();

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  if (apenasAdmin && !user?.admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

PrivateRoute.propTypes = {
  apenasAdmin: PropTypes.bool,
};

export default PrivateRoute;
