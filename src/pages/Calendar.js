import React, { useState, useRef, useEffect } from 'react';
import './Calendar.css';
import Intro_top from '../components/Intro_top';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ko from '@fullcalendar/core/locales/ko'

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
    
    <>
      <Intro_top title="캘린더" 
      subtitle="학사 일정과 동아리 일정을 확인할 수 있는 캘린더입니다" 
      backgroundImage="/calendar.jpg"
    />
    <div className="calendar-wrapper">

      <div className="custom-toolbar">
        <button className="nav-btn" onClick={handlePrev}>‹</button>
        <h2 className="calendar-title">{currentTitle}</h2>
        <button className="nav-btn" onClick={handleNext}>›</button>
      </div>

<FullCalendar
  ref={calendarRef}
  plugins={[dayGridPlugin, interactionPlugin]}
  initialView="dayGridMonth"
  locale="ko"  // ✅ 문자열 대신 locale 객체
  events={events}
  headerToolbar={false}
  titleFormat={{ year: 'numeric', month: 'long' }}  // 기본 값

  dayCellContent={(arg) => {
    // ✅ 날짜 부분만 숫자로 직접 출력 (한글화 방지)
    return (
      <div className="fc-daygrid-day-number">
        {arg.date.getDate()}
      </div>
    );
  }}
/>
    </div>
  </>
  );
}

export default Calendar;
