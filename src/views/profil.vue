<template>
    <Header></Header>
    <Sidebar></Sidebar>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 style="text-align: left;">Profil</h1>
            <br>
        </div>
        <!-- End Page Title -->

        <div class="col-xl-5">

            <div class="card">
                <div class="card-body pt-3">
                    <!-- Bordered Tabs -->
                    <ul class="nav nav-tabs nav-tabs-bordered">

                        <li class="nav-item">
                            <button class="nav-link active" data-bs-toggle="tab"
                                data-bs-target="#profile-overview" v-if="user.role==0">Petugas Dinas</button>
                            <button class="nav-link active" data-bs-toggle="tab"
                                data-bs-target="#profile-overview" v-if="user.role==1">Admin SMK</button>
                        </li>
                    </ul>
                    <div class="tab-content pt-2">

                        <div class="tab-pane fade show active profile-overview" id="profile-overview">
                            <h5 class="card-title" style="text-align: left;">Name</h5>
                            <p class="small fst-italic" style="text-align: left;">{{ user.name }}</p>

                            <h5 class="card-title" style="text-align: left;">Email</h5>
                            <p class="small fst-italic align-self-start" style="text-align: left;">{{ user.email }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>
  
<script>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'
import { ref, onMounted, computed } from "vue";
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
  