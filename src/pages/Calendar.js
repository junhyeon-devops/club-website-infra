import React, { useState, useRef, useEffect } from 'react';
import './Calendar.css';
import IntroTop from '../components/IntroTop';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ko from '@fullcalendar/core/locales/ko';
import Calendaradd from './Calendaradd';

function Calendar({ isAdmin }) {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const calendarRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState('');


  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      setCurrentTitle(calendarApi.view.title);
    }
  }, []);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
    setModalOpen(true);
  };


  const handleAddEvent = (newEvent) => {
    setEvents([...events,
    {
      ...newEvent,
      allDay: newEvent.allDay,
      backgroundColor: newEvent.color,
      borderColor: newEvent.color
    }]);
  };

  return (
    <>
      <IntroTop
        title="캘린더"
        subtitle="학사 일정과 동아리 일정을 확인할 수 있는 캘린더입니다"
        backgroundImage="/calendar.jpg"
      />
      <div className="calendar-wrapper">
        <div className="custom-toolbar">
          <button
            className="nav-btn"
            onClick={() => {
              calendarRef.current?.getApi().prev();
              setCurrentTitle(calendarRef.current?.getApi().view.title);
            }}
          >
            ‹
          </button>
          <h2 className="calendar-title">{currentTitle}</h2>
          <button
            className="nav-btn"
            onClick={() => {
              calendarRef.current?.getApi().next();
              setCurrentTitle(calendarRef.current?.getApi().view.title);
            }}
          >
            ›
          </button>
        </div>

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={ko}
          events={events}
          headerToolbar={false}
          dateClick={handleDateClick}
          dayMaxEvents={3}
          dayCellContent={(arg) => (
            <div className="fc-daygrid-day-number">{arg.date.getDate()}</div>
          )}
        />

        <Calendaradd
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleAddEvent}
          date={selectedDate}
        />
      </div>
    </>
  );
}

export default Calendar;
