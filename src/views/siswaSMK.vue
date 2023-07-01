<template>
    <Header></Header>
    <Sidebar></Sidebar>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 style="text-align: left;">Data Sebaran Siswa</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                    <li class="breadcrumb-item"><a href="/siswaSMK">Siswa</a></li>

                </ol>
            </nav>
        </div>
        <!-- End Page Title -->

        <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <!-- Table with stripped rows -->
                            <div class="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
                                <div class="datatable-top">
                                    <div class="datatable-dropdown">
                                        <label>
                                            <select class="datatable-selector" v-model="selectedOption">
                                                <option value="5">5</option>
                                                <option value="10" selected="">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                            </select>
                                            entries per page
                                        </label>
                                    </div>
                                    <div class="datatable-search">
                                        <input class="datatable-input" placeholder="Search..." type="search"
                                            title="Search within table" />
                                    </div>
                                </div>
                                <div class="datatable-container">
                                    <table class="table datatable datatable-table">
                                        <thead>
                                            <tr>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">ID</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">NISN</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">NIK</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">Nama
                                                        Lengkap</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">Jenis
                                                        Kelamin</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">Tanggal
                                                        Lahir</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">Nama Ibu
                                                        Kandung</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">NPSN</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#">Aksi</a>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(ssw, ID) in filteredSiswas" :key="ID">
                                                <td style="text-align: left;">{{ ssw.ID }}</td>
                                                <td style="text-align: left;">{{ ssw.NISN }}</td>
                                                <td style="text-align: left;">{{ ssw.NIK }}</td>
                                                <td style="text-align: left;">{{ ssw.Nama_lengkap }}</td>
                                                <td style="text-align: left;">{{ ssw.Jenis_kelamin }}</td>
                                                <td style="text-align: left;">{{ ssw.Tanggal_lahir }}</td>
                                                <td style="text-align: left;">{{ ssw.Nama_ibuKandung }}</td>
                                                <td style="text-align: left;">{{ ssw.NPSN }}</td>
                                                <td><button type="button" class="btn btn-warning rounded-pill">Edit</button>
                                                </td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="datatable-bottom">
                                    <div class="datatable-info">Showing 1 to 5 of 5 entries</div>
                                    <nav class="datatable-pagination">
                                        <ul class="datatable-pagination-list"></ul>
                                    </nav>
                                </div>
                            </div>
                            <!-- End Table with stripped rows -->
                        </div>
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'

export default {
    components: {
        Header,
        Sidebar,
        Footer,
    },
    setup() {
        //reactive state
        let siswas = ref([]);
        const selectedOption = ref('20');
        let user = ref([]);

        const filteredSiswas = computed(() => {
            const limit = parseInt(selectedOption.value);
            return siswas.value.slice(0, limit);
        });

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

            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/siswa")
                .then((response) => {
                    // Filter data siswa berdasarkan NPSN '1111'
                    const filteredSiswas = response.data.data.filter(siswa => siswa.NPSN === user.value.NPSN);
                    siswas.value = filteredSiswas;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });
        //method delete
        // function siswaDelete(id) {
        //     //delete data siswa by ID
        //     axios
        //         .delete(`http://localhost:8000/api/siswa/${id}`)
        //         .then(() => {
        //             //splice siswas
        //             siswas.value.splice(siswas.value.indexOf(id), 1);
        //         })
        //         .catch((error) => {
        //             console.log(error.response.data);
        //         });
        // }

        //return
        return {
            siswas,
            // siswaDelete,
            user,
            selectedOption,
            filteredSiswas,
        };
    },
};
</script>