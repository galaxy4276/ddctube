import mongoose from 'mongoose';

mongoose.connect("mongodb://galaxy:chldmsrl12@localhost:27017/ddc-tube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB DisConnected');
});

mongoose.connection.on('error', () => {
  console.log('MONGODB ERROR');
});
