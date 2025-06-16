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
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "존재하지 않는 아이디입니다." });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 1000 * 60 * 60,
    });

    res.json({
      message: "로그인 성공!",
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("로그인 오류:", err);
    res.status(500).json({ message: "서버 오류" });
  }
});

module.exports = router;
