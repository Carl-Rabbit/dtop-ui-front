import profileService from "@/services/profileService"
import dateToString from '@/utils/time'

const state = () => ({
  connect: false,
  clusterStatus: {},
  clusterStatusUpdateTime: '--',
})

const getters = {

}

const actions = {
  getClusterStatus(context) {
    profileService.getClusterStatus({}, resp => {
      context.commit('changeClusterStatus', resp)
    }, errResp => {
      console.log(errResp)
    })
    context.commit('changeClusterStatus', null)
  },
  switchWorkerStatus(context, {addr, workerName, cmdType}) {
    profileService.switchWorkerStatus({
      addr, workerName, cmdType
    }, resp => {
      console.log(resp)
    }, errResp => {
      console.log(errResp)
    })
  }
}

const mutations = {
  changeClusterStatus(state, clusterStatus) {
    state.connect = true
    state.clusterStatus = clusterStatus
    state.clusterStatusUpdateTime = dateToString(new Date(), 'yy-MM-dd HH:mm:ss')

    state.clusterStatus = {
      "serverStatusArr": [{
        "addr": "127.0.0.1:8080",
        "workerStatusArr": [{
          "workerName": "Memory usage worker",
          "status": "RUNNING",
          "futures": [{
            "label": "MEM_USAGE",
            "desc": "The overall memory usage"
          }, {
            "label": "MEM_PER_PROC",
            "desc": "The detail memory info of processes"
          }]
        }, {
          "workerName": "Memory monitor worker",
          "status": "RUNNING",
          "futures": [{
            "label": "MEM_USAGE",
            "desc": "The overall memory usage"
          }, {
            "label": "MEM_PER_PROC",
            "desc": "The detail memory info of processes"
          }]
        }],
        "status": "Indirect"
      }, {
        "addr": "127.0.0.1:8080",
        "workerStatusArr": [{
          "workerName": "Memory usage worker",
          "status": "RUNNING",
          "futures": [{
            "label": "MEM_USAGE",
            "desc": "The overall memory usage"
          }, {
            "label": "MEM_PER_PROC",
            "desc": "The detail memory info of processes"
          }]
        }, {
          "workerName": "Memory monitor worker",
          "status": "RUNNING",
          "futures": [{
            "label": "MEM_USAGE",
            "desc": "The overall memory usage"
          }, {
            "label": "MEM_PER_PROC",
            "desc": "The detail memory info of processes"
          }]
        }],
        "status": "Indirect"
      }]

    }

    // init data
    state.clusterStatus.serverStatusArr.forEach(status => {
      status['workerNum'] = status.workerStatusArr.length
      status.workerStatusArr.forEach(workerStatus => {
        workerStatus['serverAddr'] = status.addr
      })
    })
    console.log('clusterStatus', state.clusterStatus)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
