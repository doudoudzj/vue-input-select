import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// ...

Vue.component('input-select', require('./vue-input-select.vue')) // 下拉选择器
// ...
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
