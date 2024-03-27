import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
    const {userInfo}=useSelector((state)=>state.auth);
    return (
        <div className='flex justify-center items-center mt-16'>
            <div>
                <h1 className='text-4xl font-bold mb-6'>
                    User Details
                    <Link to='/update-profile'><button className='ml-4 text-lg font-medium'>update</button></Link>
                </h1>
                <div className='text-xl font-medium'>
                <h2>{`Name: ${userInfo.name}`}</h2>
                <h2>{`Email: ${userInfo.email}`}</h2>
                </div>
            </div>
        </div>
    )
}

export default Profile