import { useState } from "react";
import Logo from "../assets/img/LogoResized.png";
import { Link, useHistory  } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const history = useHistory();

  const handleLogin = () => {
    
    if (email && password) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email,
      password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      credentials: "include",
      body: raw,
      redirect: "follow",
    };
    fetch("http://192.168.8.109:8000/api/login/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.detail);
        switch (result.detail) {
          case 'success':
            localStorage.setItem("jwt", result.jwt);
            toast(`Login Successfully as ${email}`,{theme:'colored',type:'success'});
            history.push('/');
            break;
          case 'Incorrent password!' || 'User not found!' :
            toast(result.detail,{theme:'colored',type:'error'});
            break;
          default:
            toast(result.detail,{theme:'colored',type:'error'})
        }
        
      })

      .catch((error) => toast(error,{theme:"colored",type:'error'}));
    } else {
      toast('username or password fields are empty!',{type:'error',theme:'colored'})
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <section className="bg-gray-900">
      <div className="leftPanel w-1/2 h-screen float-left flex flex-col justify-center items-center">
        <h1 className="welcomeTxt">WELCOME</h1>
        <img className="authSideImg" src={Logo} alt="Login Authentication" />
        <div className="custom-shape-divider-bottom-1629894577">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
              className="shape-fill"
            />
          </svg>
        </div>
      </div>
      <div className="rightPanel">
        <form
          className="loginForm"
          action=""
          method="post"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2 className="loginFormH2">Log In</h2>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="txtInput"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="txtInput"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <a href="google" className="forgotlink">
            Forgot Password?
          </a>
          <input className="btnLogin" type="submit" value="Login" />
        </form>
        <p className="haveacclbl text-gray-400">
          Need an account?
          <Link to="/register" className="reglink">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
