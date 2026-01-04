import React, { memo, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = memo(({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
}) => {
  const variants: Variants = useMemo(() => {
    const getInitialPosition = () => {
      switch (direction) {
        case 'up':
          return { y: 60 };
        case 'down':
          return { y: -60 };
        case 'left':
          return { x: 60 };
        case 'right':
          return { x: -60 };
        case 'none':
          return {};
        default:
          return { y: 60 };
      }
    };

    return {
      hidden: {
        opacity: 0,
        ...getInitialPosition(),
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    };
  }, [direction, duration, delay]);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';

export default ScrollReveal;
