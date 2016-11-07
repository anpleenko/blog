import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';

import config from './config';
import authRouter from './routes/auth';
import errHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';

const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
  if (err) { throw err; }

  console.log('Mongo connected');
})

app.listen(config.port, err => {
  if(err) throw err;

  console.log(`Server listening on port ${config.port}`);
})

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret
}));

app.use('/api/', authRouter);
app.use('/test', checkToken, (req, res) => {
  res.json('test');
})

app.use(errHandler);
