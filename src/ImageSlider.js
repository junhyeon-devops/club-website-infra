import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

const ImageSlider = () => {
  const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];

  return (
    <div style={styles.wrapper}>
      <Swiper
        modules={[EffectFade, Autoplay]}
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
        <div style={styles.mainText}>
          CBNU<br />
          SCHOOL OF COMPUTER SCIENCE<br />
          ACADEMIC CLUB <span style={styles.pdaText}><span style={styles.redDot}>.</span></span>
        </div>
        <div style={styles.subText}>
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
  mainText: {
    fontSize: '60px',
    fontWeight: 'bold',
    lineHeight: '1.3',
    textShadow: '0 2px 6px rgba(0,0,0,0.8)', // ✅ 더 진하게
  },
  pdaText: {
    fontWeight: 'bold',
  },
  Dot: {
    color: 'blue',
    fontSize: '40px',
  },
  subText: {
    marginTop: '10px',
    fontSize: '16px',
    textShadow: '0 1px 3px rgba(0,0,0,0.7)', // ✅ 더 진하게
  },
};

export default ImageSlider;
