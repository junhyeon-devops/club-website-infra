// src/pages/SidebarMenu.jsx
import React from 'react';
import './SidebarMenu.css';

const SidebarMenu = ({ setFilter, filter }) => {
  return (
    <div className="sidebar">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        전체 일정
      </button>
      <button
        className={filter === 'done' ? 'active' : ''}
        onClick={() => setFilter('done')}
      >
        완료한 일정
      </button>
      <button
        className={filter === 'important' ? 'active' : ''}
        onClick={() => setFilter('important')}
      >
        중요한 일정
      </button>
    </div>
  );
};

export default SidebarMenu;
