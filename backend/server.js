
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

// mongoose.connect(
//   `mongodb://mongodb:27017/docker-db`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) {
//       console.error("FAILED TO CONNECT TO MONGODB");
//       console.error(err);
//     } else {
//       console.log("CONNECTED TO MONGODB!!");
//       app.listen(80);
//     }
//   }
// );