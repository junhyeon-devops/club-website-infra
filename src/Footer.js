import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.topRow}>
          <p style={styles.copyRightRow}>
            <span style={styles.copy}>Copyright © PDA All Rights Reserved.</span>
            <span style={styles.icons}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
                <img src="/insta.png" alt="Instagram" style={{ ...styles.iconImg, borderRadius: '20%' }} />
              </a>
              <a href="https://github.com/kjh0530/Web_SoftWare" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
                <img src="/github.png" alt="GitHub" style={{ ...styles.iconImg, borderRadius: '20%' }}/>
              </a>
            </span>
          </p>
        </div>
        <hr style={styles.divider} />
        <div style={styles.bottomRow}>
          <div style={styles.left}>
            <p style={styles.made}>Made by 세주준나잘함</p>
            <p>2025 Ver. Created by 박세민, 김주훈, 윤준현</p>
            <p>충청북도 청주시 서원구 충대로 1, 충북대학교 S4-1 116호</p>
            <p>cbnupda@cbnu.ac.kr</p>
          </div>
          <div style={styles.right}>
            <div style={styles.positionGroup}>
              <div style={styles.positionTitle}>회장</div>
              <div style={styles.positionName}>박승준 010-1234-5678</div>
            </div>
            <div style={styles.positionGroup}>
              <div style={styles.positionTitle}>부회장</div>
              <div style={styles.positionName}>우태현 010-2345-6789</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#003366',
    color: '#fff',
    padding: '20px 10px',
    fontSize: '14px',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  copyRightRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    fontSize: '13px',
  },
  copy: {
    textAlign: 'left',
  },
  icons: {
    display: 'flex',
    gap: '10px',
  },
  iconLink: {
    display: 'inline-block',
  },
  iconImg: {
    width: '24px',
    height: '24px',
  },
  divider: {
    border: 'none',
    height: '1px',
    backgroundColor: '#fff',
    margin: '5px 0',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
  },
  left: {
    flex: '2',
    minWidth: '280px',
    lineHeight: '1.8',
  },
  made: {
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  right: {
    flex: '1',
    minWidth: '240px',
    textAlign: 'right',
    lineHeight: '1.8',
  },
  positionGroup: {
    marginBottom: '20px',
  },
  positionTitle: {
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  positionName: {
    whiteSpace: 'nowrap',
  },
};

export default Footer;
