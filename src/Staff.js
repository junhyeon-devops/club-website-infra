import React from 'react';
import './Staff.css';

const executives = {
  회장단: [
    { name: '박승준', role: '회장', major: '소프트웨어학과 21', image: '/img/staff1.jpg' },
    { name: '우태현', role: '부회장', major: '소프트웨어학과 21', image: '/img/staff2.jpg' },
  ],
  학술부: {
    desc: '세션 / 스터디 / 세미나 운영 및 SNS 관리',
    head: { name: '신종환', major: '소프트웨어학과 21', image: '/img/staff3.jpg' },
    staff: [
      { name: '정유나', major: '산업경영 23', image: '/img/staff4.jpg' },
    ],
  },
  총무무부: {
    desc: '동아리 행사 기획 및 운영',
    head: { name: '현지수', major: '디지털정보 20', image: '/img/staff5.jpg' },
    staff: [
      { name: '송치언', major: '건축사회환경 21', image: '/img/staff6.jpg' },
    ],
  },
  홍보부: {
    desc: '세션 / 스터디 / 세미나 운영 및 SNS 관리',
    head: { name: '변해정', major: '소프트웨어학과 22', image: '/img/staff7.jpg' },
    staff: [
      { name: '이주원', major: '컴퓨터 24', image: '/img/staff8.jpg' },
    ],
  },

};

function Member() {
  return (
    <div className="member-container">
      <h2>현 임원 소개</h2>

      <div className="section">
        <h3>회장단</h3>
        <p>동아리 운영 총괄, 기획 및 각 부서 업무 참여</p>
        <div className="card-grid">
          {executives.회장단.map((p) => (
            <div className="card" key={p.name}>
              <img src={p.image} alt={p.name} />
              <strong>{p.name}</strong>
              <div>{p.role}</div>
              <div className="major">{p.major}</div>
            </div>
          ))}
        </div>
      </div>

      {Object.entries(executives).slice(1).map(([dept, info]) => (
        <div className="section" key={dept}>
          <h3>{dept}</h3>
          <p>{info.desc}</p>
          <div className="card-grid">
            <div className="card">
              <img src={info.head.image} alt={info.head.name} />
              <strong>{info.head.name}</strong>
              <div>부장</div>
              <div className="major">{info.head.major}</div>
            </div>
            {info.staff.map((s) => (
              <div className="card" key={s.name}>
                <img src={s.image} alt={s.name} />
                <strong>{s.name}</strong>
                <div>차장</div>
                <div className="major">{s.major}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Member;
