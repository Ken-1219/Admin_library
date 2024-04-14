/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/edit.css';

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [qrData, setQrData] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [booksIssued, setBooksIssued] = useState('');
    const [booksReturned, setBooksReturned] = useState('');


    useEffect(() => {
        const fetchMemberDetails = async (ID) => {
            try {
                const response = await axios.get(`https://sheetdb.io/api/v1/qm7akdpxhif0w/search?Id=${ID}`);
                // console.log(response);
                if (response.data.length > 0) {
                    const member = response.data[0];
                    setQrData(member.Id);
                    setName(member.Name);
                    setEmail(member.Email);
                    setBooksIssued(member.BooksIssued);
                    setBooksReturned(member.BooksReturned);
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMemberDetails(id);
    }, []);


    const updateMemberDetails = async (id, data) => {
        const row = parseInt(id);
        try {
            const response = await axios.patch(`https://sheetdb.io/api/v1/qm7akdpxhif0w/Id/${row}`, data);
            console.log(response);
        }
        catch (error) {
            console.error('Error updating data:', error);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!qrData || !name || !email || !booksIssued || !booksReturned) {
            alert('Please fill all the fields');
            return;
        }

        const data = {
            "Id": qrData,
            "Name": name,
            "Email": email,
            "BooksIssued": booksIssued,
            "BooksReturned": booksReturned
        }

        console.log(data);
        updateMemberDetails(qrData, data);
        navigate('/');
    };


    return (
        <div className='editMemberContainer'>
            <h1 className='editHeading'>Update Member Details</h1>

            <div className="editMember">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="qrData"> Roll Number:</label>
                    <input
                        type="text"
                        id="qrData"
                        value={qrData}
                        onChange={(e) => setQrData(e.target.value)}
                        placeholder="Roll Number"
                        disabled={true}
                    />
                    <label htmlFor="name"> Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                    />
                    <label htmlFor="email"> Email ID:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email ID"
                    />
                    <label htmlFor="booksIssued">Books Issued:</label>
                    <input
                        type="text"
                        id="booksIssued"
                        value={booksIssued}
                        onChange={(e) => setBooksIssued(e.target.value)}
                        placeholder="Number of Books Issued"
                    />
                    <label htmlFor="booksReturned">Books Returned:</label>
                    <input
                        type="text"
                        id="booksReturned"
                        value={booksReturned}
                        onChange={(e) => setBooksReturned(e.target.value)}
                        placeholder="Number of Books Returned"
                    />
                    <button type="submit">Save Member Details</button>
                </form>

            </div>
        </div>
    )
}

export default Edit;