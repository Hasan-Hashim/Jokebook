const model = require('../models/jokebookModel');

const getCategories = (req, res) => {
    model.getCategories((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

const getJokesByCategory = (req, res) => {
    const category = req.params.category;
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    model.getJokesByCategory(category, limit, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        if (rows.length === 0) return res.status(404).json({ error: 'Category not found' });
        res.json(rows);
    });
};

const addJoke = (req, res) => {
    const { category, setup, delivery } = req.body;
    if (!category || !setup || !delivery) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    model.addJoke(category, setup, delivery, (err, jokeId) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Joke added successfully', jokeId });
    });
};

module.exports = { getCategories, getJokesByCategory, addJoke };
