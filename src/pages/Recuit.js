import React, { useState } from 'react';
import './Recuit.css';
import { FaHeart, FaComment, FaSearch, FaUser, FaClock, FaEye } from 'react-icons/fa';
import Intro_top from '../components/Intro_top';
import { Link } from 'react-router-dom';

export const initialPosts = [
  {
    id: 1,
    category: '대회/공모전',
    title: '배리어프리 앱 개발 콘테스트 (~5/21)',
    writer: 'admin',
    createdAt: '2025-06-13T15:23:00',
    likes: 14,
    comments: 1,
    views: 122,
  },
  {
    id: 2,
    category: '대회/공모전',
    title: '2025 환경 데이터 활용 및 분석 공모전 (~5/19)',
    writer: 'admin',
    createdAt: '2025-06-14T15:23:00',
    likes: 14,
    comments: 1,
    views: 85,
  },
  {
    id: 3,
    category: '대회/공모전',
    title: '2025년 직무 잡아드림 동아리 모집 (~5/2)',
    writer: '정선미',
    createdAt: '2025-06-12T09:00:00',
    likes: 8,
    comments: 4,
    views: 74,
  },
];

const categories = ['전체', '대회/공모전', '프로젝트', '스터디'];

function Recuit() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredPosts = initialPosts.filter(
    post =>
      (selectedCategory === '전체' || post.category === selectedCategory) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTimeAgo = (createdAt) => {
    if (!createdAt) return '';
    const now = new Date();
    const created = new Date(createdAt);
    const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '어제';
    return `${diffDays}일 전`;
  };

  return (
    <>
      <Intro_top
        title="팀원 모집"
        subtitle="프로젝트 및 공모전 팀원을 모집합니다."
        backgroundImage="/community.jpg"
      />

      <div className="community-wrapper">
        <div className="top-bar">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`tab-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="검색어 입력: "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button><FaSearch /></button>
          </div>
        </div>

        <div className="post-list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link to={`/post/${post.id}`} className="post-card" key={post.id}>
                <div className="post-line">
                  <div className="post-left">
                    <span className="category">{post.category}</span>
                    <span className="title">{post.title}</span>
                  </div>
                  <div className="meta">
                    <span><FaClock style={{ marginRight: '4px' }} />{getTimeAgo(post.createdAt)}</span>
                    <span><FaUser style={{ marginRight: '4px' }} />{post.writer}</span>
                    <span><FaEye style={{ marginRight: '4px' }} />{post.views ?? 0}회</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Recuit;
