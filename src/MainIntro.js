import React from 'react';

const MainIntro = () => {
  return (
    <section style={styles.wrapper}>
      {/* 동아리 소개 */}
      <div style={styles.section}>
        <h2 style={styles.heading}>동아리 소개</h2>
        <div style={styles.line} />
        <p style={styles.description}>
          PDA는 충북대학교 소프트웨어학부 소속 학술 동아리로, 개발과 디자인, 기획에 관심 있는 학생들이 모여
          다양한 프로젝트와 스터디를 진행하며 역량을 키워가는 공간입니다.
        </p>
      </div>

      {/* PDA 의미 */}
      <div style={styles.section}>
        <h2 style={styles.heading}>
          "Passion, Development, Aspiration"
        </h2>
        <div style={styles.line} />
        <div style={styles.cardsRow}>
          <div style={styles.card}>
            <div style={styles.letter}>P</div>
            <div style={styles.word}>Passion</div>
            <div style={styles.desc}>열정을 가진 구성원들과 함께 성장해 나가는 공동체</div>
          </div>
          <div style={styles.card}>
            <div style={styles.letter}>D</div>
            <div style={styles.word}>Development</div>
            <div style={styles.desc}>다양한 프로젝트와 활동을 통한 실전 개발 능력 향상</div>
          </div>
          <div style={styles.card}>
            <div style={styles.letter}>A</div>
            <div style={styles.word}>Aspiration</div>
            <div style={styles.desc}>미래를 향한 꿈과 목표를 함께 실현해 나가는 동아리</div>
          </div>
        </div>
      </div>

      {/* 동아리 활동 */}
      <div style={styles.section}>
        <h2 style={styles.heading}>동아리 활동</h2>
        <div style={styles.line} />
        <div style={styles.activitiesGrid}>
          <div style={styles.activityBox}>
            <div style={styles.activityTitle}>정규 세션</div>
            <div style={styles.activityText}>매주 개발/디자인 관련 주제로 진행되는 세미나</div>
          </div>
          <div style={styles.activityBox}>
            <div style={styles.activityTitle}>스터디</div>
            <div style={styles.activityText}>알고리즘, 포트폴리오, 프론트/백엔드 등 자율 스터디</div>
          </div>
          <div style={styles.activityBox}>
            <div style={styles.activityTitle}>프로젝트</div>
            <div style={styles.activityText}>팀을 꾸려 웹/앱 개발 프로젝트 수행 및 전시</div>
          </div>
          <div style={styles.activityBox}>
            <div style={styles.activityTitle}>해커톤 & 대외활동</div>
            <div style={styles.activityText}>교내외 해커톤 및 공모전 참여를 통한 실무 경험</div>
          </div>
          <div style={styles.activityBox}>
            <div style={styles.activityTitle}>MT & 행사</div>
            <div style={styles.activityText}>신입생 환영회, OT, MT 등 다양한 오프라인 활동</div>
          </div>
          <div style={styles.activityBox}>
            <div style={styles.activityTitle}>특강</div>
            <div style={styles.activityText}>졸업생 및 현직자 특강, 연구 분야 특강</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#f7f7f7',
    padding: '80px 20px',
  },
  section: {
    maxWidth: '1000px',
    margin: '0 auto 60px auto',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: '12px',
  },
  line: {
    width: '60px',
    height: '4px',
    backgroundColor: '#003366',
    margin: '0 auto 24px auto',
  },
  description: {
    fontSize: '16px',
    color: '#444',
    lineHeight: '1.8',
    whiteSpace: 'pre-line',
  },
  cardsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    flexWrap: 'nowrap',
  },
  card: {
    flex: '1',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  letter: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#003366',
  },
  word: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#333',
  },
  desc: {
    marginTop: '10px',
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
  },
  activitiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  },
  activityBox: {
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center',
  },
  activityTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: '10px',
  },
  activityText: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.6',
  },
};

export default MainIntro;
