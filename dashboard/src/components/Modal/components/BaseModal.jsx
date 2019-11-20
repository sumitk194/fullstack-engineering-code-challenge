import React from 'react';
import { Modal as BootstrapModal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '@/components/Button';

class BaseModal extends React.Component {
  getClassName = () => {
    const { size, className } = this.props;
    return classNames(className, {
      'modal-lg': size === 'large',
      'modal-sm': size === 'small',
    });
  };

  render() {
    const {
      submitButtonText,
      cancelButtonText,
      title,
      onClose,
      onSubmit,
      isOpen,
      children,
      submitButtonColor,
      cancelButtonColor,
      hideCancel,
      disabled,
      ...rest
    } = this.props;

    const className = this.getClassName();

    return (
      <>
        <BootstrapModal isOpen={isOpen} toggle={onSubmit} className={className} {...rest}>
          <ModalHeader toggle={onClose}>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            {!hideCancel && (
              <Button color={cancelButtonColor} onClick={onClose}>
                {cancelButtonText}
              </Button>
            )}
            <Button color={submitButtonColor} onClick={onSubmit} disabled={disabled}>
              {submitButtonText}
            </Button>
          </ModalFooter>
        </BootstrapModal>
      </>
    );
  }
}

BaseModal.defaultProps = {
  isOpen: false,
  submitButtonText: 'Save',
  cancelButtonText: 'Cancel',
  submitButtonColor: 'primary',
  cancelButtonColor: 'secondary',
  hideCancel: false,
  size: 'medium',
  className: '',
  disabled: false,
  onClose: () => {},
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  submitButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  submitButtonColor: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  hideCancel: PropTypes.bool,
  disabled: PropTypes.bool
};

export default BaseModal;
