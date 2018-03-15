import React from 'react';
import iconStyles from './index.css';

const Icon = ({ name, styles }) => (
  <svg className={[iconStyles.icon, styles].join(' ')}>
    <use xlinkHref={`svg/icons.svg#${name}`} />
  </svg>
);

export default Icon;
