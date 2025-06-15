// src/pages/MySchedule.jsx
import React, { useState } from 'react';
import Intro_top from '../components/Intro_top';
import ScheduleList from './ScheduleList';
import Scheadd from './Scheadd';
import './MySchedule.css';

const MySchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      name: '알고리즘 과제',
      deadline: '2025-06-17 23:59',
      timeSpent: '2시간',
      completed: false,
      important: true,
    },
    {
      id: 2,
      name: '운동하기',
      deadline: '2025-06-15 18:00',
      timeSpent: '1시간',
      completed: true,
      important: false,
    },
  ]);
  const [filter, setFilter] = useState('전체');

  const handleToggleComplete = (id) => {
    setSchedules(prev =>
      prev.map(schedule =>
        schedule.id === id ? { ...schedule, completed: !schedule.completed } : schedule
      )
    );
  };

  const filteredSchedules = schedules.filter(schedule => {
    if (filter === '완료') return schedule.completed;
    if (filter === '진행중') return schedule.important;
    return true; // 전체 or 할 일
  });

  return (
    <>
      <Intro_top
        title="내 일정"
        subtitle="내 일정을 관리할 수 있는 페이지입니다"
        backgroundImage="/calendar.jpg"
      />

      <div className="schedule-layout">
        {/* ✅ 왼쪽 사이드바 */}
        <div className="sidebar">
          <button
            className="add-button sidebar-add-button"
            onClick={() => setIsModalOpen(true)}
          >
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

        {/* ✅ 오른쪽 메인 컨텐츠 */}
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
              <ScheduleList
                schedules={filteredSchedules}
                onToggleComplete={handleToggleComplete}
              />
              <div className="button-wrapper">
                <button className="add-button" onClick={() => setIsModalOpen(true)}>
                  + 일정 추가
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ✅ 일정 추가 모달 */}
      {isModalOpen && <Scheadd onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default MySchedule;
