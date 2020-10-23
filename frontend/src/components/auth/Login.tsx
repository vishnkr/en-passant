import React from 'react';
import './auth.css'
import NavBar from "../landing/NavBar";

const Login: React.FC = () => {
    return (
        <div className="login-container">
            <NavBar />
            <div className="container">
                <div className="login-card">
                    <div className="card-header">
                        <h2>Log in to your account</h2>
                    </div>
                    <div className="card-entry">
                        <h6>Username</h6>
                        <input className="entry" type="text" placeholder="Username"></input>
                    </div>
                    <div className="card-entry">
                        <h6>Password</h6>
                        <input className="entry" type="password" placeholder="Password"></input>
                    </div>
                    <div>
                        <button className="btn btn-success button-custom">Login</button>
                    </div>
                </div>
            </div>
            
        </div>

    );
}

export default Login