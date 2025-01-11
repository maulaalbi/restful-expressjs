import { prismaClient } from "../application/database.js";
import { responseError } from "../error/response-error.js";
import { registerUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";


const register = async (body) =>{
    const user = validate(registerUserValidation, body);

    const countUser = await prismaClient.user.count({
        where : {
            username : user.username
        }
    });

    if(countUser === 1){
        throw new responseError(400,"username already exists")
    }

    user.password = await bcrypt.hash(user.password,10);

    return prismaClient.user.create({
        data : user,
        select:{
            username : true,
            name : true
        }
    })

}

export default{
    register
}