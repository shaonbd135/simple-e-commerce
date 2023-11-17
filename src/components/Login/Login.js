import React, { useContext, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import firebaseConfig from './firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';


//  web app's Firebase configuration
const app = initializeApp(firebaseConfig);

//user state for login 
const Login = () => {
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({

        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
    });

    //context API for login

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    const navigate = useNavigate();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: '/' } };



    //google provider

    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    //sign in with google handler

    const signInHandler = () => {
        signInWithPopup(auth, provider)
            .then((result) => {

                const { displayName, email, photoURL, } = result.user;

                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
            })

            //error Handler

            .catch((error) => {
                console.log(error);
                console.log(error.message);
            })
    }

    //sign out handler
    const signOutHandler = () => {
        auth.signOut()
            .then((res) => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                }
                setUser(signedOutUser);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //change handler
    const handleChange = (event) => {

        let isFormValid = true;

        //Email and password validation

        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 7;
            const isPasswordHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && isPasswordHasNumber;
        }

        //if form is valid then set user info

        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    //submit handler
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {

            //create user with email and password on firebase
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    // Signed up 
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch((error) => {

                    // Handle Errors here.
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }


        //sign in with email and password

        if (!newUser && user.email && user.password) {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    //set name in state for use context
                    setLoggedInUser(newUserInfo);


                    navigate(from, { replace: true });


                    console.log('sign in user info', res.user);
                })
                .catch((error) => {
                    // Handle Errors here.
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }

        //prevent default reloading for submit
        event.preventDefault();
    }

    const errorMessage = <p>Email already in use</p>


    //update user name and profile
    const updateUserName = (name) => {

        const auth = getAuth();
        updateProfile(auth.currentUser, {
            //display name is for user profile in firebase
            displayName: name,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
            console.log('Name updated');
        }).catch((error) => {
            console.log(error);
        });
    }



    return (
        <div style={{ textAlign: 'center', margin: '100px' }}>
            {user.isSignedIn ? <button style={{ padding: '10px' }} onClick={signOutHandler}>Sign out</button> :
                <button style={{ padding: '10px' }} onClick={signInHandler}>Sign in with Google</button>
            }

            <button style={{ marginLeft: '10px', padding: '10px' }} >Sign in with Facebook</button>


            {/* if user is signed in with google then show user info*/}
            {/* {user.isSignedIn && <div>
                <p>Welcome {user.name}</p>
                <p>Your email: {user.email}</p>
                <img src={user.photo} alt="" />
            </div>
            } */}

            {/* Sign in with Email */}

            <h3>Sign in with Email </h3>

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign Up</label>

            <form onSubmit={handleSubmit}>

                {newUser && <input type="text" name='name' onBlur={handleChange} placeholder='Name' required />}

                <br /> <br />
                <input type="text" name='email' onBlur={handleChange} placeholder='Email' required />

                <br /> <br />

                <input type="password" name='password' onBlur={handleChange} placeholder='Password' required />

                <br /> <br />

                <input type="submit" onClick={handleSubmit} value={`Sign${newUser ? ' Up' : ' In'}`} />
            </form>

            {/* error message*/}
            <p style={{ color: 'red' }}>{user.error === 'Firebase: Error (auth/email-already-in-use).' ? errorMessage : user.error}</p>

            {/* success message*/}
            {
                user.success && <p style={{ color: 'green' }}> User{newUser ? ' created' : ' logged in'} successfully</p>
            }
        </div>
    );
};

export default Login;