const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const eventsRouter = require('./routes/events');
const newEventsRouter = require('./routes/newEvents');

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(express.json());
app.use('/events', eventsRouter);
app.use('/new', newEventsRouter);

app.listen(port, () => console.log(`Server Running on Port ${port}`));
