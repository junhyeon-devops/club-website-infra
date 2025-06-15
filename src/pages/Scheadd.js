// src/pages/Scheadd.js
import React from 'react';
import './Scheadd.css';

const Scheadd = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* 닫기 버튼은 우상단 고정 */}
        <span className="close-button" onClick={onClose}>×</span>

        {/* 제목은 중앙 정렬 */}
        <h2 className="modal-title">일정 추가</h2>

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
