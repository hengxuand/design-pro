import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { userSessionStore } from './stores/userSessionStore.js'
import './assets/colors.css' // Import your color variables


import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// Initialize auth before mounting
const store = userSessionStore()
await store.initializeAuth()

app.mount('#app')
