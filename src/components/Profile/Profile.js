import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';

const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'green' }}>Your Profile Details</h3>
            {loggedInUser.email ? <p>Email: {loggedInUser.email}</p> : <p><Link to="/login" state={{ from: '/profile' }} style={{ textDecoration: 'none', color: 'red' }}>Please Login First</Link></p>}

            <br />
        </div>
    );
};

export default Profile;