import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendaradd.css';

registerLocale('ko', ko);


const DateButton = React.forwardRef(({ value, onClick }, ref) => (
  <div className="datepicker-button" onClick={onClick} ref={ref}>
    {value || '날짜 선택'}
  </div>
));

const Calendaradd = ({ isOpen, onClose, onSave, date }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date(date));
  const [endDate, setEndDate] = useState(new Date(date));

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setStartDate(date);
      setEndDate(date);
    }
  }, [isOpen, date]);

  const handleSave = () => {
    onSave({
      title,
      start: startDate,
      end: endDate,
      allDay: true
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>×</span>
        <h3>일정 제목</h3>

        <input
          type="text"
          placeholder="일정 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />

        <div className="start-date-row">
          <DatePicker
            locale="ko"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy. M. d. (eee)"
            customInput={<DateButton />}
          />
        </div>

        <div className="start-date-row">
          <DatePicker
            locale="ko"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy. M. d. (eee)"
            customInput={<DateButton />}
          />
        </div>

        <div className="btn-group">
          <button onClick={handleSave}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default Calendaradd;
