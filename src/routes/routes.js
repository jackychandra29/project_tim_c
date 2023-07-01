import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard';
import Sekolah from '../views/Sekolah';
import Jurusan from '../views/Jurusan';
import Ruang from '../views/Ruang';
import Staff from '../views/Staff';
import Siswa from '../views/Siswa';
import Rombel from '../views/Rombel';
import AdminSMK from '../views/AdminSMK';
import Register from '../components/Register';
import Login from '../components/Login';
import EditSekolah from '../views/EditSekolah.vue';
import JurusanSMK from '../views/jurusanSMK';
import SiswaSMK from '../views/siswaSMK';
import RuangSMK from '../views/ruangSMK';
import StaffSMK from '../views/staffSMK';
import RombelSMK from '../views/rombelSMK';

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
  {
    name: 'sekolah.edit',
    path: '/edit/:NPSN',
    component: EditSekolah,
  },
  {
    name: 'jurusanSMK',
    path: '/jurusanSMK',
    component: JurusanSMK,
  },
  {
    name: 'siswaSMK',
    path: '/siswaSMK',
    component: SiswaSMK,
  },
  {
    name: 'ruangSMK',
    path: '/ruangSMK',
    component: RuangSMK,
  },
  {
    name: 'staffSMK',
    path: '/staffSMK',
    component: StaffSMK,
  },
  {
    name: 'rombelSMK',
    path: '/rombelSMK',
    component: RombelSMK,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;