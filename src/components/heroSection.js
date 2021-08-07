import React from 'react';
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from 'framer-motion';

import styles from '../styles/heroSection.module.css';
import heroImage from '../assets/images/5.jpeg';

export default function HeroSection({ offset }) {
  // const physics = { damping: 200, stiffness: 2000 };
  const physics = { damping: 15, mass: 0.27, stiffness: 95 };
  const { scrollY } = useViewportScroll();
  const scale = useTransform(scrollY, [0, offset], [1, 5]);
  const scaleSmooth = useSpring(scale, physics);
  const opacity = useTransform(scrollY, [0, offset], [3, 0]);
  const opacitySmooth = useSpring(opacity, physics);
  const moveDown = useTransform(scrollY, [0, offset], [0, -1200]);
  const moveDownSmooth = useSpring(moveDown, physics);
  return (
    <>
      <div className={styles.imageContainer}>
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
      <div style={{ background: '#030303', height: `${offset}px` }}></div>
      <div style={{ background: '#030303', height: '100vh' }}></div>
    </>
  );
}
