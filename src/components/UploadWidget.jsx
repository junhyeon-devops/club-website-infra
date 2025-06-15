// src/components/UploadWidget.jsx
import React, { useEffect, useRef } from 'react';

/**
 * UploadWidget 컴포넌트 props:
 * - onUpload: 이미지 업로드에 성공하면 public_id (문자열)를 전달합니다.
 */
export default function UploadWidget({ onUpload }) {
  const widgetRef = useRef();

  useEffect(() => {
    // 위젯 초기화 (한 번만 실행)
    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dpal8wysp',
        uploadPreset: 'post_app_unsigned', // Upload Preset 이름
        sources: ['local', 'url', 'camera'], // 업로드 가능한 출처 설정
        multiple: false, // 다중 업로드 여부
        cropping: false  // 크롭 기능 활성화 여부
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          onUpload(result.info.public_id); // 업로드된 이미지의 public_id 반환
        }
      }
    );
  }, [onUpload]);

  // 버튼 클릭 시 위젯 열기
  return (
    <button type="button" onClick={() => widgetRef.current.open()}>
      이미지 업로드
    </button>
  );
}
