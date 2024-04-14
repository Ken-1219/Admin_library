import React from 'react';
import Main from './components/Main';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import './App.css'
import Edit from './components/Edit';

function App() {
    return (
        <div className='App'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/edit/:id' element={<Edit/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
