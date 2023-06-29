<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Data Sebaran Sekolah</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item">Tables</li>
          <li class="breadcrumb-item active">Sekolah</li>
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
                      <select class="datatable-selector">
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
                    <input
                      class="datatable-input"
                      placeholder="Search..."
                      type="search"
                      title="Search within table"
                    />
                  </div>
                </div>
                <div class="datatable-container">
                  <table class="table datatable datatable-table">
                    <thead>
                      <tr>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Kode</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Nama Sekolah</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Bentuk Pendidikan</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Status</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Kode Kecamatan</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Kode Kabupaten Kota</a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(skl, NPSN) in sekolahs.slice(0, 5)" :key="NPSN"
                      >
                        <td style="text-align: left;">{{ skl.NPSN }}</td>
                        <td style="text-align: left;">{{ skl.Nama_SP }}</td>
                        <td style="text-align: left;">{{ skl.Bentuk_pendidikan }}</td>
                        <td style="text-align: left;">{{ skl.Status_sekolah }}</td>
                        <td style="text-align: left;">{{ skl.Kode_kecamatan }}</td>
                        <td style="text-align: left;">{{ skl.Kode_kabKota }}</td>
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
import { onMounted, ref } from "vue";

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
    let sekolahs = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/sekolah")
        .then((response) => {
          //asign state sekolahs with response data
          sekolahs.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    //method delete
    function sekolahDelete(id) {
      //delete data sekolah by ID
      axios
        .delete(`http://localhost:8000/api/sekolah/${id}`)
        .then(() => {
          //splice sekolahs
          sekolahs.value.splice(sekolahs.value.indexOf(id), 1);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      sekolahs,
      sekolahDelete,
    };
  },
};
</script>