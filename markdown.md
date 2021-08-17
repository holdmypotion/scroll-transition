# smoothScroll.js

Alright now, we'll be adding a smooth scrolling effect to for the rest of the page, i.e. the 'about' section.

Copy and Paste this code in `src/components/smoothScroll.js`

```jsx
import React, { useRef, useState, useEffect } from 'react';
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from 'framer-motion';
// 1. 
import useWindowSize from '../hooks/useWindowSize';

const SmoothScroll = ({ children, offset = 1500 }) => {
  const size = useWindowSize();
  const scrollRef = useRef(null);
  const [pageHeight, setPageHeight] = useState(0);
  
  // 2.
  useEffect(() => {
    const setBodyHeight = () => {
      setPageHeight(scrollRef.current.getBoundingClientRect().height);
    };
    setBodyHeight();
  }, [size.height, scrollRef]);

  // 3.
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
      {/* 4. */}
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
      {/* 5. */}
      <div style={{ height: pageHeight }} />
    </>
  );
};

export default SmoothScroll;
```

Let's break it down.

All the imports are identical to the ones in the `heroSection.js` component apart from the `useWindowSize` hook. 

1. `useWindowSize`:  This is a custom hook that we are using to get the viewport height in pixels.
The way this works is, you add an `EventListener` of type `resize` and attach to it a function that updates a state storing the height of the window.
2. Here we are calling a calling a function `setBodyHeight` to update a state, named `pageHeight`, with the height of referenced container whenever the viewport height changes.
3. This is similar to the operations we executed in `heroSection.js`. Get the position of the scroll - Change the value of a variable based on changing value of the scroll using `useTransform` - use `useSpring` to turn the change from linear to smooth.
4. Here we are passing the dynamic values to the so-called scrolling container
5. Lastly, we are adding this empty div of height equal to the total scrolling area ,i.e. `pageHeight`. This allows us to scroll, as the `imageContainer` is set to `position: fixed`
