const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET이 설정되어 있지 않습니다. .env 파일을 확인해주세요.");
}

router.post("/", async (req, res) => {
  const { username, password, name, studentId, grade, email } = req.body;

  try {
    const [existing] = await db.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO users (username, password, name, student_id, grade, email)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, hashedPassword, name, studentId, grade, email]
    );

    const userId = result.insertId;

    const token = jwt.sign(
      { id: userId, username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 1000 * 60 * 60,
    });

    res.status(201).json({
      message: "회원가입 성공!",
      user: {
        id: userId,
        username,
        name
      }
    });
  } catch (err) {
    console.error("회원가입 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
