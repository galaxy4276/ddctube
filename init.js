import app from './app';
import './db';
//import './models/Video';
//import './models/Comment';


const handleListening = () => console.log('Listenning on http://localhost:' + app.get('port'));

app.listen(app.get('port'), handleListening);

