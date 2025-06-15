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
    const [comments, setComments] = useState(Array.isArray(post.comments) ? post.comments : []);
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  const handleLike = () => {
  if (liked) {
    setLiked(false);
    setLikes(prev => prev - 1);
  } else {
    setLiked(true);
    setLikes(prev => prev + 1);
  }
};
    const handleAddComment = () => {
  const text = commentText.trim();
  if (!text) return;

  const newComment = {
    author: '익명',
    date: new Date().toLocaleDateString(),
    text
  };

  setComments(prev => [...prev, newComment]);
  setCommentText('');
};


  return (
    <div className="post-detail">
      <button onClick={() => navigate(-1)}>◀️ 목록으로</button>
      <h2>{post.title}</h2>
      <div className="detail-meta">
        <span className="category">{post.category}</span>
        <span>{post.writer}</span>
        <span>{post.time}</span>
      </div>
      <div className="stats">
        <FaHeart
          className={`heart-icon ${liked ? 'liked' : ''}`}
          onClick={handleLike}
        />
        <span>{likes}</span>
        <FaEye className="eye-icon" />
        <span>{views}</span>
      </div>
      <div className="content">
        <p>게시글 상세 내용 예시입니다.</p>
      </div>
      <div className="comments-section">
  <textarea
    className="comment-input"
    placeholder="댓글을 작성해주세요."
    value={commentText}
    onChange={e => setCommentText(e.target.value)}
  />
  <button className="add-comment" onClick={handleAddComment}>
    댓글 남기기
  </button>

  {comments.length === 0 ? (
    <p className="no-comments">댓글이 없습니다.</p>
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
  );
}

export default PostDetail;
