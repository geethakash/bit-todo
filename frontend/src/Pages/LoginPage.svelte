<script>
  var email;
  var password;

  let handleLogin = () =>{var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email,
    password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:8000/api/login/", requestOptions)
    .then((response) =>{ 
      response.json();
      console.log(response);
    })
    .then((result) => {
      console.log('result',result)
      document.cookie =`jwt = ${result.jwt}`;
      // localStorage.setItem('jwt',result.jwt)
      
    })
    .catch((error) => console.log("error", error));}
</script>

<header />
<section class="">
  <div
    class="leftPanel w-1/2 h-screen float-left flex flex-col justify-center items-center"
  >
    <h1 class="welcomeTxt">WELCOME</h1>
    <img
      class="authSideImg"
      src="./assets/img/LogoResized.png"
      alt="Login Authentication"
    />
    <div class="custom-shape-divider-bottom-1629894577">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
          class="shape-fill"
        />
      </svg>
    </div>
  </div>
  <div class="rightPanel">
    <form class="loginForm" action="" method="post" on:submit|preventDefault={handleLogin} autocomplete="off">
      <h2 class="loginFormH2">Log In</h2>
      <input
        bind:value={email}
        class="txtInput"
        type="text"
        name="email"
        id="email"
        placeholder="Email"
      />
      <input
      bind:value={password}
        class="txtInput"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
      />
      <a href="google" class="forgotlink">Forgot Password?</a>
      <input class="btnLogin" type="submit" value="Login" />
    </form>
    <p class="haveacclbl text-gray-400">
      Need an account?<a href="#google" class="reglink">Register</a>
    </p>
  </div>
</section>

<style>
  .leftPanel {
    background-color: #2a2e35ab;
    /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
  }

  .rightPanel {
    float: right;
    width: 50%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .welcomeTxt {
    color: white;
    margin-top: -130px;
    font-size: 50px;
    letter-spacing: 20px;
  }

  .authSideImg {
    width: 50%;
  }

  /*css for form*/
  .loginForm {
    padding: 0px 30px 30px 30px;
    background-color: #2a2e35;
    color: white;
    border-radius: 5px;
    width: 50%;
    height: 50vh;
    /* margin: 10px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loginFormH2 {
    text-align: center;
    margin-top: 0px;
    font-size: 35px;
  }

  .txtInput {
    font-family: inherit;
    width: 90%;
    height: 25px;
    margin: 10px 0px;
    padding-right: 10px;
    font-size: 0.8rem;
    color: white;
    background-color: rgba(255, 255, 255, 0);
    border: 0px;
    border-bottom: 2px solid #7d2dc9;
    transition: 0.5s;
    text-align: right;
  }

  .txtInput:focus {
    border-bottom: 2px solid #11998e;
    outline: none;
  }

  .txtInput:focus :placeholder-shown {
    display: none;
  }

  .btnLogin {
    color: white;
    width: 80%;
    height: 40px;
    margin-top: 20px;
    font-family: inherit;
    font-size: 1rem;
    background-color: #8d26ed;
    border: 0;
    float: right;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.5s;
  }

  .btnLogin:hover {
    background-color: #11998e;
  }

  .forgotlink {
    width: 100%;
    font-size: 10px;
    text-decoration: none;
    margin-top: -5px;
    padding-right: 30px;
    color: white;
    text-align: right;
  }
  .forgotlink:hover {
    text-decoration: underline;
  }

  .haveacclbl {
    font-size: 15px;
  }

  .reglink {
    color: #11998e;
  }

  /*for bottom svg*/
  .custom-shape-divider-bottom-1629894577 {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: -15px;
    width: 50%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-bottom-1629894577 svg {
    position: relative;
    display: block;
    width: calc(168% + 1.3px);
    height: 500px;
  }

  .custom-shape-divider-bottom-1629894577 .shape-fill {
    fill: #7d2dc9;
  }

  /** For tablet devices **/
  @media (min-width: 768px) and (max-width: 1023px) {
    .custom-shape-divider-bottom-1629894577 svg {
      width: calc(160% + 1.3px);
      height: 306px;
    }
  }

  /** For mobile devices **/
  @media (max-width: 767px) {
    .custom-shape-divider-bottom-1629894577 svg {
      width: calc(252% + 1.3px);
      height: 500px;
    }
  }
  @media only screen and (max-width: 800px) {
    .leftPanel {
      display: none;
    }

    .rightPanel {
      width: 100%;
    }

    .loginForm {
      padding-top: 5px;
      width: 75%;
      height: 300px;
    }
  }

  @media screen and (min-width: 1900px) {
    .txtInput {
      margin-bottom: 20px;
    }

    .loginForm {
      height: 40%;
    }

    .btnLogin {
      height: 50px;
    }
  }
</style>
