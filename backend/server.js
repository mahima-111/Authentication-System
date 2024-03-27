import express from 'express';
import db from './db.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorMiddleware.js';
const port=5000;
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/user',userRouter);
app.use(errorHandler);
app.listen(port,()=>{
    console.log('listening on port 5000');
})