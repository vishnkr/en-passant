import React,{useState,useEffect} from 'react';
import './dashboard.css'
//import axios from "axios";
import NavBar from "../landing/NavBar";
import {useHistory} from 'react-router-dom';
import Chart from "./Chart"
import { Dropdown } from 'semantic-ui-react'

interface Props{
    isLoggedIn : boolean;
    userName?: string;
}
const Dashboard: React.FC<Props> = (props:Props) =>{
    const [isLoggedIn,setLoggedIn] = useState(props.isLoggedIn);
    const [userName,setUsername] = useState(props.userName);
    const [roomID, setRoomID] = useState('');
    const [gameType,setGameType] = useState('create');
    const GameModes = [{key:"Standard",value:"Standard",text:"Standard"},{key:"King of Hill (in progress)" , value:"King of Hill (in progress)" , text:"King of Hill (in progress)"},{key:"Antichess (in progress)" , value:"Antichess (in progress)" , text:"Antichess (in progress)"},{key: "4-Player Chess (in progress)", value:"4-Player Chess (in progress)" , text:"4-Player Chess (in progress)"}];

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("loginStatus");
        if (loggedInUser==='1'){
            const username: string | null = localStorage.getItem('username')
            setLoggedIn(true);
            setUsername(username? username: '');
        }

    },[]);
    const history = useHistory();

    const handleSubmit = async (e: React.FormEvent ) => {
        if(gameType=="create"){
            history.push('/game');
        }
    }
    return (
        <div className="dashboard-container">
            <NavBar isSignedIn={isLoggedIn} userName={userName} />
            <div className="dashboard">
            {!isLoggedIn ? 
            <div> You do not have access to this page, head over to login page or sign up for an account </div> :
            <>
                <div className="charts">
                    <div className="chart-container">
                        <h3 className="chart-text">Player Statistics</h3>
                        <Chart />
                    </div>
                    
                </div>
                <div className="container start-game-container">
                    <form onSubmit={handleSubmit}>
                        <div className="options-card">
                            <div className="card-header">
                                <h2>Play</h2>
                            </div>
                            <div className="join-room">
                                <h5 className="card-option">Join Room</h5>
                                    <div className="entry-container">
                                        <input onChange={(e)=>{setRoomID(e.target.value)}} className="entry-join" maxLength={6} type="text" placeholder="Room Code"></input>
                                        <button type="submit" onClick={(e)=>{setGameType('join')}} className="btn btn-success button-custom">Join Room</button>
                                    </div>
                                    
                            </div>
                            <h6 className="line"><span>OR</span></h6>
                            <h5 className="card-option">Create Room</h5>
                            <div className="create-room">
                                <div className="card-entry">
                                    <span><h4 className="field-text">Side</h4></span>
                                        <button className="color-picker black"> Black </button>
                                        <button className="color-picker white"> White </button>
                                </div>
                                <div className="card-entry">
                                    <span><h4 className="field-text">Game mode</h4></span>
                                    <Dropdown className="drop-custom"
                                        placeholder='Choose opponent type'
                                        selection
                                        options={GameModes}
                                    />
                                </div>
                                <div className="card-entry">
                                    <span><h4 className="field-text">Opponent</h4></span>
                                    <Dropdown className="drop-custom"
                                        placeholder='Select Game Mode'
                                        selection
                                        options={[{key:"Standard",value:"Player",text:"Another Player"},{key:"Computer" , value:"Computer", text:"Computer"}]}
                                    />
                                </div>
                                <div className="card-entry">
                                    <span><h4 className="field-text button-color">Time</h4></span>
                                        <button className="color-picker"> 5 min </button>
                                        <button className="color-picker"> 10 min </button>
                                        <button className="color-picker"> 30 min </button>
                                        <button className="color-picker"> 1 hr </button>
                                        <button className="color-picker"> Unlimited </button>
                                       
                                </div>
                                <div className="button-container">
                                    <button type="submit" className="btn btn-success button-custom">Start</button>
                                </div>
                            </div>
                            </div>
                        </form>
                    </div>
                </>
                }
            </div>
        </div>
    );

}

export default Dashboard;