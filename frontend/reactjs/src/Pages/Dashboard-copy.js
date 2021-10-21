import { React, useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { FaList, FaPlus, FaSignOutAlt, FaUser } from "react-icons/fa";
import UserImg from "../assets/img/Loading.png";
import Spinner from "../Components/Spinner";
import { userContext } from "../Context/UserContext";
import ListItem from "../Components/ListItem";
import { v4 } from "uuid";
import Moment from "react-moment";

function Dashboard() {
  const [user, setUser] = useState(null);
  const Context = useContext(userContext);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(true)
  const history = useHistory();
  const [data, setData] = useState({
    data: {
      todoLists: [
        {
          title: "do something",
          uid: v4(),
          dnt: new Date().toLocaleString() + "",
          todos: [
            {
              title: "create django project with react",
              uid: v4(),
              desc: "something do deffrent",
              category: "programming",
              dnt:new Date().toISOString().slice(0, 10)  ,
              isDone: false,
              subTask: [
                {
                  title: "create backend",
                  uid: v4(),
                  isDone: true,
                },
              ],
            },
          ],
        },
      ],
    },
  });


  const [todolist, setTodoList] = useState([
    { title: "2021.02.21 - Monday - Week 01 day 01" },
  ]);

  const [currentlistTitle, setCurrentListTitle] = useState(
    "2021.02.21 - Monday - Week 01 day 01"
  );

  useEffect(() => {
    Context.setUser(user)
  }, [user]);


  


  useEffect(() => {
    setIsLoading(true)
    if (localStorage.jwt) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        jwt: localStorage.jwt,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://192.168.8.109:8000/api/user/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          // localStorage.setItem('user',result)
          let resultObj = JSON.parse(result);
          switch (resultObj.detail) {
            case "Session Expired!":
              toast(resultObj.detail, { theme: "colored", type: "error" });
              localStorage.removeItem("jwt");
              setUser(Context.user);
              history.push("/login");
              break;
            case "success":
              setUser(JSON.parse(result).data);
            default:
              break;
          }
          
        })
        
        .then(
          fetch("http://192.168.8.109:8000/data/getdata/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // console.log(result);
          // localStorage.setItem('user',result)
          let resultObj = JSON.parse(result);
          switch (resultObj.detail) {
            case "no token found!" || "Session Expired!":
              toast('Something wents wrong!\nPlease login again.',{type:'error',theme:'colored'});
              history.push("/login");
            case "success":
              Context.setData(resultObj.data)
            default:
              break;
          }
        })
        )
        .catch((error) => {
          // toast(`${error.message}`,{type:'error',theme:'colored'})
          console.log("error", error);
        });
    } else {
      history.push("/login");
    }
    setIsLoading(false)

    setTimeout(() => {
      getBackendData()
      setIsSideBarOpen(false);
      setBackendData()
    }, 1000);
    
  }, []);

  useEffect(() => {
    
    setTimeout(() => {
      console.log('updating');
    }, 3000);
  },[])


  const getBackendData = () => {
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        jwt: localStorage.jwt
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      
    fetch("http://192.168.8.109:8000/data/getdata/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          // localStorage.setItem('user',result)
          let resultObj = JSON.parse(result);
          switch (resultObj.detail) {
            case "no token found!" || "Session Expired!":
              toast('Something wents wrong!\nPlease login again.',{type:'error',theme:'colored'});
              history.push("/login");
            case "success":
              setData(resultObj.data)

            default:
              break;
          }
        })
  }

  const setBackendData = () => {
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        jwt: localStorage.jwt,
        userdata:data
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      
    fetch("http://192.168.8.109:8000/data/setdata/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          // localStorage.setItem('user',result)
          let resultObj = JSON.parse(result);
          switch (resultObj.detail) {
            case "no token found!" || "Session Expired!":
              toast('Something wents wrong!\nPlease login again.',{type:'error',theme:'colored'});
              history.push("/login");
            case "success":
              console.log(resultObj.message);
            default:
              break;
          }
        })
  }


  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    Context.setUser(null);
    toast("Logout successfully", { theme: "colored", type: "info" });
    history.push("/login");
  };

  const addNewList = () => {
    setData({ data: { todoLists: [...data.data.todoLists, ""] } });
  };
  return (
    <div className=" h-full font-mono flex flex-row ">
      <div
        onClick={() => setIsSideBarOpen(true)}
        // onMouseLeave={() => setIsSideBarOpen(false)}
        className={
          isSideBarOpen
            ? "w-full lg:w-3/12 bg-dark2 add-transition-05 font-normal "
            : "hidden lg:block lg:w-14 bg-dark2 add-transition-05 text-2xl"
        }
      >
        <div
          className={
            isUserMenuOpen
              ? "bg-gray-700 add-transition-05"
              : "bg-transparent add-transition-05"
          }
        >
          <div
            className="flex justify-start items-center  text-gray-300"
            onClick={() => {
              setIsUserMenuOpen(!isUserMenuOpen);
            }}
          >
            <div className="h-14">
              <img
                src={UserImg}
                className="w-10 h-10 m-2 bg-black rounded cursor-pointer"
                alt="user"
              />
            </div>
            {isSideBarOpen ? (
              <div className="truncate w-50 cursor-pointer">
                {user != null ? user.username : "User Not Found!"}
              </div>
            ) : (
              ""
            )}
          </div>
          <span className={isUserMenuOpen ? "" : "hidden"}>
            <div className="border-b-2 border-green-500">
              {user ? (
                <div onClick={handleLogout}>
                  <div className="pl-2 flex flex-row align-middle items-center w-full h-10 text-white hover:bg-gray-400 cursor-pointer">
                    <div className="w-10 h-10 flex flex-row items-center justify-center">
                      <FaSignOutAlt />
                    </div>
                    <span className={isSideBarOpen ? "ml-1 block" : "hidden"}>
                      Logout
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <Link to="login/">
                    <div className="pl-2 flex flex-row align-middle items-center w-full h-10 text-white hover:bg-gray-400">
                      <div className="w-10 h-10 flex flex-row items-center justify-center">
                        <FaUser />
                      </div>

                      <span className={isSideBarOpen ? "ml-1 block" : "hidden"}>
                        Login
                      </span>
                    </div>
                  </Link>
                  <Link to="register/">
                    <div className="pl-2 flex flex-row align-middle items-center w-full h-10 text-white hover:bg-gray-400">
                      <div className="w-10 h-10 flex flex-row items-center justify-center">
                        <FaUser />
                      </div>
                      <span className={isSideBarOpen ? "ml-1 block" : "hidden"}>
                        Register
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </span>
        </div>
        <div className="text-gray-300 text-sm">
          <div
            className={
              isSideBarOpen
                ? "px-4 text-sm text-white mt-2 w-full py-1 border-bottom-1 flex flex-row items-center justify-between"
                : "hidden text-sm"
            }
          >
            <span>Lists</span>
            <span className="hover:bg-gray-600 p-1 rounded" onClick={addNewList}>
              <FaPlus />
            </span>
          </div>
          {data.data.todoLists.map((list) => (
            <div
              className="flex flex-row align-middle items-center w-full h-8 hover:bg-gray-700 rounded p-2  cursor-pointer"
              title={list.title}
            >
              <div className="w-10 h-10 flex flex-row items-center justify-center">
                <FaList />
              </div>
              <span
                className={isSideBarOpen ? "ml-1 block truncate" : "hidden"}
              >
                {list.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-full">
        <div className="w-full flex flex-row h-14 bg-dark1">
          <button
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="  h-14 px-4  flex items-center justify-center text-xl text-white border-0 hover:border-yellow-50"
          >
            {isSideBarOpen ? (
              <svg
                width="25"
                height="20"
                viewBox="0 0 31 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="1" width="30" height="3" rx="1.5" fill="#9CA3AF" />
                <rect y="10" width="20" height="3" rx="1.5" fill="#9CA3AF" />
                <rect y="19" width="30" height="3" rx="1.5" fill="#9CA3AF" />
                <path
                  d="M26.703 5.32172L21.6261 10.8217C21.2725 11.2048 21.2725 11.7952 21.6261 12.1783L26.703 17.6783C26.8923 17.8834 27.1587 18 27.4378 18L27.716 18C28.5878 18 29.0421 16.9623 28.4508 16.3217L24.6261 12.1783C24.2725 11.7952 24.2725 11.2048 24.6261 10.8217L28.4508 6.67828C29.0421 6.03771 28.5878 5 27.716 5L27.4378 5C27.1587 5 26.8923 5.11664 26.703 5.32172Z"
                  fill="#9CA3AF"
                />
              </svg>
            ) : (
              <svg
                width="25"
                height="20"
                viewBox="0 0 31 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="1" width="30" height="3" rx="1.5" fill="#9CA3AF" />
                <rect y="10" width="20" height="3" rx="1.5" fill="#9CA3AF" />
                <rect y="19" width="30" height="3" rx="1.5" fill="#9CA3AF" />
                <path
                  d="M22.297 17.6783L27.3739 12.1783C27.7275 11.7952 27.7275 11.2048 27.3739 10.8217L22.297 5.32172C22.1077 5.11664 21.8413 5 21.5622 5H21.284C20.4122 5 19.9579 6.03771 20.5492 6.67828L24.3739 10.8217C24.7275 11.2048 24.7275 11.7952 24.3739 12.1783L20.5492 16.3217C19.9579 16.9623 20.4122 18 21.284 18H21.5622C21.8413 18 22.1077 17.8834 22.297 17.6783Z"
                  fill="#9CA3AF"
                />
              </svg>
            )}
          </button>
          <div className="h-14 flex flex-row items-center text-gray-400 text-xl w-full">
            <input
              type="text"
              className="bg-transparent border-0 outline-none list-title placeholder-gray-500"
              style={{ width: "75%" }}
              placeholder={
                currentlistTitle ? "" : "Click here to add List title"
              }
              onChange={(e) => setCurrentListTitle(e.target.value)}
              value={currentlistTitle ? currentlistTitle : ""}
            />
          </div>
        </div>
        <div className="w-full  flex">
          
          <div className=" text-gray-300    md:w-7/12 w-screen">
            <div class="flex flex-wrap items-stretch w-full p-2 mb-4  relative">
              <input
                type="text"
                class="flex-shrink flex-grow bg-transparent leading-normal w-px flex-1 border border-gray-500 h-10 border-grey-light rounded rounded-r-none px-3 relative focus:border-2 focus:border-indigo-500 outline-none"
                placeholder="Add task to List.."
              />
              <div class="flex -mr-px">
                <button className="flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-1-0  border-gray-500 px-3 whitespace-no-wrap text-grey-dark text-sm hover:bg-gray-700">
                  Add..
                </button>
              </div>
            </div>
            <div className=" mx-auto  h-80vh overflow-auto shadow">
            {isLoading ? (<Spinner />) : (<ul className="">
                {data.data.todoLists[0].todos.map(todo => (
                   <ListItem todo={todo} />
                ))}
              </ul>)}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
