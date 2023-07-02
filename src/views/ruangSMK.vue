<template>
    <Header></Header>
    <Sidebar></Sidebar>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 style="text-align: left;">Data Sebaran Ruang</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                    <li class="breadcrumb-item"><a href="/ruangSMK">Ruang</a></li>

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
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">Kode
                                                        Ruang</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">Nama
                                                        Ruang</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter"
                                                        style="text-align: left;">Panjang</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">Lebar</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter"
                                                        style="text-align: left;">Lantai</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">Kode
                                                        Bangunan</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#" class="datatable-sorter" style="text-align: left;">Kode
                                                        Jenis Ruang</a>
                                                </th>
                                                <th data-sortable="true">
                                                    <a href="#">Aksi</a>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(rg, Kode_ruang) in filteredRuangs" :key="Kode_ruang">
                                                <td style="text-align: left;">{{ rg.Kode_ruang }}</td>
                                                <td style="text-align: left;">{{ rg.Nama_ruang }}</td>
                                                <td style="text-align: left;">{{ rg.Panjang }}</td>
                                                <td style="text-align: left;">{{ rg.Lebar }}</td>
                                                <td style="text-align: left;">{{ rg.Lantai }}</td>
                                                <td style="text-align: left;">{{ rg.Kode_bangunan }}</td>
                                                <td style="text-align: left;">{{ rg.Kode_jenis_ruang }}</td>
                                                <td>
                          <router-link :to="`/ruangSMK/edit/${ruang.Kode_ruang}`" class="btn btn-primary">Edit</router-link>
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
        // let bangunans = ref([]);
        let ruangs = ref([]);
        const selectedOption = ref('20');
        let user = ref([]);
        
        const filteredRuangs = computed(() => {
      const limit = parseInt(selectedOption.value);
      return ruangs.value.slice(0, limit);
    });
        const store = useStore(); // Menggunakan useStore() untuk mendapatkan instance store
        const router = useRouter();

        const loggedIn = computed(() => {
            return store.state.loggedIn;
        });

        //mounted
        onMounted(() => {



            //get API from Laravel Backend
            onMounted(() => {
                //get API from Laravel Backend
                axios
                    .get("http://localhost:8000/api/ruang")
                    .then((response) => {
                        //asign state ruangs with response data
                        ruangs.value = response.data.data;
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
        });
        //method delete
        // function ruangDelete(id) {
        //     //delete data ruang by ID
        //     axios
        //         .delete(`http://localhost:8000/api/ruang/${id}`)
        //         .then(() => {
        //             //splice ruangs
        //             ruangs.value.splice(ruangs.value.indexOf(id), 1);
        //         })
        //         .catch((error) => {
        //             console.log(error.response.data);
        //         });
        // }

        //return
        return {
            ruangs,
            // bangunans,
            // ruangDelete,
            user,
            selectedOption,
            filteredRuangs,
        };
    },
};
</script>