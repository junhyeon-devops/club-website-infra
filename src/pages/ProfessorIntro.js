import React from 'react';
import './ProfessorIntro.css';
import Intro_top from '../components/Intro_top';

function ProfessorIntro() {
  return (
    <>
      <Intro_top
        title="소개"
        subtitle="동아리 교수님을 소개합니다."
      />

      {/* 전체 section은 꽉 차게 */}
      <section style={{ width: '100%', backgroundColor: '#fff', padding: '60px 0' }}>
        {/* 본문만 maxWidth 제한 */}
        <div
          className="container"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '0 2rem',
            color: '#111111',
          }}
        >
          <h4
            className="mb-4 border-bottom pb-2"
            style={{
              borderBottom: '2px solid #002244',
              paddingBottom: '10px',
              color: '#002244',
            }}
          >
            지도 교수님 소개
          </h4>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: '1 1 250px', textAlign: 'center' }}>
              <img
                src="/prof.png"
                alt="홍장의 교수님"
                style={{
                  maxWidth: '100%',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              />
            </div>

            <div style={{ flex: '3 1 600px', fontSize: '15px', lineHeight: '1.6' }}>
              <p><strong>Professor:</strong> Jang Eui Hong (홍장의)</p>
              <p><strong>Major:</strong> Software Engineering, Software Modeling and Verification</p>
              <p><strong>Affiliation:</strong> School of Computer Science, Chungbuk National University</p>
              <p><strong>E-mail:</strong> jehong@chungbuk.ac.kr</p>
              <p><strong>Contact:</strong> +82 43 261 2261</p>
              <p><strong>Office:</strong> BILD S4-1, R# 320, School of Computer Science</p>

              <p><strong>Academic Ability and Work Experience</strong></p>
              <ul style={{ paddingLeft: '1.2rem' }}>
                <li>2004 – Present, Professor, School of Computer Science at CBNU</li>
                <li>2001 – Doctor of Computer Science, KAIST</li>
                <li>2014 – Present, SSEF (Software Safety Expert Forum) member</li>
                <li>2004 – Present, Adviser of the Korea Institute of Defense Analysis</li>
                <li>2020 ~ 2022, Director of the Software Engineering Society, KIISE</li>
                <li>2020 ~ 2021, Dean of the software department at CBNU</li>
                <li>2016 ~ 2018, Director of Computer Information Center at CBNU</li>
                <li>2011 ~ 2013, Executive Director of Korea S&M Business Convergence Society</li>
                <li>2010 ~ 2013, App Center Director of Chungbuk National University</li>
                <li>2002 ~ 2004, R&D Lab. Solution Link Co. (Director & Principal Consultant)</li>
                <li>2002 ~ 2003, Member of NTRM (National Technology Road Map), MIST</li>
                <li>2001 ~ 2002, Agency of Defense Development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfessorIntro;
