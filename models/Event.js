
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String
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
  description: {
    type: String
  },
  category: { type: mongoose.Types.ObjectId, ref: "Category" }
});

module.exports = Event = mongoose.model('event', EventSchema);