import React, { useState } from 'react';
import './Recuit.css';
import { FaHeart, FaComment } from 'react-icons/fa';

const initialPosts = [
  {
    id: 1,
    category: '대회/공모전',
    title: '배리어프리 앱 개발 콘테스트 (~5/21)',
    writer: '21학번 정선미',
    time: '1일 전',
    likes: 14,
    comments: 1,
  },
  {
    id: 2,
    category: '대회/공모전',
    title: '2025 환경 데이터 활용 및 분석 공모전 (~5/19)',
    writer: '21학번 정선미',
    time: '2일 전',
    likes: 14,
    comments: 0,
  },
  {
    id: 3,
    category: '대회/공모전',
    title: '2025년 직무 잡아드림 동아리 모집 (~5/2)',
    writer: '21학번 정선미',
    time: '2일 전',
    likes: 8,
    comments: 4,
  },
];

function Recuit() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = initialPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="community-wrapper">
      <h1>커뮤니티</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="검색어 입력 또는 카테고리 선택..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button><span role="img" aria-label="search">🔍</span></button>
      </div>

      <div className="post-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <span className="category">{post.category}</span>
              <h3>{post.title}</h3>
              <div className="meta">
                <span>{post.time}</span>
                <span>{post.writer}</span>
                <span className="icons">
                  <FaHeart /> {post.likes}
                  <FaComment style={{ marginLeft: '8px' }} /> {post.comments}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default Recuit;
