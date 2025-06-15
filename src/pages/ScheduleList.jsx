// src/pages/ScheduleList.jsx
import React from 'react';
import './ScheduleList.css';

const getDdayClass = (deadline) => {
  const today = new Date();
  const target = new Date(deadline);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diff = target - today;
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'd-day-today';
  if (diffDays > 0) return 'd-day-future';
  return 'd-day-past';
};
// ✅ D-Day 계산 함수
const getDday = (deadline) => {
  const today = new Date();
  const target = new Date(deadline);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  if (diffDays === 0) return 'D-DAY';
  return `D+${Math.abs(diffDays)}`;
};

const ScheduleList = ({ schedules, onToggleComplete }) => {
  // ✅ deadline 기준 정렬
  const sortedSchedules = [...schedules].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

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
        {sortedSchedules.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.deadline}</td>
            <td>
              <span className={getDdayClass(item.deadline)}>
                {getDday(item.deadline)}
              </span>
            </td>
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
