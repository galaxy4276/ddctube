import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from './models/Video';
dotenv.config();

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once('connected', () => {
  console.log('MongoDB Connected');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB DisConnected');
});

mongoose.connection.on('error', error => {
  console.log(`MongoDB Error : ${error}`);
});
