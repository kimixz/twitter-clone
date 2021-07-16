require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

// middleware
const expressJWT = require('./middleware/expressJWT')

// Helper functions
const { connectToDatabase } = require('./utils/databaseUtils')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const tweetRouter = require('./routes/tweet');
const uploadRouter = require('./routes/upload')
const searchRouter = require('./routes/search')
const notificationRouter = require('./routes/notification')
const logRouter = require('./routes/log')

const app = express();

// Initialize database connection
connectToDatabase(process.env.MONGODB_URL)


app.use(logger('dev'));
app.use(cors())
app.use(express.json({ limit: '500mb', extended: true }))
app.use(express.urlencoded({ limit: '500mb', extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(expressJWT())

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/tweet', tweetRouter);
app.use('/upload', uploadRouter);
app.use('/search', searchRouter);
app.use('/notification', notificationRouter);
app.use('/log', logRouter);


module.exports = app;
