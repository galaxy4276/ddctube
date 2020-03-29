import express from 'express';
import passport from 'passport';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import {
    getLogin, logout, getJoin, postJoin, postLogin, githubLogin, postGithubLogin, 
} from '../controllers/userController';
import { onlyPublic, onlyPrivate } from '../middlewares/middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);


globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, postJoin, onlyPublic, postLogin);


globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, passport.authenticate('github', { failureRedirect: '/login' }),
    postGithubLogin);


export default globalRouter;



