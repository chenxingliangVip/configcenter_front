import Vue from 'vue'
import axios from 'axios'
import  {serRequestService} from './utils/servicebus/simple'

import App from './App'
import router from './router'
import store from './store'
import  './permission'
import Vue2Editor from "vue2-editor";

import VueDND from 'awe-dnd'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import sysTable from "@/components/Table/Index"; //表格组件
import popout from '@/components/PopoutDialog/Index' //弹框组件

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.serRequestService = Vue.prototype.$serRequestService = serRequestService
Vue.config.productionTip = false

Vue.component('sysTable', sysTable);
Vue.component('popout', popout);
Vue.use(ElementUI)
Vue.use(VueDND);
Vue.use(Vue2Editor);


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
