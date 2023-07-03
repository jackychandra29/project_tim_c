<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Dashboard</h1>
      <br>
    </div>
    <!-- End Page Title -->

    <section class="section dashboard">
      <div class="row">
        <div class="col-lg-8">
          <div class="row">
            <!-- Negeri Card -->
            <div class="col-xxl-4 col-md-6">
              <div class="card info-card sales-card">
                <div class="card-body">
                  <h5 class="card-title" style="font-size: 15px">
                    Siswa <span>|</span><span style="font-size: 11px"> Jumlah Siswa</span>
                  </h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-person-video3"></i>
                    </div>
                    <div class="ps-3">
                      <h6 style="font-size: 24px;">{{ siswas.length }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                    <!-- Negeri Card -->
                    <div class="col-xxl-4 col-md-6">
                      <div class="card info-card sales-card">
                        <div class="card-body">
                          <h5 class="card-title" style="font-size: 15px">
                            Sekolah <span>|</span><span style="font-size: 11px"> Jumlah Sekolah</span>
                          </h5>
        
                          <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-building-fill-up"></i>
                            </div>
                            <div class="ps-3">
                              <h6 style="font-size: 24px;">{{ sekolahs.length }}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                            <!-- Negeri Card -->
            <div class="col-xxl-4 col-md-6">
              <div class="card info-card sales-card">
                <div class="card-body">
                  <h5 class="card-title" style="font-size: 15px">
                    Staff <span>|</span><span style="font-size: 11px"> Jumlah Staff</span>
                  </h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-cart"></i>
                    </div>
                    <div class="ps-3">
                      <h6 style="font-size: 24px;">{{ staffs.length }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                    <!-- Negeri Card -->
                    <div class="col-xxl-4 col-md-6">
                      <div class="card info-card sales-card">
                        <div class="card-body">
                          <h5 class="card-title" style="font-size: 15px">
                            Jurusan <span>|</span><span style="font-size: 11px"> Jumlah Jurusan</span>
                          </h5>
        
                          <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-vector-pen"></i>
                            </div>
                            <div class="ps-3">
                              <h6 style="font-size: 24px;">{{ jurusans.length }}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                            <!-- Negeri Card -->
            <div class="col-xxl-4 col-md-6">
              <div class="card info-card sales-card">
                <div class="card-body">
                  <h5 class="card-title" style="font-size: 15px">
                    Rombel <span>|</span><span style="font-size: 11px"> Jumlah Rombel</span>
                  </h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-diagram-3"></i>
                    </div>
                    <div class="ps-3">
                      <h6 style="font-size: 24px;">{{ rombels.length }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                    <!-- Negeri Card -->
                    <div class="col-xxl-4 col-md-6">
                      <div class="card info-card sales-card">
                        <div class="card-body">
                          <h5 class="card-title" style="font-size: 15px">
                            Ruang <span>|</span><span style="font-size: 11px"> Jumlah Ruangan</span>
                          </h5>
        
                          <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-house-up"></i>
                            </div>
                            <div class="ps-3">
                              <h6 style="font-size: 24px;">{{ ruangs.length }}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
            <!-- End Sales Card -->
          </div>
        </div>
      </div>

    </section>
  </main>
  <Footer></Footer>
</template>

<script>

  import axios from "axios";
import { onMounted, ref, computed } from "vue";

import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  components: {
    Header,
    Sidebar,
    Footer,
  },

  setup() {

    let user = ref([]);
    
    //siswa
    let siswas = ref([]);
    let siswaCount = ref(0);

    //sekolah
    let sekolahs = ref([]);
    let sekolahCount = ref(0);

    //staff
    let staffs = ref([]);
    let staffCount = ref(0);

    //jurusan
    let jurusans = ref([]);
    let jurusanCount = ref(0);

    //rombel
    let rombels = ref([]);
    let rombelCount = ref(0);

    //ruang
    let ruangs = ref([]);
    let ruangCount = ref(0);

    const store = useStore(); // Menggunakan useStore() untuk mendapatkan instance store
    const router = useRouter();

    const loggedIn = computed(() => {
      return store.state.loggedIn;
    });

    // const user = computed(() => {
    //   return store.getters.user;
    // });

    onMounted( () => {

      //get API from Laravel Backend
      axios
    .get("http://localhost:8000/api/siswa")
    .then((response) => {
      siswas.value = response.data.data;
      siswaCount.value = response.data.count; // Assuming the count value is provided in the response as `count`
    })
    .catch((error) => {
      console.log(error.response.data);
    });

    axios
    .get("http://localhost:8000/api/sekolah")
    .then((response) => {
      sekolahs.value = response.data.data;
      sekolahCount.value = response.data.count; // Assuming the count value is provided in the response as `count`
    })
    .catch((error) => {
      console.log(error.response.data);
    });

    axios
    .get("http://localhost:8000/api/staff")
    .then((response) => {
      staffs.value = response.data.data;
      staffCount.value = response.data.count; // Assuming the count value is provided in the response as `count`
    })
    .catch((error) => {
      console.log(error.response.data);
    });

    axios
    .get("http://localhost:8000/api/jurusan")
    .then((response) => {
      jurusans.value = response.data.data;
      jurusanCount.value = response.data.count; // Assuming the count value is provided in the response as `count`
    })
    .catch((error) => {
      console.log(error.response.data);
    });

    axios
    .get("http://localhost:8000/api/rombel")
    .then((response) => {
      rombels.value = response.data.data;
      rombelCount.value = response.data.count; // Assuming the count value is provided in the response as `count`
    })
    .catch((error) => {
      console.log(error.response.data);
    });

    axios
    .get("http://localhost:8000/api/ruang")
    .then((response) => {
      ruangs.value = response.data.data;
      ruangCount.value = response.data.count; // Assuming the count value is provided in the response as `count`
    })
    .catch((error) => {
      console.log(error.response.data);
    });

    if (loggedIn.value) {
        // Tidak perlu melakukan axios.get untuk mengambil data pengguna karena data sudah ada di Vuex
        user.value = store.getters.user;
        console.log(user.value);
      } else {
        router.push({ name: 'Login' });
      }
    });
    return {
      user,
    siswas,
      siswaCount,
      sekolahs,
      sekolahCount,
      staffs,
      staffCount,
      jurusans,
      jurusanCount,
      rombels,
      rombelCount,
      ruangs,
      ruangCount,
    }
  },
};
</script>
