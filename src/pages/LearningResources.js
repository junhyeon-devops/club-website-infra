import React, { useState } from 'react';
import './Recuit.css'; // 기존 스타일 재사용
import { FaSearch, FaLink } from 'react-icons/fa';
import Intro_top from '../components/Intro_top';

const data = [
  { id: 1, category: '웹', title: 'React 공식 문서', url: 'https://reactjs.org' },
  { id: 2, category: '웹', title: 'MDN JavaScript', url: 'https://developer.mozilla.org' },
  { id: 3, category: '웹', title: 'Vue.js 가이드', url: 'https://vuejs.org' },
  { id: 4, category: '알고리즘', title: 'BOJ(백준)', url: 'https://www.acmicpc.net' },
  { id: 5, category: '알고리즘', title: 'LeetCode', url: 'https://leetcode.com' },
  { id: 6, category: '자료구조', title: 'GeeksforGeeks - Data Structures', url: 'https://www.geeksforgeeks.org/data-structures/' },
  { id: 7, category: '자료구조', title: 'Visualgo - 자료구조 시각화', url: 'https://visualgo.net' },
  { id: 8, category: '운영체제', title: 'Linux kernel documentation', url: 'https://www.kernel.org/doc/html/latest/' },
  { id: 9, category: '운영체제', title: 'The Linux Command Line', url: 'http://linuxcommand.org/' },
  { id: 10, category: '운영체제', title: 'Windows Dev Center', url: 'https://developer.microsoft.com/windows/' }
];

const categories = ['전체', '웹', '알고리즘', '자료구조', '운영체제'];
const categoryColorMap = {
  웹: '#ffe599',
  알고리즘: '#cfe2ff',
  자료구조: '#d9ead3',
  운영체제: '#f4cccc'
};

function LearningResources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filtered = data.filter(
    item =>
      (selectedCategory === '전체' || item.category === selectedCategory) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Intro_top
        title="학습 자료"
        subtitle="유용한 개발 자료를 모았습니다."
        backgroundImage="/resources.jpg"
      />

      <div className="community-wrapper">
        <div className="top-bar">
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`tab-button ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="자료 검색"
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
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="post-line">
                  <div className="post-left">
                    <span
                      className="category"
                      style={{
                        backgroundColor: categoryColorMap[item.category] || '#eee',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        color: '#333',
                        marginRight: '8px'
                      }}
                    >
                      {item.category}
                    </span>                    
                    <span className="title">{item.title}</span>
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

export default LearningResources;
