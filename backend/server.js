
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const events = require('./routes/events');

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use('/events', events);

app.listen(port, () => console.log(`Server Running on Port ${port}`));
