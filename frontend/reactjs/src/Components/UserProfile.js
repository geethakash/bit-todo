import { useContext } from "react";
import { toast } from "react-toastify";
import { FaPowerOff } from "react-icons/fa";
import UserImg from "../assets/img/avatar.png";
import { userContext } from "../Context/UserContext";
import { Link, useHistory } from "react-router-dom";

function UserProfile() {
  const Context = useContext(userContext);
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    Context.setUser(null);
    toast("Logout successfully", { theme: "colored", type: "info" });
    history.push("/login");
  };
  return (
    <>
      <div className="">
        <h1 className="text-3xl text-center pt-3 font-bold">User Profile</h1>
      </div>
      <div className="w-full flex flex-col items-center mt mt-16">
        <div className="bg-indigo-800 w-32 h-32 rounded-3xl">
          <img src={UserImg} className="w-full h-full rounded-3xl" />
        </div> 
        <div className="w-full mt-16">
          <div className="w-full flex flex-row justify-between px-7 ">
            <lebal>Username:</lebal>
            <input
              value={Context.user?.username}
              className="outline-none w-8/12 bg-transparent border-b-2 border-green-500"
            />
          </div>
          <div className="w-full flex flex-row justify-between pt-7 px-7">
            <lebal>Email</lebal>
            <input
              value={Context.user?.email}
              className="outline-none w-8/12 bg-transparent border-b-2 border-green-500"
            />
          </div>
          <div className="w-full px-7 flex justify-end mt-4">
              <button className="p-2 bg-green-500 rounded hover:bg-green-400 hover:text-black transition-all duration-75 flex items-center " title="Logout" onClick={handleLogout}>
                <FaPowerOff size="20" />
              </button>  
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
