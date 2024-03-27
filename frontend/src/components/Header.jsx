import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

const Header = () => {
    const {userInfo}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [isOpen,setIsOpen]=useState(false);

    const handleLogout=async()=>{
        try{
            const res=await axios.post('/api/user/logout');
            if(res.status===200){
                dispatch(logout());
                navigate('/');
                toast.success('user logout successful!');
            }
        }
        catch(err){
            toast.error(err);
            // console.log(err);
        }
    }

    return (
        <nav className='px-12 py-2 bg-gray-800 text-white flex items-center justify-between'>
            <h1 className='text-4xl'><Link to='/'>Auth</Link></h1>
            {userInfo?<div className='relative '>
                <h3 onClick={()=>{setIsOpen(!isOpen)}} className='cursor-pointer px-4 text-sky-400 font-semibold text-2xl flex items-center gap-1'>{userInfo.name}
                {isOpen? <FaCaretUp/>:<FaCaretDown/>}
                </h3>
                {isOpen && <ul className='absolute top-11 bg-sky-400 text-white px-6 py-6 text-xl font-medium'>
                    <li className='mb-2 cursor-pointer' onClick={()=>{setIsOpen(!isOpen)}}><Link to='/profile'>Profile</Link></li>
                    <li className='cursor-pointer' onClick={handleLogout}>Logout</li>
                </ul>}
            </div>
            :<ul className='text-lg flex gap-6'>
                <li>
                    <Link to='/login'><button>Sign In</button></Link>
                </li>
                <li>
                    <Link to='/register'><button>Sign Up</button></Link>
                </li>
            </ul>}
            <Toaster
                position="top-right"
                toastOptions={{
                    // Define default options
                    duration: 2000,
                }}
            />
        </nav>
    )
}

export default Header