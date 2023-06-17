import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard';
import Sekolah from '../views/Sekolah';

const routes = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard
    },
    {
        name: 'Sekolah',
        path: '/sekolah',
        component: Sekolah
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;