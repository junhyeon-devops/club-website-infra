import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false); // ✅ 모달 표시 여부

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

        <button disabled={!username || !password}>로그인</button>

        {/* ✅ 회원가입 링크 */}
        <div className="switch-link" onClick={() => setShowSignup(true)}>
          아직 계정이 없으신가요? <b>회원가입</b>
        </div>
      </div>

      {/* ✅ 모달 */}
      {showSignup && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>회원가입</h2>

      <input type="text" placeholder="이름" />
      <input type="text" placeholder="학번" />
      <input type="email" placeholder="이메일 주소" />
      <input type="text" placeholder="아이디" />
      <input type="password" placeholder="비밀번호" />
      <input type="password" placeholder="비밀번호 확인" />
      <button>회원가입</button>
      <div className="close-btn" onClick={() => setShowSignup(false)}>×</div>
    </div>
  </div>
)}

    </div>
  );
};

export default Login;
