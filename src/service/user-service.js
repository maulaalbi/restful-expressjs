import { responseError } from "../error/response-error";
import { registerUserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import bcrypt from "bcrypt";


const register = async (request) =>{
    const user = validate(registerUserValidation);

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

export{
    register
}