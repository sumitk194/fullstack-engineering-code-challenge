import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

import Button from '@/components/Button';
import FullScreenLoader from '@/components/FullScreenLoader';

import { fetchRecords } from '@/utilities/fetch';

import ScanningDetailTable from './components/ScanningDetailTable';
import ScanningDetailOverview from './components/ScanningDetailOverview';

class Scanning extends React.Component {
  state = {
    isLoading: true,
    scan: [],
  };

  componentDidMount() {
    this.fetchRepositoryDetail();
  }

  fetchRepositoryDetail = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.setState({
      isLoading: true,
    });

    const [, result] = await fetchRecords(`scan/${id}`);
    this.setState({
      isLoading: false,
    });

    if (result) {
      this.setState({
        scan: result,
      });
    }
  };

  render() {
    const { scan, isLoading } = this.state;

    return (
      <>
        <FullScreenLoader loading={isLoading} />
        <Card>
          <CardHeader>
            <Row>
              <Col xs="9">Scanning Detail</Col>
              <Col xs="3" className="text-right">
                <Link to="/scan">
                  <Button size="sm" icon="reply">
                    Back to Repository
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <ScanningDetailOverview scan={scan} />
            <ScanningDetailTable findings={scan.findings || []} />
          </CardBody>
        </Card>
      </>
    );
  }
}

export default Scanning;
