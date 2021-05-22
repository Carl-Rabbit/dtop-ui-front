import profileService from "@/services/profileService"

const state = () => ({
  machines: {},
})

const getters = {

}

const actions = {
  // eslint-disable-next-line no-unused-vars
  getClusterStatus(context) {
    profileService.getClusterStatus({}, resp => {
      console.log(resp)
      context.commit('changeMachines', resp)
    })
  }
}

const mutations = {
  changeMachines(state, machines) {
    console.log(machines)
    state.machines = machines
  }
}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
