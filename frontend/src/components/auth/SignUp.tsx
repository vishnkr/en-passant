import React,{useState,useEffect} from 'react';
import './auth.css'
import {useHistory} from 'react-router-dom';
import NavBar from "../landing/NavBar";
import axios, { AxiosStatic } from "axios";

function Alert(props:any) {
  const error = props.isError;
  if (error) {
      return (<div className="alert alert-warning" role="alert">
          This is a warning alert—check it out!
      </div>);
  }
    return null;
}


const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState(false);
    const[isMounted,setMountStatus] = useState(false);

    
    const history = useHistory();

    useEffect(() => {
        setMountStatus(true);
        return () => setMountStatus(false);
     }, [])
     

    const isValidEmail = function (): boolean{
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        console.log("email valid?",re.test(String(email).toLowerCase()));
        return re.test(String(email).toLowerCase());
    } 

    const isvalidPassword = function (): boolean{
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        console.log("password valid?",re.test(String(password)));
        return true;
        //return re.test(String(password));
    }

    //const isUniqueUsername = function (): boolean {
        //get request for username, if match prompt re enter fields
    //}

    const handleSubmit = async (e: React.FormEvent ) => {
        e.preventDefault();
        const submitForm = isValidEmail() && isvalidPassword(); //&& isUniqueUsername();
        if (submitForm && isMounted) {
            const submitData : string = JSON.stringify({Username: username, Password: password, Email: email})
            const postStatus: AxiosStatic  = await axios.post("http://localhost:8080/users/add",submitData);
            console.log(postStatus);
            history.push('/');
            setAlert(true);
        }
        else { setAlert(false); }
        
    }
 
    return (
        <div className="signup-container">
            <Alert isError={alert} />
            <div className="container container-auth">
                <form onSubmit={handleSubmit}>
                <div className="signup-card">
                    <div className="card-header">
                        <h2>Sign Up for an account</h2>
                    </div>
                    <div className="card-entry">
                        <div><h6 className="field-text">Username</h6></div>
                        <input onChange={(e)=>{setUsername(e.target.value)}} className="entry" type="text" placeholder="Username"></input>
                    </div>
                    <div className="card-entry">
                        <div><h6 className="field-text">Email</h6></div>
                        <input onChange={(e)=>{setEmail(e.target.value)}} className="entry" type="text" placeholder="Email"></input>
                    </div>
                    <div className="card-entry">
                        <div><h6 className="field-text">Password</h6></div>
                        <input onChange={(e)=>{setPassword(e.target.value)}} className="entry" type="password" placeholder="Password"></input>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn btn-success button-custom">Create Account</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;