// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import './Header.css';

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
      { text: '내 일정', link: '/schedule/schedulelist' },
    ],
  },
  {
    label: '커뮤니티',
    submenu: [
      { text: '팀원 모집', link: '/community/recuit' },
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
    <header className="header-wrapper">
      <div className="hover-zone">
        <div className="header">
          <div className="logo-section">
            <Link to="/" className="logo-link">
              <div className="logo-container">
                <img src="/logo.png" alt="로고" className="logo-image" />
                <div className="logo-text-group">
                  <div className="club-name-ko">PDA</div>
                  <div className="club-name-en">Chungbuk National University SW Dept.</div>
                </div>
              </div>
            </Link>
          </div>

          {!isMobile && (
            <nav className="nav-section">
              <ul className="nav-list">
                {navItems.map((item, index) => (
                  <li
                    key={item.label}
                    className="nav-item"
                    onMouseEnter={() => {
                      setIsHovering(true);
                      setHoveredNavIndex(index);
                    }}
                    onMouseLeave={() => {
                      setIsHovering(false);
                      setHoveredNavIndex(null);
                    }}
                  >
                    <div className={`invisible-box ${hoveredNavIndex === index ? 'hover-border' : ''}`}>
                      <button className={`nav-link ${hoveredNavIndex === index ? 'glow-text' : ''}`}>
                        {item.label}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="login-section">
            <Link
              to="/login"
              className="login-link"
              style={{ textDecoration: isLoginHover ? 'underline' : 'none', textUnderlineOffset: '4px' }}
              onMouseEnter={() => setIsLoginHover(true)}
              onMouseLeave={() => setIsLoginHover(false)}
            >
              <span className="login-content">
                <FaSignInAlt /> &nbsp;로그인
              </span>
            </Link>
            <button
              className="hamburger"
              style={{ display: isMobile ? 'block' : 'none' }}
              onClick={handleNavToggle}
            >
              ☰
            </button>
          </div>
        </div>

        {!isMobile && isHovering && (
          <div
            className="dropdown-container"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setHoveredDropdownIndex(null);
            }}
          >
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className="dropdown-column"
                style={{ borderRight: index === navItems.length - 1 ? 'none' : '1px solid #ccc' }}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subItem.text}
                    to={subItem.link}
                    className={`dropdown-text ${hoveredDropdownIndex === `${index}-${subIndex}` ? 'glow-text-dark' : ''}`}
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
            {isMenuOpen && <div className="overlay" onClick={handleNavToggle} />}

            <div
              className="mobile-drawer"
              style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
            >
              <div className="mobile-header">
                <img src="/loginlogo.png" alt="로고" className="mobile-logo-image" />
              </div>

              {navItems.map((item, index) => {
                const isActive = activeDropdownIndex === index;
                return (
                  <div key={item.label}>
                    <div
                      className="mobile-category"
                      style={{ color: isActive ? '#002244' : '#000' }}
                      onClick={() => setActiveDropdownIndex(isActive ? null : index)}
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
                      {isActive && <div className="submenu-border-top" />}
                      <div className="mobile-submenu-box">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subItem.text}
                            to={subItem.link}
                            className="mobile-submenu-item"
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

export default Header;
