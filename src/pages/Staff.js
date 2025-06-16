import React, { useEffect, useRef, useState } from 'react';
import './Staff.css';
import IntroTop from '../components/IntroTop';

const executives = {
  회장단: [
    { name: '박승준', role: '회장', major: '소프트웨어학과 21', image: '/img/staff1.jpg' },
    { name: '우태현', role: '부회장', major: '소프트웨어학과 21', image: '/img/staff2.png' },
  ],
  학술부: {
    desc: '세션 / 스터디 / 세미나 운영 및 SNS 관리',
    head: { name: '신종환', major: '소프트웨어학과 21', image: '/img/staff3.png' },
    staff: [{ name: '박조현', major: '소프트웨어학과 21', image: '/img/staff4.png' }],
  },
  총무부: {
    desc: '동아리 행사 기획 및 운영',
    head: { name: '변해정', major: '소프트웨어학과 22', image: '/img/staff5.png' },
    staff: [{ name: '윤준식', major: '소프트웨어학과 20', image: '/img/staff6.png' }],
  },
  홍보부: {
    desc: '세션 / 스터디 / 세미나 운영 및 SNS 관리',
    head: { name: '박성범', major: '소프트웨어학과 21', image: '/img/staff7.png' },
    staff: [{ name: '변진호', major: '소프트웨어학과 22', image: '/img/staff8.png' }],
  },
};

function useFadeInOnScroll() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Member() {
  // ✅ 훅 직접 선언 (map 안 X)
  const fadeRef0 = useFadeInOnScroll();
  const fadeRef1 = useFadeInOnScroll();

  const headRef0 = useFadeInOnScroll(); // 학술부
  const staffRef00 = useFadeInOnScroll();

  const headRef1 = useFadeInOnScroll(); // 총무부
  const staffRef10 = useFadeInOnScroll();

  const headRef2 = useFadeInOnScroll(); // 홍보부
  const staffRef20 = useFadeInOnScroll();

  return (
    <>
      <IntroTop title="소개" 
      subtitle="동아리 현 임원들을 소개합니다." 
      backgroundImage="/cbnu_img.jpg"
    />

      <section style={{ width: '100%', backgroundColor: '#fff', padding: '60px 0' }}>
        <div className="member-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
          <h2
            style={{
              marginBottom: '1.5rem',
              borderBottom: '2px solid #002244',
              paddingBottom: '10px',
              color: '#002244',
            }}
          >
            현 임원 소개
          </h2>
          <div className="section">
            <h3>회장단</h3>
            <p>동아리 운영 총괄, 기획 및 각 부서 업무 참여</p>
            <div className="card-grid">
              {[executives.회장단[0], executives.회장단[1]].map((p, i) => {
                const [ref, visible] = i === 0 ? fadeRef0 : fadeRef1;
                return (
                  <div className={`card fade-text ${visible ? 'visible' : ''}`} ref={ref} key={p.name}>
                    <img src={p.image} alt={p.name} />
                    <strong>{p.name}</strong>
                    <div>{p.role}</div>
                    <div className="major">{p.major}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 학술부 */}
          <div className="section">
            <h3>학술부</h3>
            <p>{executives.학술부.desc}</p>
            <div className="card-grid">
              {(() => {
                const [ref, visible] = headRef0;
                return (
                  <div className={`card fade-text ${visible ? 'visible' : ''}`} ref={ref}>
                    <img src={executives.학술부.head.image} alt={executives.학술부.head.name} />
                    <strong>{executives.학술부.head.name}</strong>
                    <div>부장</div>
                    <div className="major">{executives.학술부.head.major}</div>
                  </div>
                );
              })()}
              {(() => {
                const [ref, visible] = staffRef00;
                const s = executives.학술부.staff[0];
                return (
                  <div className={`card fade-text ${visible ? 'visible' : ''}`} ref={ref} key={s.name}>
                    <img src={s.image} alt={s.name} />
                    <strong>{s.name}</strong>
                    <div>차장</div>
                    <div className="major">{s.major}</div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* 총무부 */}
          <div className="section">
            <h3>총무부</h3>
            <p>{executives.총무부.desc}</p>
            <div className="card-grid">
              {(() => {
                const [ref, visible] = headRef1;
                return (
                  <div className={`card fade-text ${visible ? 'visible' : ''}`} ref={ref}>
                    <img src={executives.총무부.head.image} alt={executives.총무부.head.name} />
                    <strong>{executives.총무부.head.name}</strong>
                    <div>부장</div>
                    <div className="major">{executives.총무부.head.major}</div>
                  </div>
                );
              })()}
              {(() => {
                const [ref, visible] = staffRef10;
                const s = executives.총무부.staff[0];
                return (
                  <div className={`card fade-text ${visible ? 'visible' : ''}`} ref={ref} key={s.name}>
                    <img src={s.image} alt={s.name} />
                    <strong>{s.name}</strong>
                    <div>차장</div>
                    <div className="major">{s.major}</div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* 홍보부 */}
          <div className="section">
            <h3>홍보부</h3>
            <p>{executives.홍보부.desc}</p>
            <div className="card-grid">
              {(() => {
                const [ref, visible] = headRef2;
                return (
                  <div className={`card fade-text ${visible ? 'visible' : ''}`} ref={ref}>
                    <img src={executives.홍보부.head.image} alt={executives.홍보부.head.name} />
                    <strong>{executives.홍보부.head.name}</strong>
                    <div>부장</div>
                    <div className="major">{executives.홍보부.head.major}</div>
                  </div>
                );
              })()}
              {(() => {
                const [ref, visible] = staffRef20;
                const s = executives.홍보부.staff[0];
                return (
                  <div className={`card fade-text ${visible ? 'visible' : ''}`} ref={ref} key={s.name}>
                    <img src={s.image} alt={s.name} />
                    <strong>{s.name}</strong>
                    <div>차장</div>
                    <div className="major">{s.major}</div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Member;
