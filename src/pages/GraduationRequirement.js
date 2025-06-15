// src/pages/GraduationRequirements.jsx
import React, { useState } from 'react';
import './Recuit.css'; // 기존 스타일 재활용
import Intro_top from '../components/Intro_top';
import { FaSearch, FaLink } from 'react-icons/fa';

// 최신 학번이 위로 오도록 배열 정렬 (내림차순)
const requirements = [
  { id: 25, label: '2025학번', url: 'https://software.cbnu.ac.kr/sub0501/671048' },
  { id: 24, label: '2024학번', url: 'https://software.cbnu.ac.kr/sub0501/16401' },
  { id: 23, label: '2023학번', url: 'https://software.cbnu.ac.kr/sub0501/14714' },
  { id: 22, label: '2022학번', url: 'https://software.cbnu.ac.kr/sub0501/11631' },
  { id: 21, label: '2021학번', url: 'https://software.cbnu.ac.kr/sub0501/7594' },
  { id: 20, label: '2020학번', url: 'https://software.cbnu.ac.kr/sub0501/7591' },
  { id: 19, label: '2019학번', url: 'https://software.cbnu.ac.kr/sub0501/7589' },
  { id: 18, label: '2018학번', url: 'https://software.cbnu.ac.kr/sub0501/7585' },
  { id: 17, label: '2017학번', url: 'https://software.cbnu.ac.kr/sub0501/7583' },
];

function GraduationRequirements() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = requirements.filter(item =>
    item.label.includes(searchTerm)
  );

  return (
    <>
      <Intro_top
        title="졸업 요건"
        subtitle="학번별 졸업 요건을 확인하세요."
        backgroundImage="/resources.jpg"
      />

      <div className="community-wrapper">
        <div className="top-bar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="학번 검색 (예: 2021)"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button><FaSearch /></button>
          </div>
        </div>

        <div className="post-list">
          {filtered.length > 0 ? (
            filtered.map(item => (
              <a
                key={item.id}
                href={item.url}
                className="post-card"
                target={item.url ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                <div className="post-line">
                  <div className="post-left">
                    <span className="category">학번</span>
                    <span className="title">{item.label}</span>
                  </div>
                  <div className="meta">
                    <FaLink style={{ marginRight: '4px' }} />
                  </div>
                </div>
              </a>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default GraduationRequirements;
