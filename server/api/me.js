const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "secretpda_sejujun0401";

router.get("/", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "�α��εǾ� ���� �ʽ��ϴ�." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: "��ū�� ��ȿ���� �ʽ��ϴ�." });
  }
});

module.exports = router;
