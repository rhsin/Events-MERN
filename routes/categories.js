
const express = require('express');
const Category = require('../models/Category');

const router = express.Router();

// @route GET categories
// @description Get all categories
router.get('/', (req, res) => {
  Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(404).json({ nocategorysfound: 'No Categories found' }));
});

// @route GET categories/:id
// @description Get single category by i
router.get('/:id', (req, res) => {
  Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(err => res.status(404).json({ nocategoryfound: 'No Categories found' }));
});

// @route GET categories
// @description add/save category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then(category => res.json({ msg: 'Category added successfully' }))
    .catch(err => res.status(400).json({ error: err }));
});

// @route GET categories/:id
// @description Update category
router.put('/:id', (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body)
    .then(category => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET categories/:id
// @description Delete category by id
router.delete('/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id, req.body)
    .then(category => res.json({ mgs: 'Category entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a category' }));
});

module.exports = router;