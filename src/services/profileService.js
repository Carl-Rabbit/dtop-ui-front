import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
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

function post(url, param, callback, errCallBack) {
  request({
    url,
    method: 'post',
    params: param
  }).then(response => {
    callback(response.data)
  }, errResponse => {
    errCallBack(errResponse)
  })
}


function getClusterStatus(param, callback, errCallBack) {
  get('/cluster_status', param, callback, err => {
    errCallBack();
    console.log('get xxx', err)
  })
}

function switchWorkerStatus(param, callback, errCallBack) {
  post('/cluster_exec_cmd', param, callback, err => {
    errCallBack();
    console.log('post xxx', err)
  })
}

export default {
  getClusterStatus,
  switchWorkerStatus,
}
