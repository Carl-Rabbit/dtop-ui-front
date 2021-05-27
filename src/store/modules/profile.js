import profileService from "@/services/profileService"
import dateToString from '@/utils/time'

const state = () => ({
  connect: false,
  clusterStatus: {},
  clusterStatusUpdateTime: '--',

  clusterMetric: {},

  tracedProc: null,
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
    // context.commit('changeClusterStatus', null)
  },
  switchWorkerStatus(context, {addr, workerName, cmdType}) {
    profileService.switchWorkerStatus([{
      addr, workerName, cmdType
    }], resp => {
      console.log("workerStatus update")
      context.dispatch('getClusterStatus')
      console.log(resp)
    }, errResp => {
      console.log(errResp)
    })
  },
  getClusterMetric(context, requestArray) {
    profileService.getClusterMetric(requestArray, resp =>{
      context.commit('changeClusterMetric', resp)
      console.log(resp)
    }, errResp => {
      console.log(errResp)
    })
  },
  modifyTracedProc(context, {addr, paramStr}) {
    let param = [{
      addr,
      futureArr: ['UPDATE_TRACE_PROC'],
      paramArr: [paramStr],
    }]
    console.log('modifyTracedProc param', param)
    profileService.getClusterMetric(param,resp =>{
      console.log(resp)
    }, errResp => {
      console.log(errResp)
    })
  },
  getTracedProc(context) {
    profileService.getClusterMetric([{
      addr: '',
      futureArr: ['REPORT_TRACE_PROC'],
      paramArr: ['']
    }], resp => {
      context.commit('changeTracedProc', resp)
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

    console.log(state.clusterStatus)
    console.log(state.clusterStatus.serverStatusArr[0])
    // init data
    state.clusterStatus.serverStatusArr.forEach(status => {
      status['workerNum'] = status.workerStatusArr.length
      status.workerStatusArr.forEach(workerStatus => {
        workerStatus['serverAddr'] = status.addr
      })
    })
    console.log('clusterStatus', state.clusterStatus)
  },
  changeClusterMetric(state, clusterMetric) {
    console.log('xxx', clusterMetric)
    state.clusterMetric = clusterMetric
  },
  changeTracedProc(state, tracedProc) {
    console.log(tracedProc)
    state.tracedProc = tracedProc
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
