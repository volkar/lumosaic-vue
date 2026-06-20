import { App } from 'vue'
import Lumosaic from './components/Lumosaic.vue'

import './components/lumosaic.css'

export { Lumosaic }
export * from './components/lumosaic'

export default {
    install: (app: App) => {
        app.component('Lumosaic', Lumosaic)
    }
}