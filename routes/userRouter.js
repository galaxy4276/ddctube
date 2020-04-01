import express from 'express';
import routes from '../routes';
import {
    userDetail, editProfile, changePassword, 
} from '../controllers/userController';
import { onlyPrivate } from '../middlewares/middlewares';

const userRouter = express.Router();

// userRouter.get(routes.users, users);
userRouter.get(routes.userDetail(), userDetail);
userRouter.get(routes.editProfile, onlyPrivate, editProfile); 
userRouter.get(routes.changePassword, onlyPrivate, changePassword);

export default userRouter;




