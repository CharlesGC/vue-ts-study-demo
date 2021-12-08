import { createApp } from 'vue'
import App from './App.vue'

import lazyPlugins from './plugins/lazyload/index'

createApp(App).use(lazyPlugins, {

}).mount('#app')
