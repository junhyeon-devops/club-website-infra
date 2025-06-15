// src/pages/Scheadd.js
import React, { useState } from 'react';
import axios from 'axios';
import './Scheadd.css';

const Scheadd = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [important, setImportant] = useState(false);

  const handleSave = async () => {
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
      <div className="modal-overlay">
      <div className="modal-content">
        <h2>일정 추가</h2>
        <input placeholder="이름" value={name} onChange={e => setName(e.target.value)} />
        <input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
        {/* <label>
          <input type="checkbox" checked={important} onChange={e => setImportant(e.target.checked)} />
          중요
        </label>*/}
        <button onClick={handleSave}>저장</button>
        <button onClick={() => onClose(false)}>취소</button>
      </div>
    </div>
    );
  } else {
    return null;
  }
};

export default Scheadd;
