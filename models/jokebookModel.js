const db = require('../database/dbSetup');

const getCategories = (callback) => {
    db.all(`SELECT name FROM categories`, [], (err, rows) => {
        callback(err, rows);
    });
};

const getJokesByCategory = (category, limit, callback) => {
    const sql = `
        SELECT jokes.setup, jokes.delivery FROM jokes
        JOIN categories ON jokes.category_id = categories.id
        WHERE categories.name = ?
        LIMIT ?
    `;
    db.all(sql, [category, limit || 10], (err, rows) => {
        callback(err, rows);
    });
};

const addJoke = (category, setup, delivery, callback) => {
    db.get(`SELECT id FROM categories WHERE name = ?`, [category], (err, row) => {
        if (row) {
            const categoryId = row.id;
            db.run(
                `INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)`,
                [categoryId, setup, delivery],
                function (err) {
                    callback(err, this.lastID);
                }
            );
        } else {
            callback(new Error('Invalid category'));
        }
    });
};

module.exports = { getCategories, getJokesByCategory, addJoke };
