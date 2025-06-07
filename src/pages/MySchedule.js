// src/pages/MySchedule.jsx
import React, { useState } from 'react';
import './MySchedule.css';

const MySchedule = () => {
  const [filter, setFilter] = useState('in-progress');

  const schedules = [
    {
      id: 1,
      name: '웹소 과제',
      deadline: '25.05.26 16:00',
      dday: 'D-2',
      timeSpent: '01:30',
      completed: true,
    },
    {
      id: 2,
      name: '객설 발표',
      deadline: '25.06.17 16:00',
      dday: 'D-24',
      timeSpent: '00:30',
      completed: true,
    }
  ];

  return (
    <div className="schedule-wrapper">
      <button className="add-button">+ 일정 추가</button>

      <div className="tab-container">
        <button
          className={`tab ${filter === 'in-progress' ? 'active' : ''}`}
          onClick={() => setFilter('in-progress')}
        >
          진행 중
        </button>
        <button
          className={`tab ${filter === 'done' ? 'active' : ''}`}
          onClick={() => setFilter('done')}
        >
          완료
        </button>
      </div>

      <table className="schedule-table">
        <thead>
          <tr>
            <th>일정 이름</th>
            <th>기한</th>
            <th>D-Day</th>
            <th>누적 시간</th>
            <th>체크</th>
            <th>집중</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.deadline}</td>
              <td>{item.dday}</td>
              <td>{item.timeSpent}</td>
              <td><button className="check-btn">완료</button></td>
              <td><button className="focus-btn">집중모드</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySchedule;
