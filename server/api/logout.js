const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "�α׾ƿ� �Ǿ����ϴ�." });
});

module.exports = router;
