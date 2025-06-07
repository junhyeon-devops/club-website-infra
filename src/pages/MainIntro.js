import React, { useEffect, useRef, useState } from 'react';
import './MainIntro.css';

const useFadeInOnScroll = () => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const MainIntro = () => {
  const [introRef, introVisible] = useFadeInOnScroll();
  const [sloganRef, sloganVisible] = useFadeInOnScroll();
  const [meaningRef, meaningVisible] = useFadeInOnScroll();
  const [activityRef, activityVisible] = useFadeInOnScroll();

  return (
    <section className="mainintro-wrapper">
      <div
        ref={introRef}
        className={`mainintro-section fade-text ${introVisible ? 'visible' : ''}`}
      >
        <h2 className="mainintro-heading">
          &nbsp;&nbsp;동아리 소개 <span className="yellow-dot">.</span>
        </h2>
        <div className="mainintro-line" />
        <p className="mainintro-description">
          PDA는 충북대학교 소프트웨어학부 소속 학술 동아리로, 개발과 디자인, 기획에 관심 있는 학생들이 모여
          다양한 프로젝트와 스터디를 진행하며 역량을 키워가는 공간입니다.
        </p>
      </div>

      <div
        ref={sloganRef}
        className={`mainintro-section fade-text ${sloganVisible ? 'visible' : ''}`}
      >
        <h2 className="mainintro-heading">"Passion, Development, Aspiration"</h2>
        <div className="mainintro-line" />
      </div>

      <div
        ref={meaningRef}
        className={`mainintro-section fade-text ${meaningVisible ? 'visible' : ''}`}
      >
        <div className="cards-row">
          {['P', 'D', 'A'].map((letter, i) => (
            <div key={i} className="card">
              <div className="card-letter">{letter}</div>
              <div className="card-word">
                {letter === 'P' ? 'Passion' : letter === 'D' ? 'Development' : 'Aspiration'}
              </div>
              <div className="card-desc">
                {letter === 'P'
                  ? '열정을 가진 구성원들과 함께 성장해 나가는 공동체'
                  : letter === 'D'
                  ? '다양한 프로젝트와 활동을 통한 실전 개발 능력 향상'
                  : '미래를 향한 꿈과 목표를 함께 실현해 나가는 동아리'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={activityRef}
        className={`mainintro-section fade-text ${activityVisible ? 'visible' : ''}`}
      >
        <h2 className="mainintro-heading">
          &nbsp;&nbsp;동아리 활동 <span className="yellow-dot">.</span>
        </h2>
        <div className="mainintro-line" />
        <div className="activities-grid">
          {[
            ['정규 세션', '매주 개발/디자인 관련 주제로 진행되는 세미나'],
            ['스터디', '알고리즘, 포트폴리오, 프론트/백엔드 등 자율 스터디'],
            ['프로젝트', '팀을 꾸려 웹/앱 개발 프로젝트 수행 및 전시'],
            ['해커톤 & 대외활동', '교내외 해커톤 및 공모전 참여를 통한 실무 경험'],
            ['MT & 행사', '신입생 환영회, OT, MT 등 다양한 오프라인 활동'],
            ['특강', '졸업생 및 현직자 특강, 연구 분야 특강'],
          ].map(([title, text], i) => (
            <div key={i} className="activity-box">
              <div className="activity-title">{title}</div>
              <div className="activity-text">{text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainIntro;
