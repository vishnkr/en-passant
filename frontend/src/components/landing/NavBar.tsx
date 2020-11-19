import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import './navbar.css';
import { Dropdown,Menu} from 'semantic-ui-react'

interface Props{
    isSignedIn: boolean;
    userName?: string;
}

interface Profileprops{
    username:string
}

const ProfileComponent : React.FC<Profileprops>= (props:Profileprops)=>{
    const [showMenu, setShowMenu] = useState(false);
    const Options = [{key:"Settings" , value:"Settings" , text:"Settings"},{key:"Log out" , value:"Log out" , text:"Log out"}];
    return(
        <div className="profile">
                 <Menu compact>
                    <Dropdown text={props.username} options={Options} simple item />
                </Menu>
        </div>
    )
}
const renderNavItems = (isSignedIn:boolean,userName:string) => {
    if (!isSignedIn) { 
        return (<div className='navbar_nav-items'>
                 <ul>
                 <li className="nav-link"><Link to="/login" ><button className="btn btn-success" type="submit">Log In</button> </Link></li>
                 <li className="nav-link"><Link to="/signup" ><button className="btn btn-success" type="submit">Sign Up</button> </Link></li>
                 </ul>
                </div>)}
    else{ 
        return <div className='navbar_nav-items'>
                <ProfileComponent username={userName} />
               </div>}
}

const NavBar: React.FC <Props>= (props:Props)=> {
        return (
            <header className='navbar'>
                <nav className='navbar_navigation'>
                    <div />
                    <div className='navbar_logo'>
                        <Link to="/" >En-Passant</Link>
                    </div>
                    <div className='space-gap' />
                    {renderNavItems(props.isSignedIn,props.userName? props.userName: "")}   
                </nav>
                
            </header>
        );
}

export default NavBar;