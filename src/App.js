import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import ImageSlider from './components/ImageSlider';
import MainIntro from './pages/MainIntro';
import Footer from './components/Footer';
import Login from './pages/Login';
import ProfessorIntro from './pages/ProfessorIntro';
import ClubIntro from './pages/ClubIntro';
import Staff from './pages/Staff';

function App() {
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

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
