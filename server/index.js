const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const loginRouter = require("./api/login");
const signupRouter = require("./api/signup");
const logoutRouter = require("./api/logout");
const meRouter = require("./api/me");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://43.201.84.76", // 배포 시 주소 변경
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 연결
app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/me", meRouter);

app.listen(PORT, () => {
  console.log(`? Server running at http://43.201.84.76:${PORT}`);
});
