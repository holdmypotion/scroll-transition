import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

import styles from '../styles/heroSection.module.css';
import heroImage from '../assets/images/5.jpeg';

export default function HeroSection() {
  const { scrollY } = useViewportScroll();
  const scale = useTransform(scrollY, [0, 1500], [1, 5]);
  const opacity = useTransform(scrollY, [0, 1500], [3, 0]);
  const moveDown = useTransform(scrollY, [0, 1500], [0, -1200]);
  return (
    <div>
      <h1>Hero</h1>
      <div className={styles.imageContainer}>
        <motion.img
          src={heroImage}
          alt='Model'
          style={{
            opacity: opacity,
            scale: scale,
            y: moveDown,
          }}
        />
      </div>
      <div style={{ background: '#030303', height: '3000px' }}></div>
    </div>
  );
}
