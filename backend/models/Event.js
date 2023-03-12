const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  location: {
    type: String
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  link: {
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  promoter: {
    type: String
  },
  description: {
    type: String
  },
  email: {
    type: String
  },
  thumbnail: {
    type: String
  }
});

module.exports = Event = mongoose.model('event', EventSchema);