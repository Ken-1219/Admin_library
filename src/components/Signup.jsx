import React, { useState } from 'react';
import image from '../assets/library2.jpg'
import { Link, useNavigate } from "react-router-dom";
import '../styles/signup.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

function Signup() {
    console.log("in the signup component");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);


    const navigate = useNavigate();


    const checkError = (err) => {
        if (!email) {
            setEmailError(true);
            setError('Email is required.')
            return;
        }
        else {
            setEmailError(false);
        }


        if (!password) {
            setPasswordError(true);
            setError('Password is required.')
            return;
        }
        else {
            setPasswordError(false);
        }

        const errorCode = err.code;
        let errorMessage = err.message;

        switch (errorCode) {
            case 'auth/invalid-email':
                setEmailError(true);
                errorMessage = 'Invalid email address.';
                break;
            case 'auth/email-already-in-use':
                setEmailError(true);
                errorMessage = 'Email address is already in use.';
                break;
            case 'auth/weak-password':
                setPasswordError(true);
                errorMessage = 'Weak password. Choose a stronger one.';
                break;
            default:
                errorMessage = 'An error occurred. Please try again.';
        }
        setError(errorMessage);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredentials.user;
            if (user) {
                navigate('/');
            }
        }
        catch (err) {
            checkError(err);
        }
    }



    return (
        <div className='main_signup'>
            <img className="bg_image" src={image} alt='backImage'>
            </img>
            <div className="form_container">
                <form className="signup" noValidate onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <h3>Welcome to Our Library</h3>
                    <label>Email: </label>
                    <input
                        placeholder='Enter your email'
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        id={emailError ? 'emailError' : ''}
                    />
                    <label>Password: </label>
                    <input
                        placeholder='Enter your password'
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        id={passwordError ? 'passwordError' : ''}
                    />
                    <button className='btn'>SignUp</button>
                    {error && <div className='error'>{error}</div>}
                    <p className='redirect-to-login'>Already have an account? <Link to='/login'>Login here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup
