<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Data Sebaran Siswa</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li class="breadcrumb-item"><a href="/siswa">Siswa</a></li>
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
                    <input class="datatable-input" placeholder="Search..." type="search" title="Search within table" />
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
                          <a href="#" class="datatable-sorter" style="text-align: left;">Nama Lengkap</a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" class="datatable-sorter" style="text-align: left;">Jenis Kelamin</a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" class="datatable-sorter" style="text-align: left;">Tanggal Lahir</a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" class="datatable-sorter" style="text-align: left;">Nama Ibu Kandung</a>
                        </th>
                        <th data-sortable="true">
                          <a href="#" class="datatable-sorter" style="text-align: left;">NPSN</a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(siswa, ID) in filteredSiswas" :key="ID">
                        <td style="text-align: left;">{{ siswa.ID }}</td>
                        <td style="text-align: left;">{{ siswa.NISN }}</td>
                        <td style="text-align: left;">{{ siswa.NIK }}</td>
                        <td style="text-align: left;">{{ siswa.Nama_lengkap }}</td>
                        <td style="text-align: left;">{{ siswa.Jenis_kelamin }}</td>
                        <td style="text-align: left;">{{ siswa.Tanggal_lahir }}</td>
                        <td style="text-align: left;">{{ siswa.Nama_ibuKandung }}</td>
                        <td style="text-align: left;">{{ siswa.NPSN }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="datatable-bottom">
                  <div class="datatable-info">Showing 1 to {{ selectedOption }} of {{ siswas.length }} entries</div>
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
    const selectedOption = ref('10');

    const filteredSiswas = computed(() => {
      const limit = parseInt(selectedOption.value);
      return siswas.value.slice(0, limit);
    });

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/siswa")
        .then((response) => {
          //assign state siswas with response data
          siswas.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    return {
      siswas,
      selectedOption,
      filteredSiswas,
    };
  },
};
</script>
