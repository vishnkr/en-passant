import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Game from "./components/game/Game";
import Landing from "./components/landing/Landing";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

function App() {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" component={withRouter(Landing)} />
                <Route exact path="/login" component={withRouter(Login)} />
                <Route exact path="/signup" component={withRouter(SignUp)} />
            </div>
        </Router>
    );
}

export default App;
