import React from 'react'
import loader from '../assets/gear.gif'

export default function Loader() {
    return (
        <div style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img src={loader} alt="Loading" />
        </div>
    )
}
