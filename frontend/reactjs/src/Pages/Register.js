import { useState } from "react";
import Logo from "../assets/img/LogoResized.png";

function Register() {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleRegister = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username,
      email,
      password,

    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/api/register/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => {
        console.log("error", error);

      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <section className="">
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
          <h2 className="loginFormH2">Register</h2>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="txtInput"
            type="text"
            name="email"
            id="email"
            placeholder="Username"
          />
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
          Already have an account?
          <a href="#google" className="reglink">
            Register
          </a>
        </p>
      </div>
    </section>
  );
}

export default Register;
