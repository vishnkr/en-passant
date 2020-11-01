import React,{ useState,useEffect } from 'react';
import NavBar from './NavBar'
import './landing.css';
import axios, { AxiosResponse } from 'axios';

async function loadBackend(): Promise<AxiosResponse<any>> {
    const promise = await axios.get('http://localhost:8000/login/',
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                
            }
        });
       
    console.log("response", promise);
    console.log(promise.data.data);
    return promise.data.data;
  }
const Landing: React.FC = () => {
    const [status, setStatus] = useState("loading");
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const value = loadBackend();
        
    })
    
    return (
        <div className ="landing">
            <NavBar isSignedIn={isSignedIn} />
            <div className="container landing-body">
                <h1 className="title">Play chess with friends from around the world with a live video chat - status : {status} </h1>
            </div>
        </div>
    );
};

export default Landing;