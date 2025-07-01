import { useEffect, useRef } from 'react';

export function useSwipeGesture(onSwipeLeft, onSwipeRight, threshold = 50) {
  const touchStart = useRef(null);
  const touchEnd = useRef(null);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchEnd.current = null;
      touchStart.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEnd.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (!touchStart.current || !touchEnd.current) return;
      
      const distance = touchStart.current - touchEnd.current;
      const isLeftSwipe = distance > threshold;
      const isRightSwipe = distance < -threshold;

      if (isLeftSwipe) {
        onSwipeLeft();
      }
      if (isRightSwipe) {
        onSwipeRight();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold]);
} 