//func for throwing custom error
// export const handleCustomErrors=(statusCode,message)=>{
//     const error=new Error();
//     error.statusCode=statusCode;
//     error.message=message;
//     return error;
// }
//error handling middleware
export const errorHandler=(err,req,res,next)=>{
    let statusCode=res.statusCode;
    let message=err.message;
    res.status(statusCode).json({statusCode,message});
}