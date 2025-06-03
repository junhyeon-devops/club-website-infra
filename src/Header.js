import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // 🔹 useLocation 추가

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
    const [openMenu, setOpenMenu] = useState(null);
    const navRef = useRef();
    const location = useLocation(); // 🔹 현재 경로 감지

    const handleClick = (label) => {
        setOpenMenu((prev) => (prev === label ? null : label));
    };

    // 🔸 바깥 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setOpenMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 🔸 경로 변경 시 드롭다운 닫기
    useEffect(() => {
        setOpenMenu(null);
    }, [location]);

    return (
        <header style={styles.header}>
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

            <nav style={styles.navSection} ref={navRef}>
                <ul style={styles.navList}>
                    {navItems.map((item) => (
                        <li key={item.label} style={styles.navItem}>
                            <div style={{ position: 'relative' }}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(item.label);
                                    }}
                                    style={{
                                        ...styles.navLink,
                                        color: openMenu === item.label ? '#004477' : '#ffffff',
                                    }}
                                >
                                    {item.label}
                                </a>
                                {openMenu === item.label && (
                                    <ul style={styles.dropdownMenu}>
                                        {item.submenu.map((subItem) => (
                                            <li key={subItem.text} style={styles.dropdownItem}>
                                                <Link to={subItem.link} style={styles.dropdownText}>
                                                    {subItem.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={styles.loginSection}>
                <Link to="/login" style={styles.loginLink}>로그인</Link>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#002244',
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
        borderBottom: '1px solid #ddd',
        position: 'relative',
        zIndex: 10,
    },
    logoSection: {
        flex: '1',
        minWidth: '280px',
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
    navSection: {
        flex: '2.5',
        display: 'flex',
        justifyContent: 'center',
    },
    navList: {
        display: 'flex',
        listStyle: 'none',
        gap: '30px',
        padding: 0,
        margin: 0,
        position: 'relative',
    },
    navItem: {
        position: 'relative',
    },
    navLink: {
        textDecoration: 'none',
        color: '#FFFFFF',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'color 0.3s',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        padding: 0,
        marginTop: '8px',
        zIndex: 100,
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
    },
    dropdownItem: {
        padding: '10px 20px',
        fontSize: '14px',
        textAlign: 'center',
    },
    dropdownText: {
        display: 'block',
        whiteSpace: 'nowrap',
        color: '#333',
        textDecoration: 'none',
    },
    loginSection: {
        flex: '1',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    loginLink: {
        textDecoration: 'none',
        color: '#FFFFFF',
        fontSize: '14px',
    },
};

export default Header;
