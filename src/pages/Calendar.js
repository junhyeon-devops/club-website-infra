import React, { useState, useRef, useEffect } from 'react';
import './Calendar.css';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar({ isAdmin }) {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState('');

  // 현재 월 제목 업데이트
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      setCurrentTitle(calendarApi.view.title);
    }
  }, []);

  const handlePrev = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi.prev();
    setCurrentTitle(calendarApi.view.title);
  };

  const handleNext = () => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi.next();
    setCurrentTitle(calendarApi.view.title);
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <h2>캘린더<span className="dot">.</span></h2>
        <p>학사 일정과 동아리 일정을 확인할 수 있는 캘린더입니다.</p>
      </div>

      <div className="custom-toolbar">
        <button className="nav-btn" onClick={handlePrev}>‹</button>
        <h2 className="calendar-title">{currentTitle}</h2>
        <button className="nav-btn" onClick={handleNext}>›</button>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        events={events}
        height="auto"
        headerToolbar={false} // ✅ 기본 헤더 제거
      />
    </div>
  );
}

export default Calendar;
