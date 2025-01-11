import { responseError } from "../error/response-error.js";


const errorMiddleware = (err,req,res,next) =>{

    if(!err){
        next();
        return;
    }
    if(err instanceof responseError){
        res.status(err.status).json({
            errors : err.message
        }).end();
    } else {
        res.status(400).json({
            errors : err.message
        }).end();
    }
}

export{
    errorMiddleware
}