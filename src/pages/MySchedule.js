// src/pages/MySchedule.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Intro_top from '../components/Intro_top';
import ScheduleList from './ScheduleList';
import Scheadd from './Scheadd';
import './MySchedule.css';

const MySchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [filter, setFilter] = useState('전체');

  const fetchSchedules = async () => {
    try {
      const res = await axios.get('/api/schedules', { withCredentials: true });
      setSchedules(res.data);
    } catch (err) {
      console.error('일정 로딩 실패:', err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleToggleComplete = async (id) => {
    const target = schedules.find(s => s.id === id);
    try {
      await axios.patch(`/api/schedules/${id}`, { completed: !target.completed }, { withCredentials: true });
      fetchSchedules();
    } catch (err) {
      console.error('완료 상태 업데이트 실패:', err);
    }
  };

  const handleModalClose = (saved) => {
    setIsModalOpen(false);
    if (saved) fetchSchedules();
  };

  const filteredSchedules = schedules.filter(s => {
    if (filter === '완료') return s.completed;
    if (filter === '진행중') return s.important;
    return true;
  });

  return (
    <>
      <Intro_top
        title="내 일정"
        subtitle="내 일정을 관리할 수 있는 페이지입니다"
        backgroundImage="/calendar.jpg"
      />

      <div className="schedule-layout">
        <div className="sidebar">
          <button className="add-button sidebar-add-button" onClick={() => setIsModalOpen(true)}>
            + 일정 추가
          </button>
          <ul className="filter-list">
            <li onClick={() => setFilter('전체')} className={filter === '전체' ? 'active' : ''}>
              전체 <span className="count">{schedules.length}</span>
            </li>
            <li onClick={() => setFilter('완료')} className={filter === '완료' ? 'active' : ''}>
              완료 <span className="count">{schedules.filter(s => s.completed).length}</span>
            </li>
            <li onClick={() => setFilter('진행중')} className={filter === '진행중' ? 'active' : ''}>
              진행중 <span className="count">{schedules.filter(s => s.important).length}</span>
            </li>
          </ul>
        </div>

        <div className="main-content">
          {filteredSchedules.length === 0 ? (
            <div className="empty-state" style={{ minHeight: '60vh' }}>
              <h3>할 일이 없습니다.</h3>
              <p>새로운 할 일을 등록해보세요.</p>
              <button className="add-button" onClick={() => setIsModalOpen(true)}>
                + 일정 추가
              </button>
            </div>
          ) : (
            <>
              <ScheduleList schedules={filteredSchedules} onToggleComplete={handleToggleComplete} />
              <div className="button-wrapper">
                <button className="add-button" onClick={() => setIsModalOpen(true)}>
                  + 일정 추가
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isModalOpen && <Scheadd isOpen onClose={handleModalClose} />}
    </>
  );
};

export default MySchedule;
