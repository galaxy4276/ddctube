/* eslint-disable indent */
import '@babel/polyfill';

import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from'connect-mongo';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';
import globalRouter from './routes/globalRouter';
import apiRouter from './routes/apiRouter';
import routes from './routes';
import { localsMiddleware } from './middlewares/middlewares';
import './passport';

dotenv.config();


const app = express();

const CookieStore = MongoStore(session);

app.set('port', process.env.PORT || 8001);


app.use(helmet());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
        mongooseConnection: mongoose.connection,
    }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter); // join
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);


export default app;
