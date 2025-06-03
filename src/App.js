import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import ImageSlider from './ImageSlider';
import MainIntro from './MainIntro';
import Footer from './Footer';
import Login from './Login';
import ProfessorIntro from './ProfessorIntro';
import ClubIntro from './ClubIntro';
import Staff from './Staff';

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
