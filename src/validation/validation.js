import { responseError } from "../error/response-error.js";

const validate = (schema , body) =>{
    const result = schema.validate(body);
    if(result.error){
        throw new responseError(400, result.error.message);
    }else{
        return result.value;
    }
}

export{
    validate
}