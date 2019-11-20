import axios from 'axios';

const processRecords = async (path, method = 'GET', data = null) => {
  return new Promise((resolve) => {
    axios({
      method,
      url: `${process.env.REACT_APP_API_URL}/${path}`,
      data,
    })
    .then(result => resolve([null, result.data]))
    .catch(error => resolve([error.response, null]))
  });
}

const fetchRecords = async (path) => {
  return processRecords(path);
}

const updateRecords = async (path, data) => {
  return processRecords(path, 'POST', data)
}

export {
  fetchRecords,
  updateRecords
};
