import './App.css';
import Spinner from './Components/Spinner';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <Router>
    <div className="w-full h-screen bg-defaultDark">
      
        <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={Register} />
        </Switch>
      
    </div>
    </Router>
  );
}

export default App;
