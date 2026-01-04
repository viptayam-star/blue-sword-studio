import React, { useState, useEffect, useMemo, memo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const AnimatedBackground = memo(() => {
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    window.addEventListener('resize', handleResize);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Reduced particle count for better performance
  const particleCount = isMobile ? 3 : 6;

  const particles: Particle[] = useMemo(() =>
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 15,
      delay: i * 0.5,
    })),
    [particleCount]
  );

  // Skip animations if reduced motion is preferred
  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-72 h-72 rounded-full bg-primary/5 blur-2xl" style={{ top: '10%', left: '10%' }} />
        <div className="absolute w-56 h-56 rounded-full bg-primary/3 blur-2xl" style={{ bottom: '10%', right: '10%' }} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Single gradient orb with CSS animation */}
      <div
        className={`absolute rounded-full bg-primary/8 blur-2xl animate-float-slow ${
          isMobile ? 'w-48 h-48' : 'w-72 h-72'
        }`}
        style={{ top: '10%', left: '10%' }}
      />

      {/* Floating Particles - CSS animations for better performance */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/15 animate-float-particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
