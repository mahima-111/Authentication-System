import { useEffect, useState } from 'react'
import axios from 'axios'
import { setCredentials } from '../slices/authSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const UpdatePassword = () => {
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
        if(formData.newPassword!==formData.confirmPassword){
            toast.error('confirm password does not match the new password');
            console.log('no match');
            return;
        }
        try {
            const res = await axios.put('/api/user/password', formData);
            const { data } = res;
            if (res.status === 200) {
                toast.success('password reset successful!');
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
                <div>
                    <label htmlFor='oldPassword'>old password: </label>
                    <input type='password' id='oldPassword' name='oldPassword' required onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='newPassword'>new password: </label>
                    <input type='password' id='newPassword' name='newPassword' required onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='confirmPassword'>confirm password: </label>
                    <input type='password' id='confirmPassword' name='confirmPassword'  required onChange={changeHandler}/>
                </div>
                <button type='submit'>Login</button>
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

export default UpdatePassword