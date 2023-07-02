import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard';
import Sekolah from '../views/Sekolah';
import TambahSekolah from '../views/TambahSP.vue';
import Jurusan from '../views/Jurusan';
import TambahJurusan from '../views/TambahJurusan.vue'
import Ruang from '../views/Ruang';
import TambahRuang from '../views/TambahRuang.vue';
import Staff from '../views/Staff';
import TambahStaff from '../views/TambahStaff.vue';
import Siswa from '../views/Siswa';
import TambahSiswa from '../views/TambahSiswa.vue'
import Rombel from '../views/Rombel';
import TambahRombel from '../views/TambahRombel.vue';
import AdminSMK from '../views/AdminSMK';
import TambahAdmSMK from '../views/TambahAdmSMK.vue';
import Register from '../components/Register';
import Login from '../components/Login';
import EditSekolah from '../views/EditSekolah.vue';

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
        name: 'AdminSMK',
        path: '/adminSMK',
        component: AdminSMK
    },
    {
        name: 'TambahAdmSMK',
        path: '/tambahadminsmk',
        component: TambahAdmSMK
    },
    {
        name: 'Sekolah',
        path: '/sekolah',
        component: Sekolah
    },
    {
        name: 'TambahSekolah',
        path: '/tambahsekolah',
        component: TambahSekolah
    },
    {
        name: 'Jurusan',
        path: '/jurusan',
        component: Jurusan
    },
    {
        name: 'TambahJurusan',
        path: '/tambahjurusan',
        component: TambahJurusan
    },
    {
        name: 'Ruang',
        path: '/ruang',
        component: Ruang
    },
    {
        name: 'TambahRuang',
        path: '/tambahruang',
        component: TambahRuang
    },
    {
        name: 'Staff',
        path: '/staff',
        component: Staff
    },
    {
        name: 'TambahStaff',
        path: '/tambahstaff',
        component: TambahStaff
    },
    {
        name: 'Siswa',
        path: '/siswa',
        component: Siswa
    },
    {
        name: 'TambahSiswa',
        path: '/tambahsiswa',
        component: TambahSiswa
    },
    {
        name: 'Rombel',
        path: '/rombel',
        component: Rombel
    },
    {
        name: 'TambahRombel',
        path: '/tambahrombel',
        component: TambahRombel
    },
    {
        name: 'sekolah.edit',
        path: '/edit/:NPSN',
        component: EditSekolah,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;