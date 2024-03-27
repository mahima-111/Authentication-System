import { useEffect,useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Register = () => {
    const {userInfo}=useSelector((state)=>state.auth);
    const [formData,setFormData]=useState({});
    const navigate=useNavigate();

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[userInfo]);

    const changeHandler=(e)=>{
        const {id,value}=e.target;
        setFormData({...formData,[id]:value});
    }
    const submitHandler=async (e)=>{
        e.preventDefault();
        if(formData.password!==formData.confirmPassword){
            toast.error('passwords do not match!');
            console.log('no match');
            return;
        }
        try{
            const res=await axios.post('/api/user',formData);
            const {data}=res;
            console.log(res);
            if(res.status===200){
                toast.success('register successful!');
                navigate('/login');
            }
        }
        catch(err){
            toast.error(`${err.response.data.message}!`);
            console.log(err.response.data.message);
        }
    }
    return (
        <div className='flex justify-center items-center mt-16'>
            <form onSubmit={submitHandler} className='flex flex-col gap-5'>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input type='text' id='name' name='name' required onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor='email'>email: </label>
                    <input type='email' id='email' name='email'  required onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor='password'>password: </label>
                    <input type='password' id='password' name='password'  required onChange={changeHandler}/>
                </div>
                <div>
                    <label htmlFor='confirmPassword'>confirm password: </label>
                    <input type='password' id='confirmPassword' name='confirmPassword'  required onChange={changeHandler}/>
                </div>
                <button type='submit'>Register</button>
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

export default Register