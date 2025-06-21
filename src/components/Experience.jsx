// @ts-nocheck
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { experiencesData } from '../data/experience.js';
import { backgrounds } from '../assets.js';
import { useExperienceAnimations } from '../hooks/useExperienceAnimations';
import VideoBackground from './VideoBackground';
import ExperienceItem from './ExperienceItem';

/**
 * Experience Component - Displays professional experience with animations
 * @param {Object} props - Component props
 * @param {Object} props.theme - Theme configuration for styling
 * @returns {React.ReactElement} Experience section
 */
const Experience = ({ theme }) => {
  const experienceRefs = useRef([]);

  // Initialize animations
  useExperienceAnimations(experienceRefs);

  return (
    <section
      id="pengalaman"
      className="py-20 relative overflow-hidden bg-black"
      data-section="pengalaman"
    >
      <VideoBackground videoSrc={backgrounds.pengalamanVideo} />

      <div className="container mx-auto max-w-4xl relative z-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white tracking-wider font-sans">
          Pengalaman
        </h2>
        <div className="space-y-8">
          {experiencesData.map((item, index) => (
            <ExperienceItem
              key={index}
              ref={el => experienceRefs.current[index] = el}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Experience.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default Experience;
