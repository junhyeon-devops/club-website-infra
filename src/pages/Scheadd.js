// src/pages/Scheadd.js
import React, { useState } from 'react';
import axios from 'axios';
import './Scheadd.css';

const Scheadd = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [important, setImportant] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/schedules', { name, deadline, important }, { withCredentials: true});
      onClose(true);
    } catch (err) {
      console.error('일정 추가 실패: ', err);
      onClose(false);
    }
  };

  if (isOpen) {
    return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* 닫기 버튼은 우상단 고정 */}
        <span className="close-button" onClick={onClose}>×</span>

        {/* 제목은 중앙 정렬 */}
        <h2 className="modal-title">일정 추가</h2>

        <form onSubmit={handleSave} className="modal-form">
          <input 
            type="text" 
            placeholder="일정 이름" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
          <input 
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <button type="submit" className="modal-save-button">추가</button>
        </form>
      </div>
    </div>
  );
  } else {
    return null;
  }
};

export default Scheadd;
