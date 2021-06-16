import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLayers from 'vuelayers'
import { SelectInteraction } from 'vuelayers'

// import 'vuelayers/lib/style.css'

Vue.config.productionTip = false
Vue.use(VueLayers, {
  // global data projection, see https://vuelayers.github.io/#/quickstart?id=global-data-projection
  dataProjection: 'EPSG:4326',
})
Vue.use(SelectInteraction)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
