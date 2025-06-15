// src/pages/PostWrite.jsx
import React, { useState, useMemo, useRef, useCallback } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill-new';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import ImageFormat from 'quill/formats/image';
import ImageBlot from 'quill/formats/image';
import ImageUploader from 'quill2-image-uploader';
import { useNavigate } from 'react-router-dom';
import './PostWrite.css';

// 🧩 Quill 전역 등록
Quill.register({ 'formats/image': ImageFormat });
Quill.register('modules/imageUploader', ImageUploader);

const CATEGORIES = ['대회/공모전', '프로젝트', '스터디', '자유게시판'];

function PostWrite() {
  const navigate = useNavigate();
  const quillRef = useRef();

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 📌 드래그앤드롭 핸들러들
  const onDrop = useCallback(e => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...dropped]);
    setDragOver(false);
  }, []);

  const onDragOver = useCallback(e => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  // 🧰 Cloudinary REST 업로드 함수
  async function uploadToCloudinary(file) {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'post_app_unsigned'); // ← 수정
    const resp = await fetch(
      'https://api.cloudinary.com/v1_1/dpal8wysp/upload', // ← 수정
      { method: 'POST', body: form }
    );
    const data = await resp.json();
    return data.secure_url;
  }

  // 📤 제출 시 업로드 + API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('제목과 본문을 입력해주세요.');
      return;
    }


    setSubmitting(true);
    try {
      // 이미지 업로드
      const imageUrls = await Promise.all(files.map(uploadToCloudinary));

      // 서버 API 호출
      await axios.post(
        '/api/posts',
        { title, category, body: content, images: imageUrls }, // 변경된 필드명
        { withCredentials: true }
      );

      alert('게시글이 등록되었습니다.');
      navigate('/community/recuit');
    } catch (err) {
      console.error(err);
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  // 🪶 Quill 에디터 이미지 업로더 설정 (선택적)
  const modules = useMemo(() => ({
    toolbar: [['bold', 'italic'], ['image']],
    imageUploader: { upload: uploadToCloudinary } // 에디터 내 이미지 업로드도 가능
  }), []);

  const formats = ['bold', 'italic', 'image', 'imageBlot'];

  return (
    <div className="post-write" style={{ minHeight: '100vh' }}>
      <h1>글 작성</h1>
      <form onSubmit={handleSubmit}>
        {/* 카테고리 */}
        <label>카테고리</label>
        <select disabled={submitting} value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>

        {/* 제목 */}
        <label>제목</label>
        <input
          disabled={submitting}
          maxLength={40}
          placeholder="제목 (최대 40자)"
          required type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        {/* 본문 */}
        <label>본문</label>
        <ReactQuill
          readOnly={submitting}
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />

        {/* 파일 업로드 UI */}
        <label>이미지 업로드</label>
        <div
          className={`file-upload-box ${dragOver ? 'drag-over' : ''}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <p>파일을 끌어다 놓거나</p>
          <input
            disabled={submitting}
            hidden
            id="file-upload"
            multiple
            type="file"
            onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files)])}
          />
          <label className="file-btn" htmlFor="file-upload">파일 탐색</label>
        </div>

        {/* 업로드 선택된 파일 목록 */}
        {files.length > 0 && (
          <ul className="file-list">
            {files.map((file, idx) => (
              <li key={idx}>
                <span>{file.name}</span>
                <button
                  disabled={submitting}
                  type="button"
                  onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
                >✕</button>
              </li>
            ))}
          </ul>
        )}

        {/* 제출 */}
        <button disabled={submitting} className="submit-btn" type="submit">
          {submitting ? '등록 중...' : '게시하기'}
        </button>
      </form>
    </div>
  );
}

export default PostWrite;
