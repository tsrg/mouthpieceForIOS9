import Vue from 'vue'
import App from './App.vue'
import Toast from "vue-toastification"

Vue.config.productionTip = false
Vue.use(Toast);

Object.defineProperty(Vue.prototype,"$bus",{
  get: function() {
    return this.$root.bus;
  }
});

new Vue({
  render: h => h(App),
  data: { bus: new Vue({}) }
}).$mount('#app')

import "vue-toastification/dist/index.css"