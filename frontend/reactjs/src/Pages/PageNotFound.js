import { useContext } from "react";
import { userContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

function PageNotFound() {
  const UserContext = useContext(userContext);
  return (
    <div className="flex w-full h-screen items-center flex-col justify-center  font-mono text-white">
      {localStorage.jwt ? (
        <>
          <h1 className="text-green-500 text-4xl mb-5">Page not found!</h1>
          <Link
            to="/"
            className="bg-gray-600 p-3 rounded border-2  hover:bg-green-400 hover:text-black"
          >
            Goto HOME
          </Link>
        </>
      ) : (
        <div className="flex w-full h-full items-center flex-col justify-center text-white">
          <h1 className="text-red-600 font-bold text-4xl mb-5">
            Please Login First!
          </h1>
          <Link
            to="/login"
            className="bg-gray-600 p-3 rounded border-2  hover:bg-green-400 hover:text-black"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default PageNotFound;
