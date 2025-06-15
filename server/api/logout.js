const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "로그아웃 되었습니다." });
});

module.exports = router;
