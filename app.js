import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';
import globalRouter from './routes/globalRouter';
import routes from './routes';
import { localsMiddleware } from './middlewares/middlewares';
import mongoose from 'mongoose';

const app = express();

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'pug');

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(localsMiddleware);

app.use(routes.home, globalRouter); // join
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);


export default app;
