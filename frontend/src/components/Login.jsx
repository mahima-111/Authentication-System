import { useEffect, useState } from 'react'
import axios from 'axios'
import { setCredentials } from '../slices/authSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const {userInfo}=useSelector((state)=>state.auth);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[userInfo]);

    const changeHandler = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/auth', formData);
            const { data } = res;
            if (res.status === 200) {
                toast.success('login successful!');
                dispatch(setCredentials(data));
                navigate('/');
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
                    <label htmlFor='email'>email: </label>
                    <input type='email' id='email' name='email' required onChange={changeHandler} />
                </div>
                <div>
                    <label htmlFor='password'>password: </label>
                    <input type='password' id='password' name='password' required onChange={changeHandler} />
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

export default Login