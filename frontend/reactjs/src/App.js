import "./App.css";
import Spinner from "./Components/Spinner";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {useState } from "react";
import {userContext } from './Context/UserContext';
import PageNotFound from "./Pages/PageNotFound";

function App() {
  const [user, setUser] = useState(null);


  

  return (
    <Router>
      <userContext.Provider value={{user,setUser}} >
      <div className="w-full h-full bg-defaultDark">
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/spinner" component={Spinner} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </div>
      </userContext.Provider>
    </Router>
  );
}

export default App;
