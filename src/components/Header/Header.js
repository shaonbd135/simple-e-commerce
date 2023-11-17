import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <Link to="/profile">My Profile</Link>
                {loggedInUser.email ? <button className='main-button' onClick={() => setLoggedInUser({})}>Sign Out</button> : <Link to="/login" className='main-button'>Login</Link>}
            </nav>
        </div>
    );
};

export default Header;