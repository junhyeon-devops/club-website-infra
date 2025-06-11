import React from 'react';
import './Intro_top.css';

const Intro_top = ({ title = "대체 타이틀", subtitle = "대체 서브 타이틀입니다.", backgroundImage }) => {
  return (
    <div
      className="intro-top-wrapper"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
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
