import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VeeValidate from 'vee-validate';

import sess from '@/lib/session';

Vue.use(VeeValidate);

Vue.config.productionTip = false

sess.setRouterSession(router, store);

new Vue({
  vuetify,
  render: h => h(App)
  , router
  , store
}).$mount('#app')


