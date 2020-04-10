import '@babel/polyfill';
import dotenv from 'dotenv';
import './db';
import app from './app';

import './models/Video';
import './models/Comment';
import './models/User';

dotenv.config();


const handleListening = () => console.log(`Listenning on http://localhost:${app.get('port')}`);

app.listen(app.get('port'), handleListening);

