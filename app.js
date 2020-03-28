/* eslint-disable indent */
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from'connect-mongo';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';
import globalRouter from './routes/globalRouter';
import routes from './routes';
import { localsMiddleware } from './middlewares/middlewares';
import './passport';
dotenv.config();


const app = express();

const CookieStore = MongoStore(session);

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'pug');


app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/uploads', express.static('uploads')); // Node는 모든 경로에 대한 Router 가 필요하기때문에 express.static
app.use('/static', express.static('static'));
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


export default app;
