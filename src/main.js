import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI';
import svgs from './svg'
import "@fontsource/vollkorn";
import "@fontsource/vollkorn/500.css";
import './index.css'


const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

svgs.forEach(svg => {
    app.component(svg.name, svg)
})



app
    .mount('#app')
