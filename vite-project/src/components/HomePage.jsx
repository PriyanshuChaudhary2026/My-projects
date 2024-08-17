import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'; // Import the CSS file

function HomePage() {
  return (
    <div className={styles['landing-container']}>
      <div className={styles['hero-section']}>
        <div className={styles['overlay']}>
          <h1 className={styles['title']}>Welcome to Your Adventure</h1>
          <p className={styles['subtitle']}>A Journey of Infinite Possibilities</p>
          <Link to="/story" className={styles['start-button']}>Start Your Story</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
