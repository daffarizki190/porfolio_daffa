import React, { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Styles untuk komponen AnimatedText
 */
const styles = {
  container: {
    display: 'inline-block',
    whiteSpace: 'nowrap'
  },
  word: {
    display: 'inline-block',
    marginRight: '0.25em'
  }
};

/**
 * Komponen AnimatedText - Menampilkan teks dengan format khusus per kata
 * 
 * @param {Object} props - Props komponen
 * @param {string} props.text - Teks yang akan ditampilkan
 * @param {string|React.ComponentType} props.as - Elemen atau komponen yang akan digunakan (default: 'p')
 * @param {string} props.className - Kelas CSS tambahan
 * @returns {React.ReactElement} Komponen AnimatedText
 */
function AnimatedText({ text, as: Component = 'p', className = '' }) {
  // Memisahkan teks menjadi array kata-kata
  const words = text.split(' ');

  return (
    React.createElement(
      Component,
      { className },
      <span style={styles.container}>
        {words.map((word, index) => (
          <span
            key={`word-${index}`}
            style={styles.word}
          >
            {word}
          </span>
        ))}
      </span>
    )
  );
}

// Validasi props menggunakan PropTypes
AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ]),
  className: PropTypes.string
};

// Default props
AnimatedText.defaultProps = {
  as: 'p',
  className: ''
};

// Menggunakan memo untuk mencegah render ulang yang tidak perlu
export default memo(AnimatedText);