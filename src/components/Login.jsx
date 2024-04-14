import React, { useState } from 'react';
import image from '../assets/library2.jpg'
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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
        console.log(err.message);

        switch (errorCode) {
            case 'auth/invalid-email':
                setEmailError(true);
                errorMessage = 'Invalid email address.';
                break;
            case 'auth/invalid-credential':
                setEmailError(true);
                setPasswordError(true);
                errorMessage = 'Incorrect Email or Password. Try Again!';
                break;
            default:
                errorMessage = 'An error occurred. Please try again.';
        }
        setError(errorMessage);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
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
        <div className='main_login'>
            <img className="bg_image" src={image} alt='backImage'>
            </img>
            <div className="form_container">
                <form className="login" noValidate onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <h3>Welcome Back</h3>
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
                    <button className='btn'>Login</button>
                    {error && <div className='error'>{error}</div>}
                    <p className='redirect-to-signup'>Don't have an account? <Link to='/signup'>Signup here</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login
