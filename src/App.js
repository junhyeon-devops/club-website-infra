import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import ImageSlider from './ImageSlider';
import MainIntro from './MainIntro';
import Footer from './Footer';
import Login from './Login';
import ProfessorIntro from './ProfessorIntro';
import ClubIntro from './ClubIntro'; // 동아리 연혁 페이지
import Staff from './Staff';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* 메인 화면 */}
        <Route
          path="/"
          element={
            <>
              <ImageSlider />
              <MainIntro />
            </>
          }
        />

        {/* 로그인 */}
        <Route path="/login" element={<Login />} />

        {/* 소개 - 교수님 */}
        <Route path="/intro/professors" element={<ProfessorIntro />} />

        {/* 소개 - 동아리 연혁 */}
        <Route path="/intro/clubintro" element={<ClubIntro />} />

        <Route path="/intro/staff" element={<Staff />} />
        {/* <Route path="/schedule/club" element={<ClubSchedule />} /> */}
        {/* <Route path="/community/recruit" element={<RecruitBoard />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
