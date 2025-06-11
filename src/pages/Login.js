import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "/api/login",
        { username, password },
        { withCredentials: true } // ✅ 쿠키 받기 위한 설정
      );
      alert("로그인 성공!");
      // 이후 /mypage 이동 등 처리 가능
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "서버 오류");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/loginlogo.png" alt="PDA 로고" />
        <p>PDA 공식 로그인 시스템</p>

        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <button onClick={handleLogin} disabled={!username || !password}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
