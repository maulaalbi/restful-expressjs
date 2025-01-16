import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";


export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username : "test"
        }
    })
}


export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("123456", 10),
            name: "test",
            token: "test" 
        }
    });
};

export const getTestUser = async () =>{
    return prismaClient.user.findUnique({
        where : {
            username : "test"
        }
    })
}

export const removeAllTestContact = async () =>{
    return prismaClient.contact.deleteMany({
        where :{
            username : "test"
        }
    })
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            firstName:"test",
            lastName:"test",
            email:"test@test.com",
            phone:"12345678"
        }
    });
}

export const getTestContact = async () =>{
  return await prismaClient.contact.findFirst({
        where:{
            username:"test"
        }
    })
}

