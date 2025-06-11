import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

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
      { text: '캘린더', link: '/schedule/calendar' },
      { text: '내 일정', link: '/schedule/myschedule' },
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
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [isLoginHover, setIsLoginHover] = useState(false);
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
                      style={{
                        ...styles.invisibleBox,
                        ...(hoveredNavIndex === index && styles.hoverBorder),
                      }}
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
  <Link
  to="/login"
  style={{
    ...styles.loginLink,
    textDecoration: isLoginHover ? 'underline' : 'none',
    textUnderlineOffset: '4px',
  }}
  onMouseEnter={() => setIsLoginHover(true)}
  onMouseLeave={() => setIsLoginHover(false)}
>
  <span style={styles.loginContent}>
    <FaSignInAlt />
    &nbsp;로그인
  </span>
</Link>
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

        {isMobile && (
  <>
    {isMenuOpen && <div style={styles.overlay} onClick={handleNavToggle} />}

    <div
      style={{
        ...styles.mobileDrawer,
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      <div style={styles.mobileHeader}>
        <img src="/loginlogo.png" alt="로고" style={styles.mobileLogoImage} />
      </div>

      {navItems.map((item, index) => {
        const isActive = activeDropdownIndex === index;
        return (
          <div key={item.label}>
            <div
              style={{
                ...styles.mobileCategory,
                color: isActive ? '#002244' : '#000',
              }}
              onClick={() =>
                setActiveDropdownIndex(isActive ? null : index)
              }
              onMouseEnter={(e) => (e.target.style.color = '#002244')}
              onMouseLeave={(e) => {
                if (!isActive) e.target.style.color = '#000';
              }}
            >
              {item.label}
            </div>

            <div
              style={{
                maxHeight: isActive ? '500px' : '0',
                opacity: isActive ? 1 : 0,
                padding: isActive ? '3px 10px' : '0 10px',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
              }}
            >
              {isActive && <div style={styles.submenuBorderTop} />}

              <div style={styles.mobileSubmenuBox}>
                {item.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subItem.text}
                    to={subItem.link}
                    style={{
                      ...styles.mobileSubmenuItem,
                      borderBottom:
                        subIndex === item.submenu.length - 1
                          ? 'none'
                          : '1px dotted #bbb',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#ced4da';
                      e.target.style.color = '#002244';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#000';
                    }}
                  >
                    {subItem.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </>
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
  navSection: { paddingRight: '12.5vw', display: 'flex', justifyContent: 'center' },
  invisibleBox: {
    height: '10vh', width: '10vw', display: 'flex', alignItems: 'center',
    justifyContent: 'center', backgroundColor: 'transparent', boxSizing: 'border-box', cursor: 'pointer',
    borderBottom: '3px solid transparent', transition: 'border-bottom 0.3s ease',
  },
  navList: { display: 'flex', listStyle: 'none', padding: 0, margin: 0 },
  navItem: { position: 'relative', margin: 0 },
  navLink: {
    background: 'none', border: 'none', color: '#FFFFFF', fontSize: '16px',
    fontWeight: 'bold', cursor: 'pointer', transition: 'text-shadow 0.3s ease'
  },
  dropdownContainer: {
    position: 'absolute', top: '10vh', left: 0, right: 0,
    backgroundColor: '#fff', display: 'flex', justifyContent: 'center',
    padding: '20px 0', width: '100%', maxWidth: '100vw', overflowX: 'auto',
    borderTop: '0.5px solid #aaa', height: 'auto', zIndex: 100,
  },
  dropdownColumn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    width: '10vw', boxSizing: 'border-box',
  },
  dropdownText: {
    color: '#000', textDecoration: 'none', fontSize: '15px', lineHeight: '30px',
    transition: 'text-shadow 0.3s ease', textAlign: 'center',
  },
  glowText: {
    textShadow: '0 0 6px #ffffff, 0 0 10px #ccccff'
  },
  glowTextDark: {
    textShadow: '0 0 3px rgb(226, 226, 226), 0 0 6px rgb(226, 226, 226)',
    color: '#002244',
  },
  mobileDrawer: {
    position: 'fixed', top: 0, right: 0, width: '50vw', height: '100vh',
    backgroundColor: '#e9ecef', display: 'flex', flexDirection: 'column',
    padding: '0px', zIndex: 1000, boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease-in-out',
    transform: 'translateX(100%)',
  },
  mobileHeader: {
    display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', padding:'10px'
  },
  mobileLogoImage: {
    width: '15vw',
  },
  mobileTitle: {
    fontSize: '20px', fontWeight: 'bold', color: '#002244',
  },
  mobileCategory: {
    fontSize: '17px', fontWeight: 'bold', margin: '15px 0 8px 20px', color: '#000', cursor: "pointer"
  },
  mobileSubmenuBox: {
    backgroundColor: '#dee2e6', borderRadius: '4px',
    padding: '3px 10px', marginBottom: '12px',
  },
  mobileSubmenuItem: {
    color: '#000', padding: '10px 0', textDecoration: 'none',
    borderBottom: '1px solid #ccc', display: 'block',
    transition: 'color 0.3s ease',
  },
  fabButton: {
    position: 'absolute', bottom: '20px', right: '20px',
    backgroundColor: '#f28db5', width: '50px', height: '50px',
    borderRadius: '50%', display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '24px', color: '#000',
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
  loginLink: {
  color: '#FFFFFF',
  fontSize: '2vh',
  display: 'inline-block',
  transition: 'text-decoration 0.3s ease',
},
loginContent: {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
},
  loginSection: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' },
  hamburger: {
    fontSize: '24px', background: 'none', border: 'none', color: '#fff',
    cursor: 'pointer', marginLeft: '10px'
  },
  hoverBorder: {
    borderBottom: '3px solid white'
  },
  overlay: {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
},
submenuBorderTop: {
  width: '100%',
  height: '2px',
  backgroundColor: '#002244',
  marginTop: '8px',
},
};

export default Header;
