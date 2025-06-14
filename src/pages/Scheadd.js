// src/pages/Scheadd.js
import React from 'react';
import './Scheadd.css';

const Scheadd = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
  <button className="close-button" onClick={onClose}>닫기</button>
  <h2>일정 추가</h2>

  <form>
    <input type="text" placeholder="일정 이름" />
    <input type="datetime-local" />
    <button type="submit">추가</button>
  </form>
</div>

    </div>
  );
};

export default Scheadd;
