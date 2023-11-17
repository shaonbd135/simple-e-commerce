import React, { Children, useContext } from 'react';
import { UserContext } from '../../App';
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
   
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    if (!loggedInUser.email) {
        return <Navigate to="/login" state={{ from: '/shipment' }} replace />;
      }
    
      return children;

    
    
    
};

export default PrivateRoute;