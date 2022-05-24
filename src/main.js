import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import './index.css'
import { useStore } from './stores/groovStore'

const app = createApp(App)

app.use(createPinia())
app.mount('#app')

const store = useStore()

// watch the screen size change events
window.addEventListener('resize', (event) => {
  store.setViewportWidthAndHeight(
    window.visualViewport.width,
    window.visualViewport.height
  )
})
