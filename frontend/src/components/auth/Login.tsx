import React from 'react';
import './auth.css'
import NavBar from "../landing/NavBar";

const Login: React.FC = () => {
    return (
        <div className="login-container">
            <NavBar isSignedIn={false} />
            <div className="container container-auth">
                <div className="login-card">
                    <div className="card-header">
                        <h2>Log in to your account</h2>
                    </div>
                    <div className="card-entry">
                        <div><h6 className="field-text">Username</h6></div>
                        <input className="entry" type="text" placeholder="Username"></input>
                    </div>
                    
                    <div className="card-entry">
                        <div><h6 className="field-text">Password</h6></div>
                        <input className="entry" type="password" placeholder="Password"></input>
                    </div>
                    <div className="button-container">
                        <button className="btn btn-success button-custom">Login</button>
                    </div>
                </div>
            </div>
            
        </div>

    );
}

export default Login