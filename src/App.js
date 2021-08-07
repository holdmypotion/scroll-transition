import HeroSection from './components/heroSection';
import About from './components/about';
import SmoothScroll from './components/smoothScroll';

export default function App() {
  const offset = 1500;
  return (
    <>
      <HeroSection offset={offset} />
      <SmoothScroll offset={offset}>
        <About />
      </SmoothScroll>
    </>
  );
}
