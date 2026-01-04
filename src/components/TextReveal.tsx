import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

const TextReveal: React.FC<TextRevealProps> = memo(({
  text,
  className = '',
  delay = 0,
  staggerChildren = 0.03,
}) => {
  const words = useMemo(() => text.split(' '), [text]);

  const container = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
      },
    },
  }), [delay, staggerChildren]);

  const child = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }), []);

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-2 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ perspective: '1000px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
});

TextReveal.displayName = 'TextReveal';

export default TextReveal;
