import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import globalCompnent from 'h5-global'
import vueCommonComponents from 'vue-common-components'

Vue.use(Vant);
Vue.use(globalCompnent);
Vue.use(vueCommonComponents);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
