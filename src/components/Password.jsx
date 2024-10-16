import React, { useState, useContext } from 'react'
import { Context, server } from '../main'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Password() {

    const [password, setPassword] = useState('')
    const { setIsAuthenticated } = useContext(Context);
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${server}/users/set-password`, {
                password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })

            setIsAuthenticated(true);
            navigate('/main');
        }
        catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            navigate('/');
        }
    }

    return (
        <>
            <h1 style={{
                textAlign: 'center', marginTop: 50
            }}>Set Your Password</h1>
            <form onSubmit={submitHandler} className='passwordPage' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                flexDirection: 'column',
                gap: 20
            }}>
                <input style={{ height: 40, width: 300, fontSize: 25 }} onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" id="password" placeholder='Enter Your Password' required />
                <button style={{ height: 40, width: 80, fontSize: 20 }}>Submit</button>
            </form>
        </>
    )
}
