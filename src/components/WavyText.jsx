import React from 'react';
import { motion } from 'framer-motion';

// Varian untuk container yang akan mengatur animasi anak-anaknya
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.025, // Jeda antar setiap huruf
    },
  },
};

// Varian untuk animasi setiap huruf
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 20, // Mulai dari posisi sedikit di bawah
    transition: { type: 'spring', damping: 12, stiffness: 100 },
  },
  visible: {
    opacity: 1,
    y: 0, // Kembali ke posisi semula
    transition: { type: 'spring', damping: 12, stiffness: 100 },
  },
};

const WavyText = ({ text, as: Tag = 'span', className = '' }) => {
  const letters = text.split('');

  const MotionTag = motion[Tag] || motion.span;

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </MotionTag>
  );
};

export default WavyText;
