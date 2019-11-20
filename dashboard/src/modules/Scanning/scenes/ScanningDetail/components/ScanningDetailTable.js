import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [
  {
    dataField: 'ruleId',
    text: 'Rule ID'
  },
  {
    dataField: 'metadata.description',
    text: 'Description'
  },
  {
    dataField: 'metadata.severity',
    text: 'Severity'
  },
  {
    dataField: 'location.path',
    text: 'Path'
  },
  {
    dataField: 'location.positions.begin.line',
    text: 'Line'
  },
];

const options = {
  sizePerPage: 10,
  hideSizePerPage: true,
};

export default ({ findings }) => (
  <>
    <BootstrapTable
      keyField='id'
      data={ findings }
      columns={ columns }
      pagination={ paginationFactory(options) }
    />
  </>
);
