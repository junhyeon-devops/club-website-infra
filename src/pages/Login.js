import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    studentId: "",
    grade: "",
    email: ""
  });
  const [signupErrorMsg, setSignupErrorMsg] = useState("");
  const [signupSuccessMsg, setSignupSuccessMsg] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/login",
        { username, password },
        { withCredentials: true }
      );
      await login();
      navigate(from, { replace: true});
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "서버 오류");
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      setSignupErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post(
        "/api/signup",
        {
          username: form.username,
          password: form.password,
          name: form.name,
          studentId: form.studentId,
          grade: form.grade,
          email: form.email,
        },
        { withCredentials: true }
      );

      setSignupSuccessMsg("회원가입 성공! 이제 로그인하세요.");
      setSignupErrorMsg("");
    } catch (err) {
      setSignupErrorMsg(err.response?.data?.message || "서버 오류");
      setSignupSuccessMsg("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/loginlogo.png" alt="PDA 로고" />
        <p>PDA 공식 로그인 시스템</p>

        <form onSubmit={handleLogin}>
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
        </form>
        

        <div className="switch-link" onClick={() => setShowSignup(true)}>
          아직 계정이 없으신가요? <b>회원가입</b>
        </div>
      </div>

      {showSignup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>회원가입</h2>

            <input name="username" placeholder="아이디" value={form.username} onChange={handleSignupChange} />
            <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleSignupChange} />
            <input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={form.confirmPassword} onChange={handleSignupChange} />
            <input name="name" placeholder="이름" value={form.name} onChange={handleSignupChange} />
            <input name="studentId" placeholder="학번" value={form.studentId} onChange={handleSignupChange} />
            <input name="grade" placeholder="학년" value={form.grade} onChange={handleSignupChange} />
            <input name="email" placeholder="이메일" value={form.email} onChange={handleSignupChange} />

            {signupErrorMsg && <p style={{ color: "red" }}>{signupErrorMsg}</p>}
            {signupSuccessMsg && <p style={{ color: "green" }}>{signupSuccessMsg}</p>}

            <button onClick={handleSignup}>가입하기</button>
            <div className="close-btn" onClick={() => setShowSignup(false)}>×</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
