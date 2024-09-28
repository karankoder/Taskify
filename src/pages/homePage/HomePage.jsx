import React, { useState, useContext } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Context, server } from '../../main';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

function HomePage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated, setLoading, setUser, loading } = useContext(Context);
    const navigate = useNavigate();

    const submitHandler = async (e) => {

        e.preventDefault();
        setLoading(true);
        try {
            e.preventDefault();
            const { data } = await axios.post(`${server}/users/login`, {
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
        }
        catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
        }
        finally {
            setLoading(false);
        }
    }

    if (isAuthenticated) {
        navigate('/main');
    }

    if (loading) {
        return (<Loader></Loader>)
    }

    return (

        <><div className='container'>
            <div className='screen'>
                <div className='screen__content'>
                    <form className='login' onSubmit={submitHandler}>
                        <div className='login__field'>
                            <i className='login__icon fas fa-user'></i>
                            <input
                                required
                                name='email'
                                type='text'
                                className='login__input'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>
                        <div className='login__field'>
                            <i className='login__icon fas fa-lock'></i>
                            <input
                                required
                                name='password'
                                type='password'
                                className='login__input'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                        <button className='button login__submit'>
                            <span className='button__text'>Log In Now</span>
                            <i className='button__icon fas fa-chevron-right'></i>
                        </button>
                    </form>
                    <div className='social-login'>
                        <h5>Not Registered?</h5>
                        <Link to='/register'>Signup Here</Link>
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

export default HomePage;
