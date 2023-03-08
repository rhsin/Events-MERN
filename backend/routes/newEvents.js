const express = require('express');
const { isLoggedIn } = require("./middleware");
const Event = require('../models/NewEvent');
const MainEvent = require('../models/Event');

const router = express.Router();

// @route GET new
// @description Get all events
router.get('/', (req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noeventsfound: 'No Events found' }));
});

// @route GET new/:id
// @description Get single event by i
router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(404).json({ noeventfound: 'No Event found' }));
});

// @route POST new
// @description Add/save event
router.post('/', isLoggedIn, (req, res) => {
  Event.create(req.body)
    .then(event => res.json({ msg: 'Event added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this event' }));
});

// @route POST new/main/:id
// @description Add/save event to main collection
router.post('/main/:id', isLoggedIn, (req, res) => {
  Event.findById(req.params.id)
    .then(event => MainEvent.create(event))
    .then(json => res.json({ msg: 'Event added to main collection' }))
    .catch(err => res.status(404).json({ noeventfound: 'No Event found' }));
});

// @route PUT new/:id
// @description Update event
router.put('/:id', isLoggedIn, (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body)
    .then(event => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route DELETE new/:id
// @description Delete event by id
router.delete('/:id', isLoggedIn, (req, res) => {
  Event.findByIdAndRemove(req.params.id, req.body)
    .then(event => res.json({ mgs: 'Event entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a event' }));
});

module.exports = router;