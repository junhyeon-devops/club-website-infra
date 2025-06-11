const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();
const JWT_SECRET = "secretpda_sejujun0401"; // ���߿� .env�� �и�

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: "�������� �ʴ� ������Դϴ�." });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "��й�ȣ�� Ʋ�Ƚ��ϴ�." });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 1000 * 60 * 60,
    });

    res.status(200).json({ message: "�α��� ����" });
  } catch (err) {
    console.error("�α��� ����:", err);
    res.status(500).json({ message: "���� ����" });
  }
});

module.exports = router;
