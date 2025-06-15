const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM schedules WHERE user_id = ?', [req.user.id]);
    res.json(rows);
});

router.patch('/:id', async (req, res) => {
    const { completed } = req.body;
    await db.execute('UPDATE schedules SET completed = ? WHERE id = ? AND user_id = ?', [completed, req.params.id, req.user.id]);
    res.sendStatus(204);
});

router.post('/', async (req, res) => {
    const { name, deadline, timeSpent, important } = req.body;
    const [result] = await db.execute(`
        INSERT INTO schedules
            (user_id, name, deadline, time_spent, important, completed)
        VALUES (?, ?, ?, ?, ?, false)
    `, [req.user.id, name, deadline, timeSpent || '', important]
    );
    const [row] = await db.execute('SELECT * FROM schedules WHERE id = ?', [result.insertId]);
    res.status(201).json(row[0]);
});

module.exports = router;