import React, { useState, useEffect, useRef } from 'react';
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
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
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
            <div
                style={styles.hoverZone}
                onMouseEnter={() => !isMobile && setIsHovering(true)}
                onMouseLeave={() => !isMobile && setIsHovering(false)}
            >
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
                                {navItems.map((item) => (
                                    <li key={item.label} style={styles.navItem}>
                                        <button
                                            style={styles.navLink}
                                            onMouseEnter={() => setHoveredItem(item.label)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}

                    <div style={styles.loginSection}>
                        <Link
                            to="/login"
                            onMouseEnter={() => setHoveredItem('로그인')}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                ...styles.loginLink,
                                borderBottom:
                                    hoveredItem === '로그인' ? '2px solid white' : '2px solid transparent',
                            }}
                        >
                            로그인
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
                    <div style={styles.dropdownContainer}>
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
    headerWrapper: {
        position: 'relative',
        zIndex: 10,
    },
    hoverZone: {
        position: 'relative',
        zIndex: 10,
    },
    header: {
        backgroundColor: '#002244',
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
    },
    navSection: {
        flex: '2',
        display: 'flex',
        justifyContent: 'center',
    },
    navList: {
        display: 'flex',
        listStyle: 'none',
        gap: '30px',
        padding: 0,
        margin: 0,
    },
    navItem: {
        position: 'relative',
    },
    navLink: {
        background: 'none',
        border: 'none',
        color: '#FFFFFF',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        padding: '10px 5px',
    },
    hamburger: {
        fontSize: '24px',
        background: 'none',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    logoSection: {
        minWidth: '200px',
    },
    logoLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    logoImage: {
        height: '60px',
    },
    logoTextGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        lineHeight: '1.2',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
    },
    clubNameKo: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    clubNameEn: {
        fontSize: '11px',
        color: '#FFFFFF',
        fontWeight: 'normal',
        marginTop: '4px',
    },
    loginLink: {
        textDecoration: 'none',
        color: '#FFFFFF',
        fontSize: '14px',
    },
    loginSection: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '20px'
    },
    dropdownContainer: {
        position: 'absolute',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        backgroundColor: 'rgba(255,255,255,0.75)',
        display: 'flex',
        justifyContent: 'center',
        gap: '80px',
        padding: '30px 80px',
        borderTop: '1px solid #ccc',
    },
    dropdownColumn: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        minWidth: '150px',
    },
    dropdownTitle: {
        fontWeight: 'bold',
        marginBottom: '6px',
        fontSize: '15px',
        color: '#333',
    },
    dropdownText: {
        color: '#333',
        textDecoration: 'none',
        fontSize: '14px',
    },
    mobileDrawer: {
        position: 'fixed',
        top: '80px',
        left: 0,
        width: '250px',
        height: '100vh',
        backgroundColor: 'rgba(255,255,255,0.95)',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
        zIndex: 100,
    },
};

export default Header;
