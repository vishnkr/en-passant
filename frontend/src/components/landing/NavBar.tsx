import React from 'react';
import {Link} from "react-router-dom";
import './navbar.css';

const NavBar: React.FC = () => {
    return (
        <header className='navbar'>
            
                <nav className='navbar_navigation'>
                    <div />
                    <div className='navbar_logo'>
                        <Link to="/" >En-Passant</Link>
                    </div>
                    <div className='space-gap' />
                    <div className='navbar_nav-items'>
                        <ul>
                            <li className="nav-link"><Link to="/login" ><button className="btn btn-success" type="submit">Log In</button> </Link></li>
                            <li className="nav-link"><Link to="/signup" ><button className="btn btn-success" type="submit">Sign Up</button> </Link></li>
                        </ul>
                    </div>
                </nav>
                
            </header>
    );
}

export default NavBar;