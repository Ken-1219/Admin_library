import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from "react-router-dom";
import '../styles/Main.css';

function Main() {
    const navigate = useNavigate();

    const [members, setMembers] = useState([]);
    const [user, setUser] = useState(null);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/login')
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAndDisplayData = async () => {
        try {
            const response = await axios.get('https://sheetdb.io/api/v1/qm7akdpxhif0w');
            setMembers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };


    const renderUserData = () => {
        return (
            <div className="user-data">
                <h2 className='table-title'>Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Books Issued</th>
                            <th>Books Returned</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members
                            .filter(member => member.Flag === 'TRUE')
                            .map(member => (
                                <tr key={member.Id}>
                                    <td>{member.Id}</td>
                                    <td>{member.Name}</td>
                                    <td>{member.Email}</td>
                                    <td>
                                        {member.BooksIssued}
                                    </td>

                                    <td>
                                        {member.BooksReturned}
                                    </td>

                                    <td>
                                        <button onClick={() => handleEdit(member.Id)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <>
            {user && (
                <div className="container">
                    <h1>Library Members</h1>
                    <button onClick={fetchAndDisplayData} className='btn'>Read</button>
                    <div className='table-container'>
                        {members.length > 0 && renderUserData()}
                    </div>
                </div>
            )}
            {!user && navigate('/login')};
        </>
    );
}

export default Main;
