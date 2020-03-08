import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';
import globalRouter from './routes/globalRouter';

const app = express();

app.set('port', process.env.PORT || 8001);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger("dev"));

app.use('/', globalRouter); // join
app.use('/user', userRouter);
app.use('/video', videoRouter);


export default app;
