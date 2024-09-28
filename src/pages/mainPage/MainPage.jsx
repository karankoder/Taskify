import React, { useState, useEffect, useContext } from 'react';
import image from '../../assets/hello.png';
import './MainPage.css';
import { Context, server } from '../../main';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskItem from '../../components/TaskItem';
import Loader from '../../components/Loader';

function MainPage() {

    const { setIsAuthenticated, setLoading, user, isAuthenticated, loading } = useContext(Context);
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const logoutHandler = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${server}/users/logout`, {
                withCredentials: true,
            });
            toast.success(data.message);
            setIsAuthenticated(false);
            navigate('/');
        }
        catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(true);
        }
        finally {
            setLoading(false);
        }
    }

    const todoCreateHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (title.trim() === '') {
            toast.error('Please Enter a Task');
            setTitle('');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post(
                `${server}/tasks/new`,
                {
                    title: title.trim(),
                    description: title,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            toast.success(data.message);
            setTitle('');
            setRefresh((e) => !e);
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    const updateHandler = (id) => { toast.error(`Feature not available`) };
    const deleteHandler = async (id) => {
        setLoading(true);
        try {
            const { data } = await axios.delete(`${server}/tasks/${id}`, {
                withCredentials: true,
            });

            toast.success(data.message);
            setRefresh((e) => !e);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        if (!isAuthenticated) {
            navigate('/');
        }
        const getAllTasks = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${server}/tasks/all`, {
                    withCredentials: true,
                });
                setTasks(data.tasks);
            }
            catch (error) {
                toast.error(error.response.data.message);
            }
            finally {
                setLoading(false);
            }
        }

        getAllTasks();
    }, [refresh])

    if (loading) {
        return (<Loader></Loader>)
    }

    return (
        <>

            <div className='main-body'>
                <div className='navbar'>
                    <div className='left-nav'>
                        <img src={image} alt='' />
                        <span>Taskify</span>
                    </div>
                    <div className='mid-nav'>Welcome {user.name}</div>
                    <div className='right-nav'>
                        <button onClick={logoutHandler} className='btn'>Logout</button>
                    </div>
                </div>
                <form>
                    <div className='add-task'>
                        <input
                            name='title'
                            className='task'
                            type='text'
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            placeholder='Add your task'
                        />
                        <button onClick={todoCreateHandler} className='task-btn'>Add</button>
                    </div>
                </form>
                <div className='task-font'>Your Tasks</div>
                <div className='task-list'>

                    {tasks.length == 0 ?
                        (<div className='empty-task'>No Task Available</div>) :
                        (
                            tasks.map((elem) => {
                                return (
                                    <TaskItem
                                        title={elem.title}
                                        updateHandler={updateHandler}
                                        deleteHandler={deleteHandler}
                                        id={elem._id}
                                        key={elem._id}>
                                    </TaskItem>
                                )
                            })
                        )
                    }
                </div>
            </div>

        </>
    );
}

export default MainPage;
