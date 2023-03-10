const express = require('express');
const NewEvent = require('../models/NewEvent');
const Event = require('../models/Event');

const router = express.Router();

// @route GET new
// @description Get all events
router.get('/', (req, res) => {
  NewEvent.find()
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noeventsfound: 'No Events found' }));
});

// @route GET new/:id
// @description Get single event by i
router.get('/:id', (req, res) => {
  NewEvent.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(404).json({ noeventfound: 'No Event found' }));
});

// @route POST new
// @description Add/save event
router.post('/', (req, res) => {
  NewEvent.create(req.body)
    .then(event => res.json({ msg: 'Event added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this event' }));
});

// @route POST new/main/:id
// @description Add/save event to main collection
router.post('/:id', (req, res) => {
  NewEvent.findById(req.params.id).lean()
    .then(event => {
      Event.create(event);
    })
    .then(json => res.json({ msg: 'Event added to main collection' }))
    .catch(err => res.status(400).json({ error: err }));
});

// @route PUT new/:id
// @description Update event
router.put('/:id', (req, res) => {
  NewEvent.findByIdAndUpdate(req.params.id, req.body)
    .then(event => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route DELETE new/:id
// @description Delete event by id
router.delete('/:id', (req, res) => {
  NewEvent.findByIdAndRemove(req.params.id, req.body)
    .then(event => res.json({ mgs: 'Event entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a event' }));
});

module.exports = router;