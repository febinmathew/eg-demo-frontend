import { useContext } from "react";
import { AuthContext } from "../pages/Auth/AuthContext";
import { Navigate } from "react-router-dom";

const withAuth = <P extends object>(WrappedComponent: React.FC<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate to="/login" />
    );
  };

  return AuthenticatedComponent;
};

export default withAuth;
