
const express = require('express');
const Event = require('../models/Event');

const router = express.Router();

// @route GET events
// @description Get all events
router.get('/', (req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(404).json({ noeventsfound: 'No Events found' }));
});

// @route GET events/:id
// @description Get single event by i
router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(404).json({ noeventfound: 'No Event found' }));
});

// @route POST events
// @description add/save event
router.post('/', (req, res) => {
  Event.create(req.body)
    .then(event => res.json({ msg: 'Event added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this event' }));
});

// @route PUT events/:id
// @description Update event
router.put('/:id', (req, res) => {
  Event.findByIdAndUpdate(req.params.id, req.body)
    .then(event => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route DELETE events/:id
// @description Delete event by id
router.delete('/:id', (req, res) => {
  Event.findByIdAndRemove(req.params.id, req.body)
    .then(event => res.json({ mgs: 'Event entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a event' }));
});

module.exports = router;