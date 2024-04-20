const errorHandler=(statusCode,message)=>{
    const error=new Error();
    error.statusCode=statusCode;
    message=message;
    return error;
};
module.exports=errorHandler;