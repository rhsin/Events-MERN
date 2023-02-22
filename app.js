
const express = require('express');
const connectDB = require('./config/db');

const app = express();

const port = process.env.PORT || 8080;

connectDB();

app.get('/', (req, res) => res.send('Event'));

app.listen(port, () => console.log(`Server Running on Port ${port}`));