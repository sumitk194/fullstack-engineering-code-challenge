import React from 'react';
import PropTypes from 'prop-types';

import BaseModal from './components/BaseModal';
import withModalHOC from './withModalHOC';

const PrimaryModal = withModalHOC(BaseModal, {
  submitButtonColor: 'primary',
});

const InfoModal = withModalHOC(BaseModal, {
  submitButtonColor: 'info',
});
const WarningModal = withModalHOC(BaseModal, {
  submitButtonColor: 'warning',
});
const DangerModal = withModalHOC(BaseModal, {
  submitButtonColor: 'danger',
});

const propTypes = {
  children: PropTypes.node.isRequired,
};

class Modal extends React.Component {
  static Primary = PrimaryModal;

  static Info = InfoModal;

  static Warning = WarningModal;

  static Danger = DangerModal;

  render() {
    const { children, ...rest } = this.props;
    return <PrimaryModal {...rest}>{children}</PrimaryModal>;
  }
}

Modal.propTypes = propTypes;
export default Modal;
