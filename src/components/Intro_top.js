import React from 'react';
import './Intro_top.css'; // CSS 분리 권장

const Intro_top = () => {
  return (
    <div className="intro-top-wrapper">
      <div className="intro-overlay" />
      <div className="intro-text-container">
        <h1 className="intro-title">소개<span className="blue-dot">.</span></h1>
        <p className="intro-subtitle">우리 동아리에 대해 소개합니다.</p>
      </div>
    </div>
  );
};

export default Intro_top;
