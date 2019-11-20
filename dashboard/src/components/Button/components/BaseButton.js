import React from 'react';
import BootstrapButton from 'reactstrap/lib/Button';
import PropTypes from 'prop-types';

import './button-style.scss';

const propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
};

const defaultProps = {
  color: 'primary',
  icon: '',
};

class Button extends React.PureComponent {
  render() {
    const { children, color, icon, ...rest } = this.props;
    return (
      <BootstrapButton color={color} {...rest}>
        {icon && <i className={`fa fa-${icon} btn-icon`} aria-hidden="true" />}
        {children}
      </BootstrapButton>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
