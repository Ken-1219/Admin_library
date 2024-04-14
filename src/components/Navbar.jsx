import React, { useEffect, useState } from 'react'
import '../styles/navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';


function Navbar() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/signup')
            }

        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            setUser(null);
            navigate('/login');
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    }


    return (
        <nav className="navbar">
            {!user && (
                <ul>

                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            )}
            {user && (
                <ul>

                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li className='logout' onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            )}
        </nav>
    )
}

export default Navbar