// src/pages/ScheduleList.jsx
import React from 'react';
import './ScheduleList.css';

const ScheduleList = ({ schedules, onToggleComplete }) => {
  return (
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
        {schedules.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.deadline}</td>
            <td>{item.dday}</td>
            <td>{item.timeSpent}</td>
            <td>
              <button className="check-btn" onClick={() => onToggleComplete(item.id)}>
                {item.completed ? '완료' : '진행 중'}
              </button>
            </td>
            <td>
              <button className="focus-btn">집중모드</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScheduleList;
