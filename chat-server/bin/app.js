import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import  router from './routes/index.js';
import * as job from './jobs/unreadNotiCron.js'

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);
job.init()
// socket(app);

export default app;
