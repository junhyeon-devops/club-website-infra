const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();
const JWT_SECRET = "secretpda_sejujun0401";

router.post("/", async (req, res) => {
  const { username, password, name, studentId, grade, birth, email } = req.body;

  try {
    const [existing] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "�̹� �����ϴ� ���̵��Դϴ�." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO users (username, password, name, student_id, grade, birth, email)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, name, studentId, grade, birth, email]
    );

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 1000 * 60 * 60,
    });

    res.status(201).json({ message: "ȸ������ ����!" });
  } catch (err) {
    console.error("ȸ������ ����:", err);
    res.status(500).json({ message: "���� ����" });
  }
});

module.exports = router;
