import React, { useState, useEffect } from 'react';
import './Recuit.css';
import { FaHeart, FaComment, FaSearch, FaUser, FaClock, FaEye } from 'react-icons/fa';
import Intro_top from '../components/Intro_top';
import { Link, useSearchParams } from 'react-router-dom';

export const initialPosts = [
  {
    id: 1,
    title: '배리어프리 앱 개발 콘테스트 (~5/21)',
    category: '대회/공모전',
    writer: 'admin',
    views: 122,
    likes: 14,
    body: '이 행사는 Qualcomm과 Microsoft가 함께 개최하는 Edge AI 기반 해커톤입니다.',
    image: '/1stpost.png',
    comments: []
  },
  {
    id: 2,
    title: '캡스톤 발표 일정 안내',
    category: '공지사항',
    writer: '교수님',
    views: 55,
    likes: 3,
    body: '2학기 캡스톤 디자인 중간 발표는 6월 초에 진행될 예정입니다.',
    image: '/2ndpost.png',
    comments: []
  }
];

const categories = ['전체', '대회/공모전', '프로젝트', '스터디', '자유게시판'];

function Recuit() {
  
 const [searchParams, setSearchParams] = useSearchParams();
 const categoryFromQuery = searchParams.get('category');
 const [searchTerm, setSearchTerm] = useState('');
 const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery || '전체');
    useEffect(() => {
    const category = searchParams.get('category') || '전체';
    setSelectedCategory(category);
  }, [searchParams]);

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
        <Link to="/community/recuit/write" className="write-button">
            글쓰기
          </Link>
        <div className="top-bar">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`tab-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
  setSelectedCategory(category);
  setSearchParams({ category });
}}
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
