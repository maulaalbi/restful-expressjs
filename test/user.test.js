import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logger.js";
import { createTestUser, removeTestUser ,getTestUser } from "./util-test.js";
import bcrypt from "bcrypt";
describe('POST /api/users', function(){

    afterEach(async () =>{
      await removeTestUser();
    })


    it('should can register new user', async () =>{
        const result = await supertest(web)
        .post("/api/users")
        .send({
            username : 'test',
            password : '123456',
            name : 'test'
        });
        // console.log(result);
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should can register invalid', async () =>{
        const result = await supertest(web)
        .post("/api/users")
        .send({
            username : '',
            password : '',
            name : ''
        });
        // logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('should can register new user', async () =>{
        let result = await supertest(web)
        .post("/api/users")
        .send({
            username : 'test',
            password : '123456',
            name : 'test'
        });
        // console.log(result);
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

         result = await supertest(web)
        .post("/api/users")
        .send({
            username : 'test',
            password : '123456',
            name : 'test'
        });
        // console.log(result);
        // logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();

    });
})

describe('POST /api/users/login',function(){
    beforeEach(async()=>{
        await createTestUser();
    });

    afterEach(async()=>{
        await removeTestUser();
    });

    it('should can login ',async()=>{
        const result = await supertest(web)
        .post("/api/users/login")
        .send({
            username: "test",
            password: "123456" 
        });

        // logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    })

    it('should login reject  ',async()=>{
        const result = await supertest(web)
        .post("/api/users/login")
        .send({
            username: "",
            password: "" 
        });

        // logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
       
    })

    it('should login reject if password wrong  ',async()=>{
        const result = await supertest(web)
        .post("/api/users/login")
        .send({
            username: "test",
            password: "salah" 
        });

        // logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
       
    })
})

describe('get /api/users/current', function (){
    beforeEach(async()=>{
        await createTestUser();
    });

    afterEach(async()=>{
        await removeTestUser();
    });

    it('should get current user', async ()=>{
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization','test');


        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');

    })

     it('should reject if token invalid', async ()=>{
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization','salah');


        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();

    })
})

describe('update ', function() { 
    beforeEach(async()=>{
        await createTestUser();
    });

    afterEach(async()=>{
        await removeTestUser();
    });


    it('should update data', async()=>{
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization','test')
        .send({
            name: "albi",
            password: "oke"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('albi');

        const user = await getTestUser();
        expect(await bcrypt.compare('oke',user.password)).toBe(true);
    })
 });

 describe('delete ', function() {
    beforeEach(async()=>{
        await createTestUser();
    });

    afterEach(async()=>{
        await removeTestUser();
    });

    it('logout',async()=>{
        const result = await supertest(web)
       .delete('/api/users/current')
       .set('Authorization','test');

       expect(result.status).toBe(200);
       expect(result.body.data).toBe("OK");

       const user = await getTestUser();
       expect(user.token).toBeNull();
    })
 })