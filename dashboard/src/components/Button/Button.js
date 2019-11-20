import React from 'react';
import PropTypes from 'prop-types';

import BaseButton from './components/BaseButton';
import withButtonHOC from './withButtonHOC';

const PrimaryButton = withButtonHOC(BaseButton, 'primary');
const InfoButton = withButtonHOC(BaseButton, 'info');
const WarningButton = withButtonHOC(BaseButton, 'warning');
const DangerButton = withButtonHOC(BaseButton, 'danger');

const propTypes = {
  children: PropTypes.node.isRequired,
};

class Button extends React.Component {
  static Primary = PrimaryButton;

  static Info = InfoButton;

  static Danger = DangerButton;

  static Warning = WarningButton;

  render() {
    const { children, ...rest } = this.props;
    return <PrimaryButton {...rest}>{children}</PrimaryButton>;
  }
}

Button.propTypes = propTypes;

export default Button;
