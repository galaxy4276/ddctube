import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';
import globalRouter from './routes/globalRouter';
import routes from './routes';
import { localsMiddleware } from './middlewares/middlewares';

const app = express();

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'pug');

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/uploads', express.static('uploads')); // Node는 모든 경로에 대한 Router 가 필요하기때문에 express.static
app.use('/static', express.static('static'));
app.use(localsMiddleware);

app.use(routes.home, globalRouter); // join
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);


export default app;
