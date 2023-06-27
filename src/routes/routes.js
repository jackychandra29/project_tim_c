import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard';
import Sekolah from '../views/Sekolah';
import Jurusan from '../views/Jurusan';
import Ruang from '../views/Ruang';
import Staff from '../views/Staff';
import Siswa from '../views/Siswa';
import Rombel from '../views/Rombel';
import Register from '../components/Register';
import Login from '../components/Login';

const routes = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: Dashboard
    },
    {
        name: 'Login',
        path: '/',
        component: Login
    },
    {
        name: 'Register',
        path: '/register',
        component: Register
    },
    {
        name: 'Sekolah',
        path: '/sekolah',
        component: Sekolah
    },
    {
        name: 'Jurusan',
        path: '/jurusan',
        component: Jurusan
    },
    {
        name: 'Ruang',
        path: '/ruang',
        component: Ruang
    },
    {
        name: 'Staff',
        path: '/staff',
        component: Staff
    },
    {
        name: 'Siswa',
        path: '/siswa',
        component: Siswa
    },
    {
        name: 'Rombel',
        path: '/rombel',
        component: Rombel
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;