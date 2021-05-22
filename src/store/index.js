import Vue from 'vue'
import Vuex from 'vuex'

import profile from "@/store/modules/profile"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        profile,
    },
    strict: debug,
    // strict: false,
})
