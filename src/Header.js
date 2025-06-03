import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  {
    label: '소개',
    submenu: [
      { text: '동아리 연혁', link: '/intro/clubintro' },
      { text: '교수님 소개', link: '/intro/professors' },
      { text: '현 임원 소개', link: '/intro/staff' },
    ],
  },
  {
    label: '일정',
    submenu: [
      { text: '동아리 일정', link: '/schedule/club' },
      { text: '내 일정', link: '/schedule/personal' },
    ],
  },
  {
    label: '커뮤니티',
    submenu: [
      { text: '팀원 모집', link: '/community/recruit' },
      { text: '자유게시판', link: '/community/board' },
    ],
  },
  {
    label: '자료실',
    submenu: [
      { text: '학습 자료', link: '/resources/learning' },
      { text: '졸업요건', link: '/resources/graduation' },
    ],
  },
];

const Header = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null);
  const [hoveredDropdownIndex, setHoveredDropdownIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsHovering(false);
    setIsMenuOpen(false);
  }, [location]);

  const handleNavToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={styles.headerWrapper}>
      <div style={styles.hoverZone}>
        <div style={styles.header}>
          <div style={styles.logoSection}>
            <Link to="/" style={styles.logoLink}>
              <div style={styles.logoContainer}>
                <img src="/logo.png" alt="로고" style={styles.logoImage} />
                <div style={styles.logoTextGroup}>
                  <div style={styles.clubNameKo}>PDA</div>
                  <div style={styles.clubNameEn}>Chungbuk National University SW Dept.</div>
                </div>
              </div>
            </Link>
          </div>

          {!isMobile && (
            <nav style={styles.navSection}>
              <ul style={styles.navList}>
                {navItems.map((item, index) => (
                  <li
                    key={item.label}
                    style={styles.navItem}
                    onMouseEnter={() => {
                      setIsHovering(true);
                      setHoveredNavIndex(index);
                    }}
                    onMouseLeave={() => {
                      setIsHovering(false);
                      setHoveredNavIndex(null);
                    }}
                  >
                    <div
                      style={{...styles.invisibleBox, ...(hoveredNavIndex === index && styles.hoverBorder)}}
                    >
                      <button
                        style={{
                          ...styles.navLink,
                          ...(hoveredNavIndex === index && styles.glowText),
                        }}
                      >
                        {item.label}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div style={styles.loginSection}>
            <Link to="/login" style={styles.loginLink}>로그인</Link>
            <button
              style={{ ...styles.hamburger, display: isMobile ? 'block' : 'none' }}
              onClick={handleNavToggle}
            >
              ☰
            </button>
          </div>
        </div>

        {!isMobile && isHovering && (
          <div
            style={styles.dropdownContainer}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setHoveredDropdownIndex(null);
            }}
          >
            {navItems.map((item, index) => (
              <div
                key={item.label}
                style={{
                  ...styles.dropdownColumn,
                  borderRight: index === navItems.length - 1 ? 'none' : '1px solid #ccc',
                }}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subItem.text}
                    to={subItem.link}
                    style={{
                      ...styles.dropdownText,
                      ...(hoveredDropdownIndex === `${index}-${subIndex}` && styles.glowTextDark),
                    }}
                    onMouseEnter={() => setHoveredDropdownIndex(`${index}-${subIndex}`)}
                    onMouseLeave={() => setHoveredDropdownIndex(null)}
                  >
                    {subItem.text}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}

        {isMobile && isMenuOpen && (
          <div style={styles.mobileDrawer}>
            {navItems.map((item) => (
              <div key={item.label} style={styles.dropdownColumn}>
                <div style={styles.dropdownTitle}>{item.label}</div>
                {item.submenu.map((subItem) => (
                  <Link key={subItem.text} to={subItem.link} style={styles.dropdownText}>
                    {subItem.text}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

const styles = {
  headerWrapper: { position: 'relative', zIndex: 10, height:'10vh' },
  hoverZone: { position: 'relative', zIndex: 10 },
  header: {
    backgroundColor: '#002244', height: '10vh', display: 'flex',
    justifyContent: 'space-between', alignItems: 'center', padding: '0 20px'
  },
  navSection: { paddingRight: '17vw', display: 'flex', justifyContent: 'center' },
  invisibleBox: {
    height: '10vh', width: '120px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', backgroundColor: 'transparent', boxSizing: 'border-box', cursor: 'pointer',
     borderBottom: '3px solid transparent', // ✅ 기본 투명 border
    transition: 'border-bottom 0.3s ease', // ✅ 부드러운 전환
  },
  navList: { display: 'flex', listStyle: 'none', padding: 0, margin: 0 },
  navItem: { position: 'relative', margin: 0 },
  navLink: {
    background: 'none', border: 'none', color: '#FFFFFF', fontSize: '16px',
    fontWeight: 'bold', cursor: 'pointer', transition: 'text-shadow 0.3s ease'
  },
  dropdownContainer: {
    position: 'absolute', top: '10vh', left: 0, right: 0,
    backgroundColor: 'rgba(255,255,255,0.92)', color: '#000', display: 'flex',
    justifyContent: 'center', padding: '20px 0',
    borderTop: '2px solid #aaa', zIndex: 100,
    width: '100%', maxWidth: '100vw', overflowX: 'auto', height: '13vh'
  },
  dropdownColumn: {
    display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '120px',
    alignItems: 'flex-start', boxSizing: 'border-box', padding: '0 20px',
    borderRight: '1px solid #ddd',
  },
  dropdownText: {
    color: '#000', textDecoration: 'none', fontSize: '14px', transition: 'text-shadow 0.3s ease'
  },
  glowText: {
    textShadow: '0 0 6px #ffffff, 0 0 10px #ccccff'
  },
  glowTextDark: {
    textShadow: '0 0 3px #bbb, 0 0 6px #bbb'
  },
  mobileDrawer: {
    position: 'fixed', top: '10vh', right: 0, width: '250px', height: '100vh',
    backgroundColor: 'rgba(255,255,255,0.95)', display: 'flex', flexDirection: 'column',
    padding: '20px', boxShadow: '2px 0 5px rgba(0,0,0,0.2)', zIndex: 100
  },
  logoSection: { minWidth: '200px' },
  logoLink: { textDecoration: 'none', color: 'inherit' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoImage: { height: '7.5vh' },
  logoTextGroup: {
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
    lineHeight: '1.2', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
  },
  clubNameKo: { fontSize: '2.5vh', fontWeight: 'bold', color: '#FFFFFF' },
  clubNameEn: { fontSize: '1.3vh', color: '#FFFFFF', fontWeight: 'normal', marginTop: '4px' },
  loginLink: { textDecoration: 'none', color: '#FFFFFF', fontSize: '14px' },
  loginSection: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' },
  hamburger: {
    fontSize: '24px', background: 'none', border: 'none', color: '#fff',
    cursor: 'pointer', marginLeft: '10px'
  },
  hoverBorder: {
  borderBottom: '3px solid white',
},
};


export default Header;
