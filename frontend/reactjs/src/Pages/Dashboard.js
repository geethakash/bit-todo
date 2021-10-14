import { React, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import UserImg from "../assets/img/user.png";

function Dashboard() {
  const [user, setUser] = useState({ username: "user" });
  const [sideBarToggle, setSideBarToggle] = useState(true);
  return (
    <div className="transition duration-500 h-full flex flex-row ">
      <div
        className={
          sideBarToggle
            ? "h-full w-56  bg-gray-600"
            : "h-full w-56  bg-gray-600 hidden"
        }
      >
        <div className="pl-3 w-full flex justify-start items-center border-b-2 text-gray-300">
          <div className="w-1/4 h-1/5">
            <img src={UserImg} className="h-full" alt="user" />
          </div>
          <div className="ml-2">{user.username}</div>
          <div />
        </div>
        <div className="w-full"></div>
        <div className="w-">
          <Link to="login/">
            <div className="pl-3 flex flex-row align-middle items-center w-full h-10 text-white hover:bg-gray-400">
              <div className="w-10 h-10 flex flex-row items-center justify-center">
                <FaUser />
              </div>

              <span className="ml-2">Login</span>
            </div>
          </Link>
          <Link to="register/">
            <div className="pl-3 flex flex-row align-middle items-center w-full h-10 text-white hover:bg-gray-400">
              <div className="w-10 h-10 flex flex-row items-center justify-center">
                <FaUser />
              </div>
              <span className="ml-2">Register</span>
            </div>
          </Link>
          <Link to="logout/">
            <div className="pl-3 flex flex-row align-middle items-center w-full h-10 text-white hover:bg-gray-400">
              <div className="w-10 h-10 flex flex-row items-center justify-center">
                <FaSignOutAlt />
              </div>
              <span className="ml-2">Logout</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full h-full">
        <button
          onClick={() => setSideBarToggle(!sideBarToggle)}
          className="w-10  h-10  flex items-center justify-center text-white border-0"
        >
          {sideBarToggle ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
