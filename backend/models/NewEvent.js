
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  },
  category: {
    type: String
  }
});

module.exports = Event = mongoose.model('newEvent', EventSchema);