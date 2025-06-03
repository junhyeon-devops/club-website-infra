import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const ImageSlider = () => {
  const [fadeCBNU, setFadeCBNU] = useState(false);
  const [fadeSchool, setFadeSchool] = useState(false);
  const [fadeSub, setFadeSub] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeCBNU(true), 100);
    const timer2 = setTimeout(() => setFadeSchool(true), 800);
    const timer3 = setTimeout(() => setFadeSub(true), 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg'];

  return (
    <div style={styles.wrapper}>
      <Swiper
        modules={[EffectFade, Autoplay, Pagination]}
        pagination={{ clickable: true }}
        allowTouchMove={true}
        effect="fade"
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={2000}
        style={styles.swiper}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="slide" style={{ ...styles.slide, backgroundImage: `url(${src})` }} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 텍스트 오버레이 */}
      <div style={styles.overlay}>
        <div style={{ fontSize: '60px', fontWeight: 'bold', lineHeight: '1.3', textAlign: 'center' }}>
          <div
            style={{
              ...styles.fadeText,
              ...(fadeCBNU && styles.fadeTextVisible),
              textShadow: '0 2px 6px rgba(0,0,0,0.8)',
            }}
          >
            CBNU
          </div>
          <div
            style={{
              ...styles.fadeText,
              ...(fadeSchool && styles.fadeTextVisible),
              textShadow: '0 2px 6px rgba(0,0,0,0.8)',
            }}
          >
            SCHOOL OF COMPUTER SCIENCE<br />ACADEMIC CLUB <span style={styles.pdaText}><span style={styles.yelloDot}>.</span></span>
          </div>
        </div>
        <div
          style={{
            ...styles.subText,
            ...styles.fadeText,
            ...(fadeSub && styles.fadeTextVisible),
          }}
        >
          충북대학교 소프트웨어학부 학술 동아리 PDA
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '90vh',
    overflow: 'hidden',
  },
  swiper: {
    width: '100%',
    height: '100%',
  },
  slide: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    filter: 'brightness(0.6) blur(2px)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    pointerEvents: 'none',
    zIndex: 2,
  },
  pdaText: {
    fontWeight: 'bold',
  },
  yelloDot: {
    fontFamily: `'Pretendard', 'Noto Sans KR', sans-serif`,
    color: '#F9DC5C',
    fontSize: '75px',
  },
  subText: {
    marginTop: '10px',
    fontSize: '16px',
    textShadow: '0 1px 3px rgba(0,0,0,0.7)',
  },
  fadeText: {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 1.2s ease, transform 1.2s ease',
  },
  fadeTextVisible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
};

export default ImageSlider;
