<script>
  import SideBar from "./Components/SideBar.svelte";
  import ThemeToggler from "./Components/ThemeToggler.svelte";
  import LoginPage from "./Pages/LoginPage.svelte";
  import RegisterPage from "./Pages/RegisterPage.svelte";
  import Register from "./Pages/RegisterPage.svelte";
  export let darktheme;
  import { Router, Route, Link } from "svelte-navigator";
  import Dashbord from "./Pages/Dashbord.svelte";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // var jwt = getCookie("jwt");
  var jwt = localStorage.getItem('jwt');
  console.log('local Token :>',jwt);
  // console.log("jwt token :>", getCookie("jwt"));
  var raw = JSON.stringify({
    jwt,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:8000/api/user/", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      localStorage.setItem("user", result);
    })
    .catch((error) => console.log("error", error));

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
</script>

<div class="w-full h-full {darktheme ? 'bg-defaultDark' : 'bg-gray-100'} ">
  <Router>
    <Route path="/">
      <Dashbord />
    </Route>
    <Route path="login/">
      <LoginPage />
    </Route>
    <Route path="register/">
      <RegisterPage />
    </Route>
  </Router>
  <!-- <ThemeToggler /> -->
</div>
-

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .bg-defaultDark {
    background-color: #1a1730;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
