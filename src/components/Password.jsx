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
        <div>
            <form onSubmit={submitHandler}>
                <input onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" id="password" required />
                <label htmlFor="password">Password</label>
                <button>Click</button>
            </form>
        </div>
    )
}
