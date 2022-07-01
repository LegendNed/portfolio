import { createApp } from 'vue'
import App from './App.vue'

import plugins from './util/plugins'
import './assets/styles.scss'

import VueFinalModal from 'vue-final-modal'
import Modal from './components/modal.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faBell, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faVolumeUp, faBell, faPowerOff)

createApp(App)
    .use(plugins)
    .use(VueFinalModal())
    .component('Modal', Modal)
    .component('icon', FontAwesomeIcon)
    .mount('#app')
