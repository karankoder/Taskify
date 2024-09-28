import React, { useContext, useState } from 'react';
import './Register.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context, server } from '../../main';
import { Navigate } from 'react-router-dom';

function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${server}/users/new`, {
                name: username,
                email,
                password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        }
        catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }

    if (isAuthenticated) {
        return (<Navigate to='/main'></Navigate>)
    }

    if (loading) {
        return (<Loader></Loader>)
    }
    return (
        <>
            <div className='container'>
                <div className='screen'>
                    <div className='screen__content'>
                        <form className='login' onSubmit={submitHandler}>
                            <div className='login__field'>
                                <i className='login__icon fas fa-user'></i>
                                <input
                                    required
                                    name='username'
                                    type='text'
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    className='login__input'
                                    placeholder='Username'
                                />
                            </div>
                            <div className='login__field'>
                                <i className='login__icon fas fa-lock'></i>
                                <input
                                    required
                                    name='email'
                                    type='email'
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    className='login__input'
                                    placeholder='Email'
                                />
                            </div>
                            <div className='login__field'>
                                <i className='login__icon fas fa-lock'></i>
                                <input
                                    required
                                    name='password'
                                    type='password'
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    className='login__input'
                                    placeholder='Password'
                                />
                            </div>
                            <button className='button login__submit'>
                                <span className='button__text'>Register Now</span>
                                <i className='button__icon fas fa-chevron-right'></i>
                            </button>
                        </form>
                        <div className='social-login'>
                            <h5>Already Registered?</h5>
                            <a href='/'>Login Now</a>
                        </div>
                    </div>
                    <div className='screen__background'>
                        <span className='screen__background__shape screen__background__shape4'></span>
                        <span className='screen__background__shape screen__background__shape3'></span>
                        <span className='screen__background__shape screen__background__shape2'></span>
                        <span className='screen__background__shape screen__background__shape1'></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
