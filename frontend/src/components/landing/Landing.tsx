import React from 'react';
import NavBar from './NavBar'
import './landing.css';

const Landing: React.FC = () => {
    return (
        <div className ="landing">
            <NavBar />
            <div className="container landing-body">
                <h1 className = "title">Play chess with friends from around the world with a live video chat </h1>
            </div>
        </div>
    );
};

export default Landing;