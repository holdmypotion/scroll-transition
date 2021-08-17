import React from 'react';
// 1.
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from 'framer-motion';

import styles from '../styles/heroSection.module.css';
import heroImage from '../assets/images/5.jpeg';

export default function HeroSection({ offset = 1500 }) {
  // 2.
  const { scrollY } = useViewportScroll();
  // 3.
  const scale = useTransform(scrollY, [0, offset], [1, 5]);
  const opacity = useTransform(scrollY, [0, offset], [3, 0]);
  const moveDown = useTransform(scrollY, [0, offset], [0, -1200]);

  // 4.
  const physics = { damping: 15, mass: 0.27, stiffness: 95 };
  const scaleSmooth = useSpring(scale, physics);
  const opacitySmooth = useSpring(opacity, physics);
  const moveDownSmooth = useSpring(moveDown, physics);
  return (
    <>
      <div className={styles.imageContainer}>
        {/* 5. */}
        <motion.img
          src={heroImage}
          alt='Model'
          style={{
            opacity: opacitySmooth,
            scale: scaleSmooth,
            y: moveDownSmooth,
          }}
        />
      </div>
      {/* 6. */}
      <div style={{ background: '#030303', height: `${offset}px` }}></div>
      <div style={{ background: '#030303', height: `100vh` }}></div>
    </>
  );
}
