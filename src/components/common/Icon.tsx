import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import iconPaths from '../../assets/data/icons_path.json';

library.add(fas, fab);

interface IconProps {
  icon: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ icon, className = '' }) => {
  // Check if it's an SVG path reference (starts with 'svg-')
  if (icon.startsWith('svg-')) {
    const iconKey = icon.replace('svg-', '').toLowerCase();
    const pathData = (iconPaths as Record<string, string>)[iconKey];

    if (pathData) {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 32 32'
          className={className}
          fill='currentColor'
          style={{
            width: '1em',
            height: '1em',
            verticalAlign: '-0.125em',
            display: 'inline-block',
          }}
          role='img'
          aria-label={icon}
        >
          <title>{icon}</title>
          <path d={pathData} />
        </svg>
      );
    }
  }

  // Fallback to question mark icon if no match is found
  return <FontAwesomeIcon icon={faQuestionCircle} className={className} title={icon} />;
};

export default Icon;
