import Vue from 'vue'
import App from './App'

import basics from './pages/basics/home.vue'
Vue.component('basics',basics);

import components from './pages/component/home.vue'
Vue.component('components',components);

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin);

import page from './pages/page/home.vue'
Vue.component('page',page);

import sysComponents from './pages/sys-component/home.vue'
Vue.component('sys-components',sysComponents);

import other from './pages/other/home.vue'
Vue.component('other',other);

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()





