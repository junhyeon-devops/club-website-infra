import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostWrite.css';

function PostWrite() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('대회/공모전');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [fontSize, setFontSize] = useState('16px');

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ category, title, content });
    navigate(-1);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="post-write" style={{ minHeight: '100vh' }}>
      <h1>글 작성</h1>
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
          placeholder="제목 (최대 40자)"
          maxLength={40}
          required
        />

        <label>본문</label>
        <div className="editor-horizontal">
          <div className="editor-toolbar">
            <select 
              value={fontSize} 
              onChange={(e) => setFontSize(e.target.value)}
              className="font-size-dropdown"
            >
              {[9,10,11,12,14,16,18,20,22,24,26,28].map(size => (
                <option key={size} value={`${size}px`}>
                  {`${size}px`}
                </option>
              ))}
            </select>
            <button type="button"><b>B</b></button>
            <button type="button"><i>I</i></button>
            <button type="button"><u>U</u></button>
            <button type="button"><s>S</s></button>
            <button type="button">1.</button>
            <button type="button">•</button>
            <button type="button">≡</button>
            <button type="button">“”</button>
          </div>
          <textarea
            style={{ fontSize }}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="게시글 내용을 입력해주세요."
            required
          />
        </div>

        <label>파일 첨부</label>
        <div className="file-upload-box" onDrop={handleDrop} onDragOver={handleDragOver}>
          <p>드롭 & 드롭으로 파일 추가<br />또는</p>
          <input
            id="file-upload"
            type="file"
            hidden
            multiple
            onChange={(e) => setFiles([...e.target.files])}
          />
          <label htmlFor="file-upload" className="file-btn">파일 탐색</label>
        </div>

        <button type="submit" className="submit-btn">게시하기</button>
      </form>
    </div>
  );
}

export default PostWrite;
