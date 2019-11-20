import React, { Component } from 'react';
import { Input, Label, FormFeedback, FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { Array } from 'core-js';

import Required from '../components/Required';

class SelectBox extends Component {
  getOptions = () => {
    const { options } = this.props;

    return options.map(option => (
      <option value={option.value} key={option.value}>
        {option.name}
      </option>
    ));
  };

  render() {
    const {
      placeholder,
      options,
      label,
      errorDesc,
      labelClass,
      groupClass,
      required,
      ...rest
    } = this.props;

    return (
      <>
        <FormGroup className={groupClass}>
          <Label className={labelClass}>
            {label}:{required && <Required>*</Required>}
          </Label>
          <Input type="select" {...rest} invalid={!!errorDesc}>
            <option value="" selected>
              Select
            </option>
            {this.getOptions()}
          </Input>
          {errorDesc && <FormFeedback invalid>{errorDesc.join(', ')}</FormFeedback>}
        </FormGroup>
      </>
    );
  }
}

SelectBox.propTypes = {
  label: PropTypes.string,
  options: PropTypes.instanceOf(Array),
  labelClass: PropTypes.string,
  groupClass: PropTypes.string,
  errorDesc: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

SelectBox.defaultProps = {
  label: '',
  options: [],
  errorDesc: [],
  labelClass: '',
  groupClass: '',
  placeholder: '',
  required: false,
};

export default SelectBox;
