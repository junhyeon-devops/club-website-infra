import React from 'react';
import './Intro_top.css';

const Intro_top = ({ title = "소개", subtitle = "우리 동아리에 대해 소개합니다." }) => {
  return (
    <div className="intro-top-wrapper">
      <div className="intro-overlay" />
      <div className="intro-text-container">
        <h1 className="intro-title">
          {title}
          <span className="yellow-dot">.</span>
        </h1>
        <p className="intro-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default Intro_top;
