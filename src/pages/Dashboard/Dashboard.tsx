import { useContext } from "react";
import withAuth from "../../common/withAuth";
import { AuthContext } from "../../contexts/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Hi, {user?.name}</h1>
      <h2 className="text-xl mb-8">Welcome to the application!</h2>
      {/* <p>
        <a
          onClick={() => {
            logout();
          }}
        >
          Click here
        </a>{" "}
        to logout
      </p> */}
      <button
        onClick={() => {
          logout();
        }}
        type="button"
        className="bg-indigo-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigos-500 focus:ring-offset-2"
      >
        Logout
      </button>
    </div>
  );
}

export default withAuth(Dashboard);
