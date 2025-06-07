import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Calendar from './pages/Calendar';
import Header from './components/Header';
import ImageSlider from './components/ImageSlider';
import MainIntro from './pages/MainIntro';
import Footer from './components/Footer';
import Login from './pages/Login';
import ProfessorIntro from './pages/ProfessorIntro';
import ClubIntro from './pages/ClubIntro';
import Staff from './pages/Staff';

function App() {
  // ✅ 여기서 사용자 역할 설정 (로그인 연동 전에는 수동 테스트 가능)
  const user = {
    role: 'admin',      // 'admin' | 'user' | null
    isLoggedIn: true    // 로그인 여부
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ImageSlider />
              <MainIntro />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/intro/professors" element={<ProfessorIntro />} />
        <Route path="/intro/clubintro" element={<ClubIntro />} />
        <Route path="/intro/staff" element={<Staff />} />

        {/* ✅ 역할 기반으로 isAdmin props 전달 */}
        <Route
          path="/schedule/calendar"
          element={<Calendar isAdmin={user.role === 'admin'} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
