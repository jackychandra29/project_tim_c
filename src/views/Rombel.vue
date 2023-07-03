<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Data Sebaran Rombel</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                    <li class="breadcrumb-item"><a href="/rombel">Rombel</a></li>

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
              <div
                class="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns"
              >
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
                    <input
                      class="datatable-input"
                      placeholder="Search..."
                      type="search"
                      title="Search within table"
                    />
                  </div> -->
                </div>
                <div class="datatable-container">
                  <table class="table datatable datatable-table">
                    <thead>
                      <tr>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Kode Rombel</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Nama Rombel</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Tingkat</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Semester</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Tahun Pelajaran</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Kurikulum</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Kode Ruang</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">ID Staff</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Jurusan SP ID</a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(rbl,Kode_rombel)  in filteredRombels" :key="Kode_rombel"
                      >
                        <td style="text-align: left;">{{ rbl.Kode_rombel }}</td>
                        <td style="text-align: left;">{{ rbl.Nama_rombel }}</td>
                        <td style="text-align: left;">{{ rbl.Tingkat }}</td>
                        <td style="text-align: left;">{{ rbl.Semester }}</td>
                        <td style="text-align: left;">{{ rbl.Tahun_pelajaran }}</td>
                        <td style="text-align: left;">{{ rbl.Kurikulum }}</td>
                        <td style="text-align: left;">{{ rbl.Kode_ruang }}</td>
                        <td style="text-align: left;">{{ rbl.ID_staff }}</td>
                        <td style="text-align: left;">{{ rbl.Jurusan_SP_ID }}</td>
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
    let rombels = ref([]);
    const selectedOption = ref('20');

    const filteredRombels = computed(() => {
      const limit = parseInt(selectedOption.value);
      return rombels.value.slice(0, limit);
    });

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/rombel")
        .then((response) => {
          //asign state rombels with response data
          rombels.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    //method delete
    function rombelDelete(id) {
      //delete data rombel by ID
      axios
        .delete(`http://localhost:8000/api/rombel/${id}`)
        .then(() => {
          //splice rombels
          rombels.value.splice(rombels.value.indexOf(id), 1);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      rombels,
      rombelDelete,
      selectedOption,
      filteredRombels,
    };
  },
};
</script>