import { useEffect, useCallback, useRef } from 'react';
import './StarryBackground.css';

const StarryBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const createStar = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const star = document.createElement('div');
    star.className = 'star';

    // Random starting position
    const startX = Math.random() * window.innerWidth;
    star.style.left = `${startX}px`;
    star.style.top = '0px';

    // Random animation properties
    const duration = 2 + Math.random() * 2; // 2-4 seconds
    const offsetX = Math.random() * 100 - 50; // -50 to 50px
    const drift = Math.random() * 60 - 30; // -30 to 30px horizontal drift
    const fallDistance = window.innerHeight + 100; // Ensure it goes off screen

    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--offset-x', `${offsetX}px`);
    star.style.setProperty('--drift', `${drift}px`);
    star.style.setProperty('--fall-distance', `${fallDistance}px`);

    container.appendChild(star);

    // Store cleanup function
    const cleanup = () => {
      if (star.parentNode === container && container.contains(star)) {
        container.removeChild(star);
      }
    };

    // Remove the star after animation
    const timer = setTimeout(cleanup, duration * 1000);

    // Return cleanup function for effect
    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);  useEffect(() => {
    // Create stars more frequently (every 100ms instead of 300ms)
    const interval = setInterval(createStar, 100);
    // Create initial batch of stars
    for (let i = 0; i < 10; i++) {
      createStar();
    }
    const currentContainer = containerRef.current;

    return () => {
      clearInterval(interval);
      if (currentContainer) {
        // Clear all stars
        const stars = currentContainer.getElementsByClassName('star');
        while (stars.length > 0) {
          const star = stars[0];
          if (star.parentNode === currentContainer) {
            currentContainer.removeChild(star);
          }
        }
      }
    };
  }, [createStar]);

  return <div ref={containerRef} className="stars-container" />;
};

export default StarryBackground;