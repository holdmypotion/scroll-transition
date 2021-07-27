import React from 'react';

import styles from '../styles/heroSection.module.css';
import heroImage from '../assets/images/5.jpeg';

export default function HeroSection() {
  return (
    <div>
      <h1>Hero</h1>
      <div className={styles.imageContainer}>
        <img src={heroImage} alt='Model' />
      </div>
      {/* <div style={{ background: '#030303', height: '3000px' }}></div> */}
    </div>
  );
}
