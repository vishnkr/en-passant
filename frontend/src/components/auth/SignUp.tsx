import React from 'react';
import './auth.css'
import NavBar from "../landing/NavBar";

const SignUp: React.FC = () => {
    return (
        <div className="signup-container">
            <NavBar />
            <div className="container">
                <div className="signup-card">
                    <div className="card-header">
                        <h2>Sign Up for an account</h2>
                    </div>
                    <div className="card-entry">
                        <h6>Username</h6>
                        <input className="entry" type="text" placeholder="Username"></input>
                    </div>
                    <div className="card-entry">
                        <h6>Email</h6>
                        <input className="entry" type="text" placeholder="Email"></input>
                    </div>
                    <div className="card-entry">
                        <h6>Password</h6>
                        <input className="entry" type="password" placeholder="Password"></input>
                    </div>
                    <div>
                        <button className="btn btn-success button-custom">Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;