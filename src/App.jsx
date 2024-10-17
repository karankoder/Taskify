import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import Register from './pages/register/Register';
import MainPage from './pages/mainPage/MainPage';
import { Toaster } from 'react-hot-toast';
import { Context, server } from './main';
import axios from 'axios';
import Password from './components/Password';

function App() {

  const { setUser, isAuthenticated, setIsAuthenticated, setLoading, loading } = useContext(Context);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/users/me`, { withCredentials: true });
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser({});
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);



  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={isAuthenticated ? <Navigate to='/main' /> : <HomePage />} />
          <Route path='/register' element={isAuthenticated ? <Navigate to='/main' /> : <Register />} />
          <Route path='/main' element={isAuthenticated ? <MainPage /> : <Navigate to='/' />} />
          <Route path='/set-password' element={isAuthenticated ? <Navigate to='/main' /> : <Password />} /> */}

          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/setPassword' element={<Password />} />
        </Routes>
        <Toaster></Toaster>
      </Router>
    </>
  )
}

export default App
