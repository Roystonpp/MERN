const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const items = require('./routes/api/items');


//BodyParser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/key').mongoURI;

//Connect to mongo
mongoose
.connect(db)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//routes
app.use('/api/items', items);

const port = process.env.port ||4000;

app.listen(port, () => console.log(`Server started on port ${port}`));