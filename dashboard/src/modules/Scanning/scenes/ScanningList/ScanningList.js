import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

import Button from '@/components/Button';
import Notification from '@/components/Notification';
import FullScreenLoader from '@/components/FullScreenLoader';

import { fetchRecords, updateRecords } from '@/utilities/fetch';

import ScanningAddModal from './components/ScanningAddModal';
import ScanningListTable from './components/ScanningListTable';

class Scanning extends React.Component {
  state = {
    isAddOpen: false,
    isLoading: true,
    count: 0,
    page: 1,
    scannings: [],
  }

  componentDidMount() {
    this.fetchRepositories()
    this.fetchRepositoriesCount()
  }

  handleModalStatus = (status) => () => {
    this.setState({
      isAddOpen: status,
    })
  }

  handleRowClick = (e, row) => {
    const { history } = this.props
    history.push(`/scan/${row.id}`)
  }

  handleSubmit = async (data) => {
    this.setState({
      isLoading: true,
    });

    const [err, result] = await updateRecords(`scan`, data);
    if (result) {
      this.setState({
        page: 1,
        isAddOpen: false,
      }, () => {
        this.fetchRepositories()
        this.fetchRepositoriesCount()
        Notification.showSuccessNotification({
          message: 'Successfully saved!!'
        });
      })
    }

    if (err) {
      Notification.showErrorNotification({
        message: err.data.error
      });
    }

    this.setState({
      isLoading: false,
    });
  }

  fetchRepositories = async () => {
    this.setState({
      isLoading: true,
    });

    const { page } = this.state;
    const [, result] = await fetchRecords(`scan?page=${page}`);
    this.setState({
      isLoading: false,
    })

    if (result) {
      this.setState({
        scannings: result,
      });
    }
  }

  fetchRepositoriesCount = async () => {
    const [, result] = await fetchRecords('scan/count');
    if (result) {
      this.setState({
        count: result,
      });
    }
  }

  handleTableChange = (type, { page }) => {
    if (type === 'pagination') {
      this.setState({
        page,
      }, () =>  this.fetchRepositories());
    }
  }

  render() {
    const {
      isAddOpen,
      scannings,
      count,
      isLoading,
    } = this.state;

    return (
      <>
        <FullScreenLoader loading={isLoading} />
        {
          isAddOpen && (
            <ScanningAddModal
              isOpen={isAddOpen}
              onClose={this.handleModalStatus(false)}
              onSubmit={this.handleSubmit}
            />
          )
        }

        <Card>
          <CardHeader>
            <Row>
              <Col xs="9">
                Scanning Repositories
              </Col>
              <Col xs="3" className="text-right">
                <Button
                  size="sm"
                  icon="plus"
                  onClick={this.handleModalStatus(true)}
                >
                  Add Repository
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <ScanningListTable
              onRowClick={this.handleRowClick}
              data={scannings}
              count={count}
              onTableChange={this.handleTableChange}
            />
          </CardBody>
        </Card>
      </>
    );
  }
}

export default Scanning;
