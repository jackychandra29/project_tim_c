<template>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Data Sebaran Rombel</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item">Tables</li>
          <li class="breadcrumb-item active">Rombel</li>
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
                        v-for="rbl in rombel.slice(0, 5)"
                        :key="rbl.Kode_rombel"
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
</template>

<script>
import axios from "axios";
export default {
  name: "Rombel",
  data() {
    return {
     rombel: [],
    };
  },
  created() {
    this.getRombel();
  },
  methods: {
    async getRombel() {
      let url = "http://127.0.0.1:8000/api/rombel";
      await axios
        .get(url)
        .then((response) => {
          this.rombel = response.data.rombel;
          console.log(this.rombel);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log("Rombel List Component Mounted");
  },
};
</script>