import { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
