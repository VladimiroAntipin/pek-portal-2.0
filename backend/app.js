const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const cors = require('cors');

//IMPORT ROUTES
const authRoutes = require('./routes/auth');

//CONNECT THE DATABASE
mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//ROUTES MIDDLEWARE
app.use('/api', authRoutes);

//ERROR MIDDLEWARE
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})