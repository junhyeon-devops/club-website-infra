import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    studentId: "",
    grade: "",
    birth: "",
    email: ""
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/signup",
        {
          username: form.username,
          password: form.password,
          name: form.name,
          studentId: form.studentId,
          grade: form.grade,
          birth: form.birth,
          email: form.email,
        },
        { withCredentials: true } // 쿠키 전달
      );

      setSuccessMsg("회원가입 성공! 이제 로그인하세요.");
      setErrorMsg("");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "서버 오류");
      setSuccessMsg("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/loginlogo.png" alt="PDA 로고" />
        <p>PDA 회원가입</p>

        <input name="username" placeholder="아이디" value={form.username} onChange={handleChange} />
        <input name="password" type="password" placeholder="비밀번호" value={form.password} onChange={handleChange} />
        <input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={form.confirmPassword} onChange={handleChange} />
        <input name="name" placeholder="이름" value={form.name} onChange={handleChange} />
        <input name="studentId" placeholder="학번" value={form.studentId} onChange={handleChange} />
        <input name="grade" placeholder="학년" value={form.grade} onChange={handleChange} />
        <input name="birth" placeholder="생년월일" value={form.birth} onChange={handleChange} />
        <input name="email" placeholder="이메일" value={form.email} onChange={handleChange} />

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

        <button onClick={handleSignup}>가입하기</button>
      </div>
    </div>
  );
};

export default Signup;
