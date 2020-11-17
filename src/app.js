const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();

/* Allow cors */
app.use(cors());

/* Set views */
app.use(require('./views/index'));

/*
    Database setup
*/
mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);


app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));

/* Rotas */
app.all('*', require('./routes/index'));

module.exports = app;
