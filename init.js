import app from './app';
import './db';

const handleListening = () => console.log('Listenning on http://localhost:' + app.get('port'));

app.listen(app.get('port'), handleListening);

