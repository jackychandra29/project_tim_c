<template>
    <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <a class="nav-link" href="/dashboard" v-if="user.role===0">
        <i class="bi bi-grid fs-5"></i>
        <span>Dashboard</span>
      </a>

      <a class="nav-link" href="/adminSMK" v-if="user.role===0">
        <i class="bi bi-grid fs-5"></i>
        <span>Admin SMK</span>
      </a>

      <li class="nav-heading" style="font-size: 12px" v-if="user.role===0">Data Pendidikan</li>
      <li class="nav-item" v-if="user.role===0">
        <router-link class="nav-link" to="/sekolah">
          <i class="bi bi-building-fill-up fs-5"></i>
          <span>Sekolah</span>
        </router-link>
        <a class="nav-link" href="/jurusan">
          <i class="bi bi-vector-pen fs-5"></i>
          <span>Jurusan</span>
        </a>
        <a class="nav-link" href="/ruang">
          <i class="bi bi-house-up fs-5"></i>
          <span>Ruang</span>
        </a>
        <a class="nav-link" href="/staff">
          <i class="bi bi-person-video3 fs-5"></i>
          <span>Staff</span>
        </a>
        <a class="nav-link" href="/siswa">
          <i class="bi bi-person-video2 fs-5"></i>
          <span>Siswa</span>
        </a>
        <a class="nav-link" href="/rombel">
          <i class="bi bi-diagram-3 fs-5"></i>
          <span>Rombel</span>
        </a>
      </li>

      <li class="nav-heading" style="font-size: 12px" v-if="user.role===1">Data Sekolah</li>
      <li class="nav-item" v-if="user.role===1">
        <router-link class="nav-link" to="/sekolahSMK">
          <i class="bi bi-building-fill-up fs-5"></i>
          <span>Profil Sekolah</span>
        </router-link>
        <a class="nav-link" href="/jurusanSMK">
          <i class="bi bi-vector-pen fs-5"></i>
          <span>Jurusan</span>
        </a>
        <a class="nav-link" href="/ruangSMK">
          <i class="bi bi-house-up fs-5"></i>
          <span>Ruang</span>
        </a>
        <a class="nav-link" href="/staffSMK">
          <i class="bi bi-person-video3 fs-5"></i>
          <span>Staff</span>
        </a>
        <a class="nav-link" href="/siswaSMK">
          <i class="bi bi-person-video2 fs-5"></i>
          <span>Siswa</span>
        </a>
        <a class="nav-link" href="/rombelSMK">
          <i class="bi bi-diagram-3 fs-5"></i>
          <span>Rombel</span>
        </a>
      </li>
      <!-- End Dashboard Nav -->
    </ul>
  </aside>
</template>

<script>
import { onMounted, ref , computed} from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {

  setup() {
    //reactive state

    let user = ref([]);

    const store = useStore(); // Menggunakan useStore() untuk mendapatkan instance store
    const router = useRouter();

    const loggedIn = computed(() => {
      return store.state.loggedIn;
    });

    //mounted
    onMounted(() => {
        if (loggedIn.value) {
        // Tidak perlu melakukan axios.get untuk mengambil data pengguna karena data sudah ada di Vuex
        user.value = store.getters.user;
        console.log(user.value);
      } else {
        router.push({ name: 'Login' });
      }
        
    });

    //return
    return {
      user,
    };
  },
};
</script>