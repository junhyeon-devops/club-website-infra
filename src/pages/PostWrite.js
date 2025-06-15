import React, { useState, useMemo, useRef, useCallback } from 'react';
import ReactQuill from 'react-quill-new';
import Quill from 'quill';                         // ← 전체 버전으로 import
import 'quill/dist/quill.snow.css';               // ← 스노우 테마 CSS 포함
import ImageFormat from 'quill/formats/image';
import ImageUploader from 'quill2-image-uploader';
import { useNavigate } from 'react-router-dom';
import 'quill2-image-uploader/dist/quill.imageUploader.min.css';
import './PostWrite.css';

// 🧩 Quill 전역 등록
const Parchment = Quill.import('parchment');
Quill.register({ 'formats/image': ImageFormat });
Quill.register('modules/imageUploader', ImageUploader);

function PostWrite() {
  const navigate = useNavigate();
  const quillRef = useRef();

  const [category, setCategory] = useState('대회/공모전');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ category, title, content, files });
    navigate(-1);
  };

  // Drag & Drop 핸들러들
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

  // 이미지 업로드 함수 (Cloudinary 예시 사용)
  const uploadImage = file => {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', '<your_upload_preset>'); // Cloudinary 프리셋
    return fetch('https://api.cloudinary.com/v1_1/<your_cloud_name>/upload', {
      method: 'POST',
      body: form
    })
      .then(res => res.json())
      .then(data => data.secure_url);
  };

  const modules = useMemo(() => ({
    toolbar: [
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['image', 'clean']
    ],
    imageUploader: {
      upload: uploadImage
    }
  }), []);

  const formats = [
  'size','bold','italic','underline','strike',
  'list','bullet','align','image','imageBlot'
];


  return (
    <div className="post-write" style={{ minHeight: '100vh' }}>
      <h1>글 작성</h1>
      <form onSubmit={handleSubmit}>
        <label>카테고리</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {['대회/공모전', '프로젝트', '스터디', '자유게시판'].map(c => (
            <option key={c}>{c}</option>
          ))}
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
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          placeholder="게시글 내용을 입력해주세요."
        />

        <label>파일 첨부</label>
        <div
          className={`file-upload-box ${dragOver ? 'drag-over' : ''}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <p>파일을 이 영역에 드롭하거나</p>
          <input
            id="file-upload"
            type="file"
            hidden
            multiple
            onChange={e => setFiles(prev => [...prev, ...Array.from(e.target.files)])}
          />
          <label htmlFor="file-upload" className="file-btn">파일 탐색</label>
        </div>

        {files.length > 0 && (
          <ul className="file-list">
            {files.map((file, i) => (
              <li key={i}>
                <span>{file.name}</span>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() =>
                    setFiles(prev => prev.filter((_, idx) => idx !== i))
                  }
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <button type="submit" className="submit-btn">게시하기</button>
      </form>
    </div>
  );
}

export default PostWrite;
