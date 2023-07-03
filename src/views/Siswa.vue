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
                  <!-- <div class="datatable-search">
                    <input class="datatable-input" placeholder="Search..." type="search" title="Search within table" />
                  </div> -->
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
                      <tr v-for="(siswa, ID) in paginated" :key="ID">
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

                  <div class="datatable-info"></div>

                  <nav class="datatable-pagination">
                    <ul class="datatable-pagination-list">
                      <li v-for="page in displayedPages" :key="page" :class="{ active: currentPage === page }">
                        <a @click="goToPage(page)">{{ page }}</a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div class="datatable-info">
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

    const selectedOption = ref('20');

    const currentPage = ref(1);
    const visiblePages = ref(5);

    const displayedPages = computed(() => {
      const startPage = Math.max(1, currentPage.value - Math.floor(visiblePages.value / 2));
      const endPage = Math.min(startPage + visiblePages.value - 1, totalPages.value);
      const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

      if (pages.length < visiblePages.value) {
        const diff = visiblePages.value - pages.length;
        const newStartPage = Math.max(1, startPage - diff);
        return Array.from({ length: visiblePages.value }, (_, index) => newStartPage + index);
      }

      return pages;
    });


    const totalPages = computed(() => {
      const limit = parseInt(selectedOption.value);
      return Math.ceil(siswas.value.length / limit);
    });

    const goToPage = (page) => {
      currentPage.value = page;
    };

    const paginated = computed(() => {
      const limit = parseInt(selectedOption.value);
      const startIndex = (currentPage.value - 1) * limit;
      const endIndex = startIndex + limit;
      return siswas.value.slice(startIndex, endIndex);
    });

    // const filteredSiswas = computed(() => {
    //   const limit = parseInt(selectedOption.value);
    //   return siswas.value.slice(0, limit);
    // });

    //mounted
    onMounted(() => {
      axios
        .get("http://localhost:8000/api/siswa")
        .then((response) => {
          siswas.value = response.data.data;
          // siswaCount.value = response.data.count; // Assuming the count value is provided in the response as `count`
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });


    return {
      siswas,
      selectedOption,
      paginated,
      totalPages,
      goToPage,
      displayedPages,
      visiblePages,
      currentPage
    };
  },
};
</script>
