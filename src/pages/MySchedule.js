// src/pages/MySchedule.jsx
import React, { useState } from 'react';
import Intro_top from '../components/Intro_top';
import ScheduleList from './ScheduleList';
import Scheadd from './Scheadd';
import './MySchedule.css';

const MySchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules, setSchedules] = useState([]); // 초기에는 비어 있음

  const handleToggleComplete = (id) => {
    setSchedules(prev =>
      prev.map(schedule =>
        schedule.id === id ? { ...schedule, completed: !schedule.completed } : schedule
      )
    );
  };

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
          {/* 향후 필터 버튼 추가 가능 */}
        </div>

        {/* ✅ 오른쪽 메인 컨텐츠 */}
        <div className="main-content">
          {/* 일정이 없을 때 메시지 + 버튼 */}
          {schedules.length === 0 ? (
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
                schedules={schedules}
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
