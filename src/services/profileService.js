import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

function get(url, param, callback, errCallBack) {
  request({
    url,
    method: 'get',
    params: param
  }).then(response => {
    callback(response.data)
  }, errResponse => {
    errCallBack(errResponse)
  })
}

function getClusterStatus(param, callback) {
  get('/cluster_status', param, callback, err => console.log('xxx', err))
}

export default {
  getClusterStatus,
}
