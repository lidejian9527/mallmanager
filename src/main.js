// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import HttpTool from '@/plugin/http.js'
import '@/assets/css/index.css'
import moment from 'moment'
import Crumbs from '@/components/Crumbs'

Vue.use(ElementUI)
Vue.use(HttpTool)
Vue.config.productionTip = false
Vue.filter('fmtDate', v => moment(v).format('YYYY-MM-DD'))
Vue.component(Crumbs.name, Crumbs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
