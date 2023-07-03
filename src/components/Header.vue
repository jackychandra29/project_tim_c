<template>
    <header id="header" class="header fixed-top d-flex align-items-center">
      <div class="d-flex align-items-center justify-content-between">
        <a href="index.html" class="logo d-flex align-items-center">
          <img src="assets/img/logo-color.png" alt="" />
          <span class="d-none d-lg-block" style="font-size: 16px">
            Dashboard Manajemen<br />
            Sistem Vokasi Riau</span
          >
        </a>
        <i class="bi bi-list toggle-sidebar-btn"></i>
      </div>
      <!-- End Logo -->

      <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">
          <li class="nav-item d-block d-lg-none">
            <a class="nav-link nav-icon search-bar-toggle" href="#">
              <i class="bi bi-search"></i>
            </a>
          </li>
          <!-- End Search Icon-->

          <li class="nav-item dropdown pe-3">
            <a
              class="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <!-- <img
                src="assets/img/profile-img.jpg"
                alt="Profile"
                class="rounded-circle"
              /> -->
              <h5 class="card-title d-none d-md-block dropdown-toggle ps-2">{{ user.name }}</h5>
              </a
            ><!-- End Profile Iamge Icon -->

            <ul
              class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
            >
              <li class="dropdown-header">
                <h6>{{user.name}}</h6>
                <span v-if="user.role==0">Petugas Dinas</span>
                <span v-if="user.role==1">Admin SMK</span>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <a class="dropdown-item d-flex align-items-center nav-link" href="/profil" >
                  <i class="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              
              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <a class="dropdown-item d-flex align-items-center nav-link" href="/" >
                  <i class="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
            <!-- End Profile Dropdown Items -->
          </li>
          <!-- End Profile Nav -->
        </ul>
      </nav>
      <!-- End Icons Navigation -->
  </header>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {

        let user = ref([]);

        const store = useStore(); // Menggunakan useStore() untuk mendapatkan instance store
        const router = useRouter();

        const loggedIn = computed(() => {
            return store.state.loggedIn;
        });

        // const user = computed(() => {
        //   return store.getters.user;
        // });

        onMounted(async () => {
            if (loggedIn.value) {
                // Tidak perlu melakukan axios.get untuk mengambil data pengguna karena data sudah ada di Vuex
                user.value = store.getters.user;
                console.log(user.value);
            } else {
                router.push({ name: 'Login' });
            }
        });
        return {
            user
        }
    },
};
</script>
