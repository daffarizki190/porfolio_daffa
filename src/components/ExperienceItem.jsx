// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

/**
 * ExperienceItem Component - Renders a single experience card with animation support
 * @param {Object} props - Component props
 * @param {Object} props.item - Experience data
 * @param {React.Ref} ref - Forwarded ref for animations
 */
const ExperienceItem = React.forwardRef((props, ref) => {
  const { item } = props;

  if (!item) {
    return null;
  }


  return (
    <div
      ref={ref}
      className="p-6 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-blue-600/20 p-2 backdrop-blur-sm border border-blue-600/20">
          <img
            src={item.icon}
            alt={item.company}
            className="w-full h-full object-contain brightness-200 group-hover:scale-125 transition-all duration-300"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white/90 tracking-wide font-sans hover:text-white transition-colors duration-300">
            {item.role}
          </h3>
          <p className="text-lg font-medium mb-2 text-white/90 tracking-wide font-sans hover:text-white transition-colors duration-300">
            {item.company}
          </p>
          <p className="text-sm mb-4 text-white/80 font-sans">
            {item.period}
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            {item.tasks.map((task, idx) => (
              <li
                key={idx}
                className="text-base text-white/90 hover:text-white transition-colors duration-300 font-sans"
              >
                {task}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

ExperienceItem.propTypes = {
  item: PropTypes.shape({
    role: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

ExperienceItem.displayName = 'ExperienceItem';

export default ExperienceItem;
