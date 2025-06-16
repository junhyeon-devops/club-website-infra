import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { none } from '@cloudinary/url-gen/qualifiers/fontHinting';

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

  const location = useLocation();
  const navigate = useNavigate();
  const { isLogged, logout } = useAuth();

  const tabOrder = ['about', 'schedule', 'community', 'resources'];
  const menuItems = {
    about: ['동아리 소개', '교수님 소개', '현 임원 소개'],
    schedule: ['캘린더', '내 일정'],
    community: ['대회/공모전', '프로젝트', '스터디', '자유게시판'],
    resources: ['학습자료', '졸업요건'],
  };
  const linkPaths = {
    '동아리 소개': '/intro/clubintro',
    '교수님 소개': '/intro/professors',
    '현 임원 소개': '/intro/staff',
    '캘린더': '/schedule/calendar',
    '내 일정': '/schedule/schedulelist',
    '대회/공모전': '/community/recuit?category=대회/공모전',
    '프로젝트': '/community/recuit?category=프로젝트',
    '스터디': '/community/recuit?category=스터디',
    '자유게시판': '/community/recuit?category=자유게시판',
    '학습자료': '/resources/learning',
    '졸업요건': '/resources/graduation',
  };

  const handleResize = () => {
    const nowMobile = window.innerWidth <= 1200;
    setIsMobile(nowMobile);
    if (!nowMobile) setIsMobileMenuOpen(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/', { replace: true });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setShowDropdown(false);
    setHoveredTab(null);
  }, [location.pathname]);

  return (
    <div className="header-wrapper">
      <nav className="main-nav" onMouseLeave={() => { setShowDropdown(false); setHoveredTab(null); }}>
        <div className="container-fluid text-white py-2">
          <div className="row align-items-center text-center">
            <div className="col-2 d-flex align-items-center justify-content-start ps-3">
              <Link to="/" className="text-white text-decoration-none" style={{ cursor: 'pointer' }}>
                <div className="d-flex align-items-center">
                  <img src="/logo.png" alt="logo" style={{ height: '30px', marginRight: '8px' }} />
                  <div className="logo-text">
                    <div className="fw-bold">PDA</div>
                    <div style={{ fontSize: '0.75rem' }}>Chungbuk National University SW Dept.</div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-2"></div>

            {!isMobile &&
              tabOrder.map((tab) => (
                <div
                  key={tab}
                  className="col-1 nav-item"
                  onMouseEnter={() => {
                    setHoveredTab(tab);
                    setShowDropdown(true);
                  }}
                >
                  <Link
                    to={
                      tab === 'community'
                        ? '/community/recuit?category=전체'
                        : linkPaths[menuItems[tab][0]]
                    }
                    className="text-white text-decoration-none text-center"
                  >
                    {tab === 'about'
                      ? '소개'
                      : tab === 'schedule'
                        ? '일정'
                        : tab === 'community'
                          ? '커뮤니티'
                          : '자료실'}
                  </Link>
                </div>
              ))}

            <div className="col-3"></div>

            <div className="col-1 text-end pe-3 login-btn">
              {isLogged ? (
                <Link to="#" onClick={handleLogout} className="text-white text-decoration-none">
                  <FaSignOutAlt style={{ marginRight: 4, textDecoration: 'none' }} />
                  로그아웃
                </Link>
              ) : (
                <Link to="/login" onClick={handleLoginClick} className="text-white text-decoration-none">
                  <FaSignInAlt />
                  로그인
                </Link>
              )}
            </div>
          </div>
        </div>

        {isMobile && (
          <div className={`hamburger-fixed ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(p => !p)}>
            &#9776;
          </div>
        )}

        {showDropdown && !isMobile && (
          <div className="mega-dropdown">
            <div className="container-fluid">
              <div className="row">
                <div className="col-4"></div>
                {tabOrder.map((key) => (
                  <div key={key} className="col-1 dropdown-col">
                    {menuItems[key].map((item, idx) => (
                      <Link
                        key={idx}
                        to={linkPaths[item] || '#'}
                        className="dropdown-item text-decoration-none"
                        onClick={() => setShowDropdown(false)}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                ))}
                <div className="col-4"></div>
              </div>
            </div>
          </div>
        )}

        {isMobileMenuOpen && (
          <div className="mobile-overlay show" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
              {tabOrder.map((key) => (
                <div key={key} className="mobile-sidebar-section">
                  <div className="mobile-menu-category">{key.toUpperCase()}</div>
                  {menuItems[key].map((item, idx) => (
                    <Link
                      key={idx}
                      to={linkPaths[item] || '#'}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="mobile-menu-item"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              ))}
              {isLogged ? (
                <Link to="#" onClick={handleLogout} className="mobile-menu-item">
                  로그아웃
                </Link>
              ) : (
                <Link to="/login" onClick={() => { setIsMobileMenuOpen(false); handleLoginClick(); }} className="mobile-menu-item">
                  로그인
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
