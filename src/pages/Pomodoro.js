import React, { useState, useEffect, useRef } from 'react';
import './Pomodoro.css';

const PomodoroTimer = ({ onClose, taskName }) => {
  const totalTime = 35 * 60 + 14; // 예시값
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const center = 150;
  const blockRadius = 110; // 사각형 원형 경로 반지름
  const blockSize = 8; // 사각형 한변
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
          fill={i < filledBlocks ? '#f18700' : '#ccc'}
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
      const r = 135;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      labels.push(
        <text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fill="#000"
        >
          {i * 5}°
        </text>
      );
    }
    return labels;
  };

  return (
    <div className="pomodoro-overlay">
      <div className="pomodoro-box">
        <h2>{taskName} 집중 모드</h2>
        <div className="clock-container">
          <svg width="300" height="300">
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
            {/* 중앙 디지털 시계 */}
            <text
              x={center}
              y={center - 10}
              textAnchor="middle"
              fontSize="36"
              fill="#000"
            >
              {formatMin(timeLeft)}<tspan fontSize="14"> M</tspan>
            </text>
            <text
              x={center}
              y={center + 24}
              textAnchor="middle"
              fontSize="28"
              fill="#000"
            >
              {formatSec(timeLeft)}<tspan fontSize="14"> S</tspan>
            </text>
          </svg>
        </div>
        <div className="controls">
          <button onClick={startTimer}>시작</button>
          <button onClick={pauseTimer}>일시정지</button>
          <button onClick={resetTimer}>초기화</button>
        </div>
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
