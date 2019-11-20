import React from 'react';
import PropTypes from 'prop-types';
import { Input as StrapInput, Label, FormFeedback, FormGroup } from 'reactstrap';

import Required from '../components/Required';

const Input = props => {
  const { label, errorDesc, labelClass, groupClass, required, ...rest } = props;

  return (
    <FormGroup className={groupClass}>
      <Label className={labelClass}>
        {label}:{required && <Required>*</Required>}
      </Label>
      <StrapInput {...rest} invalid={!!errorDesc} />
      {errorDesc && <FormFeedback>{errorDesc.join(',')}</FormFeedback>}
    </FormGroup>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  labelClass: PropTypes.string,
  name: PropTypes.string,
  groupClass: PropTypes.string,
  errorDesc: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  label: '',
  labelClass: '',
  name: '',
  groupClass: '',
  errorDesc: [],
  type: 'text',
  required: false,
};

export default Input;
