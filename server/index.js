const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

const loginRouter = require("./api/login");
const signupRouter = require("./api/signup");
const logoutRouter = require("./api/logout");
const meRouter = require("./api/me");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/me", meRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
