import passport from 'passport';
import GithubStrategy from 'passport-github';
import dotenv from 'dotenv';
import User from './models/User';
import { githubLoginCallback } from './controllers/userController';
import routes from './routes';

dotenv.config();

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `http://localhost:8001${routes.githubCallback}`,
}, githubLoginCallback));

passport.serializeUser(User.serializeUser()); // 쿠키에 user.id 만 담아서 보내
passport.deserializeUser(User.deserializeUser());