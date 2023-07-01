import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import routes from './routes/routes';

const app = createApp(App);

// Menggunakan Vuex Store
app.use(store);

// Menggunakan router Vue
app.use(routes);

app.mount('#app');


