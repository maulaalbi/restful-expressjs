import express from "express";
import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

//api user
userRouter.get('/api/users/current', userController.get);
userRouter.patch('/api/users/current', userController.update);
userRouter.delete('/api/users/current', userController.logout);

//api contact
userRouter.post('/api/contacts',contactController.create);
userRouter.get('/api/contacts/:contactId',contactController.get);


export {    
    userRouter
}