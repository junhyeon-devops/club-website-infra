import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostWrite.css';

function PostWrite() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('대회/공모전');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]); // File 객체 배열


  const handleSubmit = e => {
    e.preventDefault();
    // TODO: API 호출 또는 초기Posts에 추가 로직 작성
    console.log({ category, title, content });
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="post-write">
      <h1>글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <label>카테고리</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>대회/공모전</option>
          <option>프로젝트</option>
          <option>스터디</option>
          <option>자유게시판</option>
        </select>

        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label>본문</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <label>파일 첨부</label>
        <input
        type="file"
        multiple
        onChange={(e) => {
            const selected = Array.from(e.target.files);
            setFiles(selected);
        }}
        />

        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}

export default PostWrite;
