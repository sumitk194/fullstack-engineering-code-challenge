import React from 'react';
import * as yup from 'yup';

import {
  Col,
  Row,
} from 'reactstrap';

import Modal from '@/components/Modal';
import SelectBox from '@/components/form/SelectBox';
import Input from '@/components/form/Input';

import {
  STATUS_OPTIONS, SCAN_STATUS_FAILURE, SCAN_STATUSES,
} from '../../../scanningHelpers';

const scanSchema = yup.object({
  status: yup.mixed().required().oneOf(SCAN_STATUSES).label('Status'),
  repositoryName: yup.string().url().required().label('Repository Name'),
  findings: yup.array().label('Findings')
    .when('status', {
      is: (val) => val === SCAN_STATUS_FAILURE,
      then:  yup
      .array()
      .of(
        yup.object().shape({
          type: yup.string().required(),
          ruleId: yup.string().required(),
          location: yup.object().shape({
            path: yup.string(),
            positions: yup.object().shape({
              begin: yup.object().shape({
                line: yup.string().required(),
              }).required(),
            }).required(),
          }).required(),
          metadata: yup.object().shape({
            description: yup.string().required(),
            severity: yup.string().required(),
          }).required()
        })
      ).required('Please enter valid findings'),
      otherwise: yup.array(),
    }),
});

class ScanningAddModal extends React.Component {
  state = {
    repositoryName: '',
    status: '',
    findings: '',
    parsedFindings: [],
    disabled: true,
    errors: {},
    touched: {},
  }

  handleBlur = (fieldName) => () => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [fieldName]: true,
      }
    }, () => this.handleValidate());
  }

  handleChange = (fieldName) => (event) => {
    this.setState({
      [fieldName]: event.target.value,
    }, () => this.handleValidate());
  }

  handleFindingsChange = event => {
    const { value } = event.target;

    let parsedFindings = [];
    try {
      parsedFindings = JSON.parse(value);
    } catch (err) {
      console.log('Parsing Error', err)
    }

    this.setState({
      findings: value,
      parsedFindings,
    })
  }

  handleValidate = () => {
    const {
      repositoryName,
      status,
      parsedFindings,
    } = this.state;

    scanSchema.validate({
      repositoryName,
      status,
      findings: parsedFindings,
    }, { abortEarly: false })
      .then(() => {
        this.handleErrors(null);
      })
      .catch((errors) => {
        this.handleErrors(errors);
      });
  }

  handleErrors = (errors) => {
    const parsedErrors = {};
    if (errors) {
      errors.inner.forEach((error) => {
        const paths = error.path.split('[');
        if (!parsedErrors[paths[0]]) {
          parsedErrors[paths[0]] = [];
        }
        parsedErrors[paths[0]].push(error.message);
      });
    }

    this.setState({
      errors: parsedErrors,
      disabled: this.hasErrors(parsedErrors),
    });
  }

  getError = (field) => {
    const { errors, touched } = this.state;

    if (!touched[field]) {
      return null;
    }
    return errors[field] || '';
  }

  hasErrors = (errors) => {
    return Object.keys(errors).length !== 0;
  }

  isTouched = () => {
    const { touched } = this.state;
    return Object.keys(touched).length !== 0;
  }

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const {
      repositoryName,
      status,
      parsedFindings,
    } = this.state;

    onSubmit({
      repositoryName,
      status,
      findings: status === SCAN_STATUS_FAILURE ? parsedFindings : [],
    });
  }

  render() {
    const { isOpen, onClose } = this.props;
    const { repositoryName, status, findings, disabled } = this.state;

    return (
      <>
        <Modal.Primary
          isOpen={isOpen}
          title="Scan Result"
          onSubmit={this.handleSubmit}
          onClose={onClose}
          disabled={disabled}
          size="large"
        >
          <Row>
            <Col xs="12">
              <Input
                label="Repository Name"
                required
                value={repositoryName}
                onChange={this.handleChange('repositoryName')}
                errorDesc={this.getError('repositoryName')}
                onBlur={this.handleBlur('repositoryName')}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <SelectBox
                label="Status"
                options={STATUS_OPTIONS}
                required
                value={status}
                onChange={this.handleChange('status')}
                errorDesc={this.getError('status')}
                onBlur={this.handleBlur('status')}
              />
            </Col>
          </Row>
          {
            status === SCAN_STATUS_FAILURE && (
              <Row>
                <Col xs="12">
                  <Input
                    label="Findings"
                    type="textarea"
                    required
                    value={findings}
                    errorDesc={this.getError('findings')}
                    onChange={this.handleFindingsChange}
                    onBlur={this.handleBlur('findings')}
                  />
                </Col>
              </Row>
            )
          }
        </Modal.Primary>
      </>
    );
  }
}

export default ScanningAddModal;
