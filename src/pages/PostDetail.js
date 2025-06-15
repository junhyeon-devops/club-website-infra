// src/pages/PostDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaEye } from 'react-icons/fa';
import './PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [inputActive, setInputActive] = useState(false);

  useEffect(() => {
    axios.get(`/api/posts/${id}`, { withCredentials: true })
      .then(res => {
        const p = res.data;
        setPost(p);
        setLikes(p.likes);
        setLiked(p.liked);
        setViews(p.views);
        setComments(Array.isArray(p.comments) ? p.comments : []);
        // setLiked(p.liked || false); // backend에서 제공하는 flag
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = () => {
    axios.post(`/api/posts/${id}/like`, {}, { withCredentials: true })
      .then(res => {
        setLiked(res.data.liked);
        setLikes(res.data.count);
      })
      .catch(err => console.error(err));
  };

  const handleAddComment = () => {
  const body = commentText.trim();
  if (!body) return;

  console.log('보내는 댓글:', body, 'post id:', id);

  axios.post(`/api/posts/${id}/comments`, { text: body }, { withCredentials: true })
    .then(res => {
      console.log('백에서 온 댓글:', res.data);
      setComments(prev => [...prev, res.data]);
      setCommentText('');
      setInputActive(false);
    })
    .catch(err => console.error('댓글 등록 에러:', err));
};

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>게시글을 불러오는 중 오류가 발생했습니다.</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div className="post-detail">
      <div className="content-box">
        <div className="post-header-inside">
          <div className="post-title-left">
            <span className="category">{post.category}</span>
            <h2>{post.title}</h2>
          </div>
          <div className="post-meta-right">
            <span>{post.writer}</span>
            <span><FaEye /> {views}</span>
            <span
              style={{ cursor: 'pointer', color: liked ? 'red' : undefined }}
              onClick={ handleLike }
            >
              <FaHeart /> {likes}
            </span>
          </div>
        </div>

        <hr className="post-divider" />

        <div className="content">
          <p dangerouslySetInnerHTML={{ __html: post.body }} />
          {post.image && !post.images && (
            <img src={post.image} alt="post" className="post-image" />
          )}
          {post.images && Array.isArray(post.images) &&
            post.images.map((url, i) => (
              <img key={i} src={url} alt={`post-${i}`} className="post-image" />
            ))
          }
        </div>
      </div>

      <div style={{ margin: '24px 0' }}>
        <button className="back-button" onClick={() => navigate(-1)}>목록</button>
      </div>

      <div className="comments-wrapper">
        <div className="comment-input-wrapper">
          <textarea
            className={`comment-input ${inputActive ? 'active' : ''}`}
            placeholder={inputActive ? '' : '댓글을 입력해주세요.'}
            value={commentText}
            maxLength={300}
            onFocus={() => setInputActive(true)}
            onBlur={() => { if (!commentText.trim()) setInputActive(false); }}
            onChange={e => setCommentText(e.target.value)}
          />
          <div className="comment-footer">
            <div className="char-counter">{commentText.length} / 300</div>
            <button type="button" className="add-comment" onClick={handleAddComment}>등록</button>
          </div>
        </div>

        <div className="comment-display-wrapper">
          {comments.length === 0 ? (
            <div className="no-comments-block">등록된 댓글이 없습니다.</div>
          ) : (
            <ul className="comments-list">
              {comments.map(c => (
                <li key={c.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{c.author}</span>
                    <span className="comment-date">
                      {new Date(c.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="comment-text">{c.body}</p>
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
