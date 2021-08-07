import React, { useRef, useState, useEffect } from 'react';
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from 'framer-motion';
import useWindowSize from '../hooks/useWindowSize';

const SmoothScroll = ({ children, offset }) => {
  const size = useWindowSize();
  const scrollRef = useRef(null);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const setBodyHeight = () => {
      setPageHeight(scrollRef.current.getBoundingClientRect().height);
    };
    setBodyHeight();
  }, [size.height, scrollRef]);

  const { scrollY } = useViewportScroll();
  const transform = useTransform(
    scrollY,
    [offset, offset + pageHeight],
    [size.height, -pageHeight]
  );
  const physics = { damping: 15, mass: 0.27, stiffness: 95 };
  const spring = useSpring(transform, physics);
  console.log(pageHeight);
  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{
          y: spring,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
      <div style={{ height: pageHeight }} />
    </>
  );
};

export default SmoothScroll;
