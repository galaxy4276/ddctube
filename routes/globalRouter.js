import express from 'express';
import passport from 'passport';
import routes from '../routes';
import { home, search } from '../controllers/videoController';
import {
    getLogin, logout, getJoin, postJoin, postLogin, githubLogin, postGithubLogin, getMe, 
    facebookLogin, postFacebookLogin, postKakaoLogin, kakaoLogin,
} from '../controllers/userController';
import { onlyPublic, onlyPrivate } from '../middlewares/middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.me, getMe);


globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);


globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, postJoin, onlyPublic, postLogin);


globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, passport.authenticate('github', { failureRedirect: '/login' }),
    postGithubLogin);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.facebookCallback, passport.authenticate('facebook', { failureRedirect: '/login' }),
    postFacebookLogin);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(routes.kakaoCallback, passport.authenticate('kakao', { failureRedirect: '/login' }),
    postKakaoLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;



