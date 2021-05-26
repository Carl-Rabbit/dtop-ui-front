import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale})

import Vuex from 'vuex'
import VueRouter from "vue-router";
import router from '@/router'
import store from '@/store'
import Icon from 'vue-svg-icon/Icon.vue' //引入svg插件

Vue.component('Icon', Icon) //注册svg插件

Vue.use(Vuex)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  store: store,
}).$mount('#app')
