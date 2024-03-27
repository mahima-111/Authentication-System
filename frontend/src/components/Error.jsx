import React from 'react'
import {useNavigate} from 'react-router-dom';
const Error = () => {
    const navigate=useNavigate();
    return (
        <div className='h-screen flex justify-center items-center'>
            <div>
                <h1 className='text-3xl font-semibold mb-4'>some error occoured</h1>
                <button onClick={()=>{
                    navigate('/')
                }}>go to home page</button>
            </div>
        </div>
    )
}

export default Error