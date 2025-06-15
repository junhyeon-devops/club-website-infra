import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Recuit.css';
import { FaSearch, FaUser, FaClock, FaEye } from 'react-icons/fa';
import IntroTop from '../components/IntroTop';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const categories = ['전체', '대회/공모전', '프로젝트', '스터디', '자유게시판'];
const categoryColorMap = {
  '대회/공모전': '#ffe599',
  '프로젝트': '#cfe2ff',
  '스터디': '#d9ead3',
  '자유게시판': '#f4cccc'
};

function Recuit() {
  const { loading, isLogged } = useAuth();
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery || '전체');

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await axios.get('/api/posts', { withCredentials: true });
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts', err);
      }
    }
    loadPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
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

  let writeSection;
  if (loading) {
    writeSection = <div>로딩 중...</div>;
  } else if (isLogged) {
    writeSection = (
      <Link to="/community/recuit/write" className="write-button">
        글쓰기
      </Link>
    );
  }

  return (
    <>
      <IntroTop
        title="팀원 모집"
        subtitle="프로젝트 및 공모전 팀원을 모집합니다."
        backgroundImage="/community.jpg"
      />
      <div className="community-wrapper">
        {writeSection}
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
                    <span
                      className="category"
                      style={{
                        backgroundColor: categoryColorMap[post.category] || '#eee',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        color: '#333',
                        marginRight: '8px'
                      }}
                    >
                      {post.category}
                    </span>
                    <span className="title">{post.title}</span>
                  </div>
                  <div className="meta">
                    <span><FaClock style={{ marginRight: '4px' }} />{getTimeAgo(post.createdAt)}</span>
                    <span><FaUser style={{ marginRight: '4px' }} />{post.writer_name}</span>
                    <span><FaEye style={{ marginRight: '4px' }} />{post.views ?? 0}회</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>게시글이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Recuit;
