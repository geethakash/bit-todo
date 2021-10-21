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
import SideBar from "../Components/SideBar";
import UserProfile from "../Components/UserProfile";
import TodoLists from "../Components/TodoLists";
import OtherLists from "../Components/OtherLists";

function Dashboard() {
  const [user, setUser] = useState(null);
  const Context = useContext(userContext);
  const [selectedPanel, setSelectedPanel] = useState("todos");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [data, setData] = useState({
    data: {
      todoLists: [
        {
          title: "2021.02.21 - Monday - Week 01 day 01",
          uid: v4(),
          dnt: new Date().toLocaleString() + "",
          todos: [
            {
              title: "create django project with react",
              uid: v4(),
              desc: "something do deffrent",
              category: "programming",
              dnt: new Date().toISOString().slice(0, 10),
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
      otherLists: [
        {
          title: "Movie List",
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
    Context.setUser(user);
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
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
        .catch((error) => {
          // toast(`${error.message}`,{type:'error',theme:'colored'})
          console.log("error", error);
        });
    } else {
      history.push("/login");
    }
    setIsLoading(false);

    setTimeout(() => {
      setBackendData();
    }, 3000);
    getBackendData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log("updating");
    }, 3000);
  }, []);

  const getBackendData = () => {
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

    fetch("http://192.168.8.109:8000/data/getdata/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // localStorage.setItem('user',result)
        let resultObj = JSON.parse(result);
        switch (resultObj.detail) {
          case "no token found!" || "Session Expired!":
            toast("Something wents wrong!\nPlease login again.", {
              type: "error",
              theme: "colored",
            });
            history.push("/login");
          case "success":
            setData(resultObj.data);

          default:
            break;
        }
      });
  };

  const setBackendData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      jwt: localStorage.jwt,
      userdata: data,
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
            toast("Something wents wrong!\nPlease login again.", {
              type: "error",
              theme: "colored",
            });
            history.push("/login");
          case "success":
            console.log(resultObj.message);
          default:
            break;
        }
      });
  };

  const addNewList = () => {
    setData({ data: { todoLists: [...data.data.todoLists, ""] } });
  };
  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <SideBar
          selectedPanel={selectedPanel}
          setSelectedPanel={setSelectedPanel}
        />
        <div
          className=" w-full md:w-2/6 h-screen bg-gray-900 border-r border-gray-700 text-white overflow-auto"
          style={{ minWidth: "300px" }}
        >
          {selectedPanel === "user" ? (
            <UserProfile />
          ) : selectedPanel === "todos" ? (
            <TodoLists data={data} />
          ) : selectedPanel === "lists" ? (
            <OtherLists data={data} />
          ) : (
            ""
          )}
        </div>
        <div class="resizer" id="dragMe"></div>
        <div></div>
      </div>
    </>
  );
}

export default Dashboard;
