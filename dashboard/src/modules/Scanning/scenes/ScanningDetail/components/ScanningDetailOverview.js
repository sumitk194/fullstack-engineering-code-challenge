import React from 'react';
import {
  Badge,
  Col,
  Row,
} from 'reactstrap';
import styled from 'styled-components';

import {
  getStatusColor,
} from '../../../scanningHelpers';

const Div = styled.div`
  margin: 1rem
`;

export default ({scan}) => (
  <Div>
    <Row>
      <Col xs="6" className="text-right">
        <strong>
          Repository:
        </strong>
      </Col>
      <Col xs="auto">
        {scan.repositoryName}
      </Col>
    </Row>
    <Row>
      <Col xs="6" className="text-right">
        <strong>
          Status:
        </strong>
      </Col>
      <Col xs="auto">
        <Badge color={getStatusColor(scan.status)}>{scan.status}</Badge>
      </Col>
    </Row>
  </Div>
);
