import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_DEV_URL).then(()=>{
    console.log('mongo db connected');
}).catch((err)=>{
    console.log('error connecting to db :'+err);
});
const db=mongoose.Connection;

// const db= async ()=>{
//     try{
//         console.log(process.env.MONGO_DEV_URL);
//         await mongoose.connect(process.env.MONGO_DEV_URL);
//         console.log('mongo db connected');
//     }
//     catch(err){
//         console.log(err);
//     }
// }
export default db;
