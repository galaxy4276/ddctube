import passport from 'passport';
import GithubStrategy from 'passport-github';
import FacebookStrategy from 'passport-facebook';
import KakaoStrategy from 'passport-kakao';
import dotenv from 'dotenv';
import User from './models/User';
import { githubLoginCallback, facebookLoginCallback, kakaoLoginCallback } from './controllers/userController';
import routes from './routes';

dotenv.config();

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `https://stark-lowlands-59343.herokuapp.com${routes.githubCallback}`,
}, githubLoginCallback));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `https://stark-lowlands-59343.herokuapp.com${routes.facebookCallback}`, 
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ['public_profile', 'email'],
}, facebookLoginCallback));

passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_KEY,
    callbackURL: routes.kakaoCallback,
}, kakaoLoginCallback));

passport.serializeUser(User.serializeUser()); // 쿠키에 user.id 만 담아서 보내
passport.deserializeUser(User.deserializeUser());


