
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  description: {
    type: String
  }
});

module.exports = Event = mongoose.model('event', EventSchema);