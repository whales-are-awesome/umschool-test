import { createApp, h } from 'vue'
import { svgSpritePlugin } from 'vue-svg-sprite'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import clickOutside from './directives/clickOutside';
import './assets/styles/global.css';

const app = createApp({
    setup () {
    },
    render: () => h(App)
})
.directive('click-outside', clickOutside)
.use(store, key)
.use(svgSpritePlugin, {
    url: require('./assets/sprite/gen/sprite.svg'),
    class: 'base-icon',
})
.use(router);

app.mount('#app');
