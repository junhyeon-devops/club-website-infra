const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "secretpda_sejujun0401";

router.get("/", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "로그인되어 있지 않습니다." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.status(401).json({ message: "토큰이 유효하지 않습니다." });
  }
});

module.exports = router;
