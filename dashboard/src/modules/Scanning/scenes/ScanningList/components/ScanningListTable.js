import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import {
  Badge,
} from 'reactstrap';

import { TIME_FORMAT } from '@/utilities/timeHelpers';

import {
  SCAN_STATUS_IN_PROGRESS,
  SCAN_STATUS_QUEUED,
  SCAN_STATUS_FAILURE,
  getStatusColor,
} from '../../../scanningHelpers';

const columns = [
  {
    dataField: 'repositoryName',
    text: 'Repository Name',
  },
  {
    dataField: 'totalFindings',
    text: 'Findings',
    formatter: (cell, row) => {
      if (row.status !== SCAN_STATUS_FAILURE) {
        return null;
      }

      return (
        <Badge color="danger">{row.totalFindings}</Badge>
      )
    }
  },
  {
    dataField: 'status',
    text: 'Status',
    formatter: (cell, row) => {
      return (
        <Badge
          color={getStatusColor(row.status)}
        >
          {cell}
        </Badge>
      );
    },
  },
  {
    dataField: 'time',
    text: 'Time',
    isDummyField: true,
    formatter: (cellContent, row) => {
      let value;
      switch (row.status) {
        case SCAN_STATUS_QUEUED:
          value = row.queuedAt;
          break;
        case SCAN_STATUS_IN_PROGRESS:
          value = row.scanningAt;
          break;
        default:
          value = row.finishedAt;
      }
      return moment(value).format(TIME_FORMAT);
    }
  },
];

export default ({onRowClick, data, count, onTableChange}) => (
  <div className="selectable-table">
    <BootstrapTable
      remote
      keyField='id'
      data={data}
      columns={columns}
      pagination={paginationFactory({
        sizePerPage: 10,
        hideSizePerPage: true,
        totalSize: count,
      })}
      rowEvents={{
        onClick: onRowClick,
      }}
      onTableChange={onTableChange}
    />
  </div>
)
