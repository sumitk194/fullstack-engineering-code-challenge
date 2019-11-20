export const SCAN_STATUS_QUEUED = 'queued';
export const SCAN_STATUS_IN_PROGRESS = 'inProgress';
export const SCAN_STATUS_SUCCESS = 'success';
export const SCAN_STATUS_FAILURE = 'failure';

export const SCAN_STATUSES = [SCAN_STATUS_QUEUED, SCAN_STATUS_IN_PROGRESS, SCAN_STATUS_SUCCESS, SCAN_STATUS_FAILURE];

export const STATUS_OPTIONS = [
  {
    value: SCAN_STATUS_QUEUED,
    name: 'Queued',
  },
  {
    value: SCAN_STATUS_IN_PROGRESS,
    name: 'In Progress',
  },
  {
    value: SCAN_STATUS_SUCCESS,
    name: 'Success',
  },
  {
    value: SCAN_STATUS_FAILURE,
    name: 'Failure',
  },
]

const getStatusColor = (status) => {
  let color;
  switch (status) {
    case SCAN_STATUS_IN_PROGRESS:
      color = 'warning';
      break;
    case SCAN_STATUS_QUEUED:
      color = 'primary';
      break;
    case SCAN_STATUS_SUCCESS:
        color = 'success';
        break;
    default:
      color = 'danger';
  }

  return color;
}

export {
  getStatusColor,
};
