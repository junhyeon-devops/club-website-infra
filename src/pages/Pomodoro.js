import React, { useState, useEffect, useRef } from 'react';
import './Pomodoro.css';

const PomodoroTimer = ({ onClose, taskName }) => {
    const [step, setStep] = useState(1);
    const [focusMinutes, setFocusMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    const totalBlocks = 60;
    const activeBlocks = Math.min(focusMinutes, totalBlocks);
    const totalTime = focusMinutes * 60;

    const center = 200;
    const rInner = 120;
    const rOuter = 160;

    const formatMin = (sec) => String(Math.floor(sec / 60)).padStart(2, '0');
    const formatSec = (sec) => String(sec % 60).padStart(2, '0');

    const getRemainingActiveBlocks = () => {
        if (step !== 2) return activeBlocks;
        if (timeLeft <= 0) return 0;
        return Math.ceil((timeLeft / totalTime) * activeBlocks);
    };

    const remainingActiveBlocks = getRemainingActiveBlocks();

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

    const makeWedgePath = (startDeg, endDeg, r1, r2) => {
        const sRad = (Math.PI / 180) * startDeg;
        const eRad = (Math.PI / 180) * endDeg;
        const x1 = center + r2 * Math.cos(sRad);
        const y1 = center + r2 * Math.sin(sRad);
        const x2 = center + r2 * Math.cos(eRad);
        const y2 = center + r2 * Math.sin(eRad);
        const x3 = center + r1 * Math.cos(eRad);
        const y3 = center + r1 * Math.sin(eRad);
        const x4 = center + r1 * Math.cos(sRad);
        const y4 = center + r1 * Math.sin(sRad);
        return `
      M ${x1} ${y1}
      A ${r2} ${r2} 0 0 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${r1} ${r1} 0 0 0 ${x4} ${y4}
      Z
    `;
    };

    const renderBlocks = () => {
        const blocks = [];
        const blockAngle = 360 / totalBlocks;
        for (let i = 0; i < totalBlocks; i++) {
            const startDeg = i * blockAngle - 90;
            const endDeg = (i + 1) * blockAngle - 90;
            const fillColor = i < activeBlocks && i < remainingActiveBlocks ? '#f18700' : '#ddd';

            blocks.push(
                <path
                    key={i}
                    d={makeWedgePath(startDeg, endDeg, rInner, rOuter)}
                    fill={fillColor}
                />
            );
        }
        return blocks;
    };

    const renderAngleLabels = () => {
        const labels = [];
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const r = rOuter + 12;
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
                    {i * 5}
                </text>
            );
        }
        return labels;
    };

    const handleSetupSubmit = () => {
        setTimeLeft(focusMinutes * 60);
        setStep(2);
    };

    return (
        <div className="pomodoro-overlay">
            <div className="pomodoro-box">
                  <div className="close-icon" onClick={onClose}>×</div>

                {step === 1 ? (
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
                        <button onClick={handleSetupSubmit}>타이머 시작</button>                    </>
                ) : (
                    <>
                        <h2>{taskName} 집중 모드</h2>
                        <div className="clock-container">
                            <svg width="400" height="400">
                                <circle
                                    cx={center}
                                    cy={center}
                                    r={rOuter}
                                    fill="white"
                                    stroke="white"
                                    strokeWidth="2"
                                />
                                {renderBlocks()}
                                {renderAngleLabels()}
                                <text
                                    x={center}
                                    y={center + 15}
                                    textAnchor="middle"
                                    fontSize="48"
                                    fill="#000000"
                                    fontFamily="'Share Tech Mono', monospace"
                                >
                                    {formatMin(timeLeft)}:{formatSec(timeLeft)}
                                </text>
                            </svg>
                        </div>
                        <div className="controls">
                            <button onClick={startTimer}>시작</button>
                            <button onClick={pauseTimer}>일시정지</button>
                            <button onClick={resetTimer}>초기화</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PomodoroTimer;
