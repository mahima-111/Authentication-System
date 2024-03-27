import { useSelector } from 'react-redux';

const Home = () => {
    const {userInfo}=useSelector((state)=>state.auth);
    return (
        <div className='flex justify-center items-center mt-16'>
            <div className='flex flex-col gap-5 items-center'>
                <h1 className='text-4xl font-bold'>{userInfo? `WELCOME ${userInfo.name} !`: 'WELCOME !'}</h1>
                <h3 className='font-medium text-2xl'>This project implements a robust user authentication system with the following features:</h3>
                <ul className='text-lg font-normal list-disc'>
                    <li><span className='font-medium text-xl'>Registration:</span> Users can create new accounts</li>
                    <li><span className='font-medium text-xl'>Login/Logout:</span>  Users can authenticate and deauthenticate themselves</li>
                    <li><span className='font-medium text-xl'>Profile Management:</span> Users can view and update their profiles</li>
                    <li><span className='font-medium text-xl'>Password Updates:</span> Users can change their passwords</li>
                </ul>
            </div>
        </div>
    )
}

export default Home