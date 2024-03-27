import { useEffect, useState } from 'react'
import axios from 'axios'
import { setCredentials } from '../slices/authSlice';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const UpdateProfile = () => {
    const {userInfo}=useSelector((state)=>state.auth);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put('/api/user/profile', formData);
            const { data } = res;
            console.log(res);
            console.log(data);
            if (res.status === 200) {
                toast.success('update successful!');
                dispatch(setCredentials(data));
                navigate('/profile');
            }  
        }
        catch (err) {
            toast.error(`${err.response.data.message}!`);
            console.log(err.response.data.message);
        }
    }
    return (
        <div className='flex justify-center items-center mt-16'>
            <form onSubmit={submitHandler} className='flex flex-col gap-5'>
                <Link to='/update-password'><button>update password</button></Link>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input type='text' id='name' name='name' onChange={changeHandler} placeholder={userInfo.name}/>
                </div>
                <div>
                    <label htmlFor='email'>email: </label>
                    <input type='email' id='email' name='email' onChange={changeHandler} placeholder={userInfo.email}/>
                </div>
                <button type='submit'>Update</button>
            </form>
            <Toaster
                position="top-right"
                toastOptions={{
                    // Define default options
                    duration: 2000,
                }}
            />
        </div>
    )
}

export default UpdateProfile