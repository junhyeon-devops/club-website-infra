// Calendaradd.js
import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendaradd.css';
import { FaRegClock } from 'react-icons/fa'; // 🕒 시계 아이콘


registerLocale('ko', ko);

const Calendaradd = ({ isOpen, onClose, onSave, date }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(new Date(date));
    const [endDate, setEndDate] = useState(new Date(date));
    const [isAllDay, setIsAllDay] = useState(true);
    const [selectedColor, setSelectedColor] = useState('#4285F4'); // ✅ 요거 추가

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setStartDate(date);
            setEndDate(date);
            setIsAllDay(true);
            setSelectedColor('#4285F4'); // 기본색
        }
    }, [isOpen, date]);

    const handleSave = () => {
        onSave({
            title,
            start: startDate,
            end: endDate,
            allDay: isAllDay,
            color: selectedColor
        });
        onClose(); // 모달 닫기
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>×</span>
                <h3>일정 제목</h3>
                <div className="top-row">
                    <div className="color-title-wrap">
                        <div className="color-select">
                            <div className="color-dot" style={{ backgroundColor: selectedColor }}></div>
                            <select
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                className="color-dropdown"
                            >
                                <option value="#4285F4">파랑</option>
                                <option value="#EA4335">빨강</option>
                                <option value="#FBBC05">노랑</option>
                                <option value="#34A853">초록</option>
                            </select>
                        </div>

                        <input
                            type="text"
                            placeholder="일정 제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="title-input"
                        />
                    </div>

                    {/* ✅ 시작일은 다음 줄에 배치 */}
                    <div className="start-date-row">
                        <DatePicker
                            locale="ko"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy. M. d. (eee)"
                            className="datepicker-inline"
                        />
                    </div>

                    <div className="bottom-row">
                        <FaRegClock className="clock-icon" />
                        <DatePicker
                            locale="ko"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="yyyy. M. d. (eee)"
                            className="datepicker-inline"
                        />
                    </div>

                    <div className="btn-group">
                        <button onClick={handleSave}>저장</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Calendaradd;
