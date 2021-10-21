import { useContext } from "react";
import { toast } from "react-toastify";
import { userContext } from "../Context/UserContext";

const Context = useContext(userContext);

export const getBackendData = () => {
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
          case "success":
            Context.setData(resultObj.data);

          default:
            break;
        }
      });
  };

export const setBackendData = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      jwt: localStorage.jwt,
      userdata: Context.headersdata,
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
          case "success":
            console.log(resultObj.message);
          default:
            break;
        }
      });
  }; 