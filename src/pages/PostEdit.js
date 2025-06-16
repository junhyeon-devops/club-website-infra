
import React, { useEffect, useState, useMemo } from 'react';
import Quill from 'quill';
import ImageUploader from 'quill2-image-uploader';
import ImageFormat from 'quill/formats/image';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './PostWrite.css';


Quill.register('modules/imageUploader', ImageUploader);
Quill.register({ 'formats/image': ImageFormat });

const CATEGORIES = ['대회/공모전', '프로젝트', '스터디', '자유게시판'];

function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);


  async function uploadToCloudinary(file) {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'post_app_unsigned');
    const resp = await fetch('https://api.cloudinary.com/v1_1/dpal8wysp/upload', {
      method: 'POST',
      body: form,
    });
    const data = await resp.json();
    return data.secure_url.replace('/upload/', '/upload/w_800,h_600,c_fit/');
  }

  useEffect(() => {
    axios.get(`/api/posts/${id}`, { withCredentials: true }).then((res) => {
      setTitle(res.data.title);
      setBody(res.data.body);
      setCategory(res.data.category);
    });
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert('제목과 본문을 입력해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      const imageUrls = await Promise.all(
        files.map((file) => uploadToCloudinary(file))
      );

      await axios.put(
        `/api/posts/${id}`,
        { title, body, category, images: imageUrls },
        { withCredentials: true }
      );

      alert('수정 완료!');
      navigate('/community/recuit');
    } catch (err) {
      console.error(err);
      alert('수정 중 오류 발생');
    } finally {
      setSubmitting(false);
    }
  };


  const modules = useMemo(
    () => ({
      toolbar: [['bold', 'italic'], ['image']],
      imageUploader: {
        upload: uploadToCloudinary,
      },
    }),
    []
  );

  return (
    <div className="post-write">
      <h1>게시글 수정</h1>
      <form onSubmit={handleSubmit}>

        <label>카테고리</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} disabled={submitting}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>


        <label>제목</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={40}
          disabled={submitting}
          placeholder="제목 (최대 40자)"
        />


        <label>본문</label>
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          modules={modules}
          readOnly={submitting}
        />


        <label>이미지 업로드</label>
        <input
          type="file"
          multiple
          disabled={submitting}
          onChange={(e) => setFiles([...files, ...Array.from(e.target.files)])}
        />
        {files.length > 0 && (
          <ul className="file-list">
            {files.map((file, idx) => (
              <li key={idx}>
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                  disabled={submitting}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}


        <button type="submit" disabled={submitting}>
          {submitting ? '수정 중...' : '수정하기'}
        </button>
      </form>
    </div>
  );
}

export default PostEdit;
