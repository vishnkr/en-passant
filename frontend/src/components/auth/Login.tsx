import React,{useState,useEffect} from 'react';
import './auth.css'
import axios, { AxiosStatic } from "axios";
import NavBar from "../landing/NavBar";
import {useHistory} from 'react-router-dom';

const Login: React.FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(false);
    const[isMounted,setMountStatus] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        setMountStatus(true);
        return () => setMountStatus(false);
     }, [])
     
     if(!isMounted) {
       return null;
     }

    const handleSubmit = async (e: React.FormEvent ) => {
        e.preventDefault();
        if ( isMounted) {
            const submitData : string = JSON.stringify({Username: username, Password: password})
            const postStatus: AxiosStatic  = await axios.post("http://localhost:8080/login/",submitData);
            console.log(postStatus);
            history.push('/dashboard');
            setAlert(true);
        }
        else { setAlert(false); }
        
    }

    return (
        <div className="login-container">
            <NavBar isSignedIn={false} />
            <div className="container container-auth">
                <form onSubmit={handleSubmit}>
                    <div className="login-card">
                        <div className="card-header">
                            <h2>Log in to your account</h2>
                        </div>
                        <div className="card-entry">
                            <div><h6 className="field-text">Username</h6></div>
                            <input onChange={(e)=>{setUsername(e.target.value)}} className="entry" type="text" placeholder="Username"></input>
                        </div>
                        
                        <div className="card-entry">
                            <div><h6 className="field-text">Password</h6></div>
                            <input onChange={(e)=>{setPassword(e.target.value)}} className="entry" type="password" placeholder="Password"></input>
                        </div>
                        <div className="button-container">
                            <button type="submit" className="btn btn-success button-custom">Login</button>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>

    );
}

export default Login