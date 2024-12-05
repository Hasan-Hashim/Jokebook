const express = require('express');
const router = express.Router();
const controller = require('../controllers/jokebookController');

router.get('/categories', controller.getCategories);
router.get('/joke/:category', controller.getJokesByCategory);
router.post('/joke/new', controller.addJoke);

module.exports = router;
