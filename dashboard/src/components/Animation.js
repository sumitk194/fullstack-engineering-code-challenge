import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const AnimationContainer = ({ children }) => <div className="animated fadeIn">{children}</div>;

AnimationContainer.propTypes = propTypes;

export default AnimationContainer;
