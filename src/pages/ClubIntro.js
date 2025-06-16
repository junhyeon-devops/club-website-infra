import React from 'react';
import IntroTop from '../components/IntroTop';
import './ClubIntro.css';

function ClubIntro() {
  return (
    <>
      <IntroTop
        title="소개"
        subtitle="동아리에 대해 소개합니다."
        backgroundImage="/cbnu_img.jpg"
      />

      <section
        style={{
          width: '100%',
          backgroundColor: '#fff',
          padding: '60px 0',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 2rem',
            color: '#111',
          }}
        >
          <h2
            style={{
              marginBottom: '1.5rem',
              borderBottom: '2px solid #002244',
              paddingBottom: '10px',
              color: '#002244',
            }}
          >
            동아리 소개
          </h2>
          <p className="mainintro-description">
            PDA는 충북대학교 소프트웨어학부 소속 학술 동아리로, 개발과 디자인, 기획에 관심 있는 학생들이 모여
            다양한 프로젝트와 스터디를 진행하며 역량을 키워가는 공간입니다.
          </p>


          <div className="PDA">
            <h2 className="mainintro-heading">"Passion, Development, Aspiration"</h2>
            <div className="pdalist">
              {[
                { letter: 'P', word: 'passion', desc: '열정을 가진 구성원들과 함께 성장해 나가는 공동체' },
                { letter: 'D', word: 'development', desc: '다양한 프로젝트와 활동을 통한 실전 개발 능력 향상' },
                { letter: 'A', word: 'aspiration', desc: '미래를 향한 꿈과 목표를 함께 실현해 나가는 동아리' },
              ].map((item, i) => (
                <div key={i} className="pdaitem">
                  <span className="pda-letter">{item.letter}</span>
                  <span className="pda-word">{item.word}</span>
                  <span className="pda-desc">{item.desc}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 2rem',
            color: '#111',
          }}
        >
          <h4
            style={{
              marginBottom: '1.5rem',
              borderBottom: '2px solid #002244',
              paddingBottom: '10px',
              color: '#002244',
            }}
          >
            동아리 연혁
          </h4>

          {[{
            year: '2024',
            items: [
              '2024 Generative AI Ideathon - 2등상',
              '2024 교과기반 프로젝트 영어 발표 - 최우수상'
            ]
          }, {
            year: '2023',
            items: [
              '2023 한국관광공사 Tour APU 4.0 with Kakao, 관광데이터 활용 공모전 - 우수상',
              '2023 공개 SW 개발자 대회 - 동상(바이웹 대표상)',
              '2023 오픈소스 SW 동아리 최종 발표회 - 최우수상',
              '2023 충북 ICT 산업 전시회 - 대상'
            ]
          }, {
            year: '2022',
            items: [
              '2022 학부생 튜터 프로그램 우수 튜터 선정',
              '2022 ‘소프트웨어야 놀자’ 대학생 교육봉사 동아리 선정',
              '2022 관광데이터 활용 공모전 - 우수상',
              '2022 캠퍼스 IT진로 융합작품전 - 최우수상',
              '2022 금융데이터 활용 경진대회 - 장려상',
              '2022 충청권 ICT 메이커톤 - 우수상',
              '2022 충북 ICT 페스티벌 - 은상'
            ]
          }].map((section, idx) => (
            <div key={idx} style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ fontWeight: 'bold' }}>PDA의 {section.year}년</h5>
              <ul>
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ClubIntro;
