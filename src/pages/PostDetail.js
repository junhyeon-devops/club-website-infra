import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialPosts } from '../pages/Recuit';
import { FaHeart, FaEye } from 'react-icons/fa';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = initialPosts.find(p => String(p.id) === id);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [views] = useState(post?.views || 0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(Array.isArray(post?.comments) ? post.comments : []);
  const [inputActive, setInputActive] = useState(false);

  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikes(prev => prev + (liked ? -1 : 1));
  };

  const handleAddComment = () => {
    const text = commentText.trim();
    if (!text) return;

    const newComment = {
      author: '익명',
      date: new Date().toLocaleDateString(),
      text,
    };

    setComments(prev => [...prev, newComment]);
    setCommentText('');
    setInputActive(false);
  };

  return (
    <div className="post-detail">
      <div className="content-box">
        {/* 🔹 제목 + 메타 정보 */}
        <div className="post-header-inside">
          <div className="post-title-left">
            <span className="category">{post.category}</span>
            <h2>{post.title}</h2>
          </div>

          <div className="post-meta-right">
            <span>{post.writer}</span>
            <span><FaEye className="eye-icon" /> {views}</span>
            <span><FaHeart className="heart-icon" /> {likes}</span>
          </div>
        </div>

        {/* 🔹 가로선 */}
        <hr className="post-divider" />

        {/* 🔹 본문 내용 */}
        <div className="content">
          <p>{post.body}</p> {/* ✅ 글마다 본문 내용 표시 */}
          {post.image && (
            <img src={post.image} alt="게시글 이미지" className="post-image" />
          )}
        </div>
      </div>

      {/* 🔹 목록으로 */}
      <div style={{ margin: '24px 0' }}>
        <button className="back-button" onClick={() => navigate(-1)}>목록</button>
      </div>

      {/* ✅ 댓글 전체 wrapper: 입력 + 목록 포함 */}
      <div className="comments-wrapper">

        {/* ✅ 입력 영역만 따로 분리 */}
        <div className="comment-input-wrapper">
          <textarea
            className={`comment-input ${inputActive ? 'active' : ''}`}
            placeholder={inputActive ? '' : '댓글을 입력해주세요. 욕설, 비방, 혐오 표현은 삼가주세요.'}
            value={commentText}
            maxLength={300}
            onFocus={() => setInputActive(true)}
            onBlur={() => {
              if (!commentText.trim()) setInputActive(false);
            }}
            onChange={e => setCommentText(e.target.value)}
          />

          {/* 🔹 아래 한 줄 정렬 */}
          <div className="comment-footer">
            <div className="char-counter">{commentText.length} / 300</div>
            <button className="add-comment" onClick={handleAddComment}>등록</button>
          </div>
        </div>

        {/* ✅ 댓글 표시 영역만 따로 */}
        <div className="comment-display-wrapper">
          {comments.length === 0 ? (
            <div className="no-comments-block">등록된 댓글이 없습니다.</div>
          ) : (
            <ul className="comments-list">
              {comments.map((c, idx) => (
                <li key={idx} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{c.author}</span>
                    <span className="comment-date">{c.date}</span>
                  </div>
                  <p className="comment-text">{c.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>

    </div>
  );
}

export default PostDetail;
