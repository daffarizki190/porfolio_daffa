import React from 'react';
import PropTypes from 'prop-types';

/**
 * VideoBackground Component - Renders a fullscreen video background with overlay
 * 
 * @param {Object} props - Component props
 * @param {string} props.videoSrc - Source URL for the video
 * @returns {React.ReactElement} VideoBackground component
 */
const VideoBackground = ({ videoSrc }) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-1000"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 transition-all duration-1000 ease-in-out"></div>
    </div>
  );
};

VideoBackground.propTypes = {
  videoSrc: PropTypes.string.isRequired,
};

export default VideoBackground;
