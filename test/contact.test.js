import { web } from "../src/application/web.js";
import supertest from "supertest";
import { createTestUser, removeAllTestContact,removeTestUser , createTestContact, getTestContact } from "./util-test"

describe('post /api/contacts', function () {
    beforeEach(async()=>{
        await createTestUser();
    })

    afterEach(async()=>{
        await removeAllTestContact();
        await removeTestUser();
    })

    it('should create contacts',async()=>{
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                firstName: 'test',
                lastName:'test',
                email : 'test@example.com',
                phone: '088090000'
            });
       
        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.firstName).toBe('test');
        expect(result.body.data.lastName).toBe('test');
        expect(result.body.data.email).toBe('test@example.com');
        expect(result.body.data.phone).toBe('088090000');
    });

    it('should reject create contacts',async()=>{
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                firstName: '',
                lastName:'test',
                email : 'test@example.com',
                phone: '088090000'
            });
       
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        
    })
})

describe('get /api/contacts', function () {
    beforeEach(async()=>{
        await createTestUser();
        await createTestContact();
    })

    afterEach(async()=>{
        await removeAllTestContact();
        await removeTestUser();
    });

    it('should get contacts',async()=>{
        const testContact =  await getTestContact();

        const result = await supertest(web)
           .get('/api/contacts/' + testContact.id)
           .set('Authorization', 'test');

           expect(result.status).toBe(200);
           expect(result.body.data.id).toBe(testContact.id);
           expect(result.body.data.firstName).toBe(testContact.firstName);
           expect(result.body.data.lastName).toBe(testContact.lastName);
    })
})