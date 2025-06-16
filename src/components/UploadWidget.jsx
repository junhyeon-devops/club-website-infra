
import React, { useEffect, useRef } from 'react';

export default function UploadWidget({ onUpload }) {
  const widgetRef = useRef();

  useEffect(() => {

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dpal8wysp',
        uploadPreset: 'post_app_unsigned',
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: false
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          onUpload(result.info.public_id);
        }
      }
    );
  }, [onUpload]);


  return (
    <button type="button" onClick={() => widgetRef.current.open()}>
      이미지 업로드
    </button>
  );
}
