import React from 'react'
import '../pages/mainPage/MainPage.css';

export default function TaskItem(props) {
    return (
        <>
            <div className='task-content'>
                <div className='task-text'>{props.title}</div>
                <div className='task-content-btn' onClick={() => props.updateHandler(props.id)}>
                    <i
                        className='icon fa-solid fa-pen-to-square'
                        style={{ color: '#4c489d' }}
                    ></i>
                </div>
                <div className='task-content-btn' onClick={() => props.deleteHandler(props.id)}>
                    <i
                        className='icon fa-solid fa-trash'
                        style={{ color: '#4c489d' }}
                    ></i>
                </div>
            </div >
        </>
    )
}
