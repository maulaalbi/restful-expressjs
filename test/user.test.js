import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";


describe('POST /api/users', function(){

    afterEach(async () =>{
       await prismaClient.user.delete({
            where: {
                username : "albi"
            }
        })
    })


    it('should can register new user', async () =>{
        const result = await supertest(web)
        .post("/api/users")
        .send({
            username : 'albi',
            password : '123456',
            name : 'albir'
        });
        // console.log(result);
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("albi");
        expect(result.body.data.name).toBe("albir");
        expect(result.body.data.password).toBeUndefined();
    })
})