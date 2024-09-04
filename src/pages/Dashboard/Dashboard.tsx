import { useContext } from "react";
import withAuth from "../../common/withAuth";
import { AuthContext } from "../../contexts/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <h1>Hi, {user?.name}</h1>
      <h2>Welcome to the application!</h2>
      <p>
        <a
          onClick={() => {
            logout();
          }}
        >
          Click here
        </a>{" "}
        to logout
      </p>
    </div>
  );
}

export default withAuth(Dashboard);
