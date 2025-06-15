import React, { useState, useEffect, useRef } from 'react';
import './Pomodoro.css';

const PomodoroTimer = ({ onClose, taskName }) => {
  const [step, setStep] = useState(1); // 1: 설정, 2: 타이머
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const totalTime = focusMinutes * 60;
  const center = 200;
  const blockRadius = 160;
  const blockSize = 10;
  const filledBlocks = Math.floor(((totalTime - timeLeft) / totalTime) * 60);

  const formatMin = (sec) => String(Math.floor(sec / 60)).padStart(2, '0');
  const formatSec = (sec) => String(sec % 60).padStart(2, '0');

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          alert('⏰ 집중 끝! 휴식하세요.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const renderBlocks = () => {
    const blocks = [];
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6 - 90) * (Math.PI / 180);
      const x = center + blockRadius * Math.cos(angle);
      const y = center + blockRadius * Math.sin(angle);
      const rotate = i * 6;
      blocks.push(
        <rect
          key={i}
          x={x - blockSize / 2}
          y={y - blockSize / 2}
          width={blockSize}
          height={blockSize}
          fill={i < filledBlocks ? '#f18700' : '#ddd'}
          transform={`rotate(${rotate} ${x} ${y})`}
        />
      );
    }
    return blocks;
  };

  const renderAngleLabels = () => {
    const labels = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const r = blockRadius + 25;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      labels.push(
        <text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#000"
        >
          {i * 5}°
        </text>
      );
    }
    return labels;
  };

  const handleSetupSubmit = () => {
    const sec = focusMinutes * 60;
    setTimeLeft(sec);
    setStep(2);
  };

  return (
    <div className="pomodoro-overlay">
      <div className="pomodoro-box">

        {step === 1 && (
          <>
            <h2>집중 시간 설정</h2>
            <label>
              집중 시간 (분):&nbsp;
              <input
                type="number"
                value={focusMinutes}
                onChange={(e) => setFocusMinutes(Number(e.target.value))}
              />
            </label>
            <br /><br />
            <label>
              휴식 시간 (분):&nbsp;
              <input
                type="number"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Number(e.target.value))}
              />
            </label>
            <br /><br />
            <button onClick={handleSetupSubmit}>타이머 시작</button>
            <button className="close-btn" onClick={onClose}>취소</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>{taskName} 집중 모드</h2>
            <div className="clock-container">
              <svg width="400" height="400">
                <circle
                  cx={center}
                  cy={center}
                  r={blockRadius}
                  fill="black"
                  stroke="white"
                  strokeWidth="2"
                />
                {renderBlocks()}
                {renderAngleLabels()}
                <text
                  x={center}
                  y={center - 15}
                  textAnchor="middle"
                  fontSize="48"
                  fill="#fff"
                >
                  {formatMin(timeLeft)}<tspan fontSize="18"> M</tspan>
                </text>
                <text
                  x={center}
                  y={center + 35}
                  textAnchor="middle"
                  fontSize="36"
                  fill="#fff"
                >
                  {formatSec(timeLeft)}<tspan fontSize="18"> S</tspan>
                </text>
              </svg>
            </div>
            <div className="controls">
              <button onClick={startTimer}>시작</button>
              <button onClick={pauseTimer}>일시정지</button>
              <button onClick={resetTimer}>초기화</button>
            </div>
            <button className="close-btn" onClick={onClose}>닫기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
