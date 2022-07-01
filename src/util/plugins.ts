import mitt from 'mitt'
import { App } from 'vue'

export default {
    install(Vue: App) {
        const emitter = mitt()

        Vue.provide('stack', {
            on: emitter.on,
            emit: emitter.emit
        })
    }
}