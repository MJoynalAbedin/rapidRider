import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';
import Google from '../../images/google-logo.png'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const Login = () => {

    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignedIn: '',
        email: '',
        photo: '',
        password: '',
        name: ''
    });

    const handleGoogleSignIn = () => {

        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then(res => {

                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    photo: photoURL,
                    email: email
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((err) => {
                console.log(err, err.message)
            });
    }


    const handleGoogleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    photo: '',
                    email: '',
                    error: '',
                    success: false
                }
                setUser(signedOutUser);
            }).catch(err => {
                console.log(err);
            })
    }

    const handleChange = (e) => {

        let isFormValid = true;

        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === 'password') {
            const isPassValid = e.target.value.length > 6;
            const hasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPassValid && hasNumber;
        }

        if (isFormValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    }

    const handleFormSubmit = (e) => {

        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = { ...user };
                    newUser.error = '';
                    newUser.success = true;
                    setUser(newUser);
                    setLoggedInUser(newUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    newUser.success = false;
                    setUser(newUser);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUser = { ...user };
                    newUser.error = '';
                    newUser.success = true;
                    setUser(newUser);
                    setLoggedInUser(newUser);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.success = false;
                    newUser.error = error.message;
                    setUser(newUser);
                });
        }
        e.preventDefault();
    }


    return (
        <div className="whole-login-page d-flex align-items-center justify-content-center">

            <div>
                <div className="login-form">
                    <form className="" onSubmit={handleFormSubmit}>
                        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" /> <br />
                        <label htmlFor="newUser"><b>TIK TO SIGN UP</b></label>
                        <br />
                        {newUser && <input type="name" name="name" onBlur={handleChange} placeholder="Your Name" id="" required />}
                        <br />
                        <input type="email" onBlur={handleChange} name="email" placeholder="Your Email" id="" required />
                        <br />
                        <input type="password" onBlur={handleChange} name="password" placeholder="Your Password" id="" required />
                        <br />
                        {newUser && <input type="password" onBlur={handleChange} name="password" placeholder="Retype Password" id="" required />}
                        <input className="btn-formSubmit" type="submit" value={newUser ? "Create Account" : "Sign In"} />
                    </form>
                </div>
                <p style={{ color: 'red' }}>{user.error}</p>
                {
                    user.success && <p style={{ color: 'green' }}>Successfully {newUser ? 'created' : 'Logged In'}!</p>
                }

                <div className="text-center">
                    {
                        user.isSignedIn ? <button className="google-btn" onClick={handleGoogleSignOut}>Sign Out</button> : <button className="google-btn" onClick={handleGoogleSignIn}><img src={Google} alt=""/> Sign in with google</button>
                    }
                </div>

            </div>
        </div>
    );
};

export default Login;