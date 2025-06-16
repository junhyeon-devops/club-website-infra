const express = require('express');
const router = express.Router();
const db = require('../db'); 
const authenticateToken = require('../middleware/auth');

router.post('/time-tracking', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { taskName, elapsed } = req.body; 

  await db.execute(`
    INSERT INTO time_tracking 
      (user_id, task_name, elapsed_time, recorded_at)
    VALUES (?, ?, ?, NOW())
  `, [userId, taskName, elapsed]);

  res.sendStatus(201);
});

router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  const [rows] = await db.execute(`
    SELECT
      s.id, s.name, s.deadline, s.completed,
      COALESCE(SUM(
        SUBSTRING_INDEX(tt.elapsed_time, ':', 1) * 60 +
        SUBSTRING_INDEX(tt.elapsed_time, ':', -1)
      ), 0) AS totalSec
    FROM schedules s
    LEFT JOIN time_tracking tt
      ON tt.user_id = ? AND tt.task_name = s.name
    WHERE s.user_id = ?
    GROUP BY s.id
    ORDER BY s.deadline ASC
  `, [userId, userId]);

  const formatted = rows.map(r => ({
    ...r,
    timeSpent: `${String(Math.floor(r.totalSec / 60)).padStart(2, '0')}:${String(r.totalSec % 60).padStart(2, '0')}`
  }));

  res.json(formatted);
});

module.exports = router;
