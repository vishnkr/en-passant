import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import Game from "./components/game/Game";
import Landing from "./components/landing/Landing";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
    const [userLoggedIn,setUserLogin] = useState(false);
    const [userName,setUsername] = useState('');

    function handleCallback(username:string){
        setUsername(username);
        setUserLogin(true);
    }

    return (
        <Router>
            <div className="App">
                <Route exact path="/" component={withRouter(Landing)} />
                <Route exact path="/login" render={()=> <Login loggedIn={userLoggedIn} logInCallback={handleCallback}/>} />
                <Route exact path="/signup" component={withRouter(SignUp)} />
                <Route exact path="/dashboard" render={()=> <Dashboard isLoggedIn={userLoggedIn} userName={userName}  />} />
                <Route exact path="/game" component={withRouter(Game)} />
            </div>
        </Router>
    );
}

export default App;
