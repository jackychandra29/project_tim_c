<template>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Data Sebaran Siswa</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item">Tables</li>
          <li class="breadcrumb-item active">Siswa</li>
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
                          <a href="#" class="datatable-sorter" style="text-align: left;">ID</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">NISN</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Nama Lengkap</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Jenis Kelamin</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Tanggal Lahir</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Nama Ibu Kandung</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">NPSN</a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="ssw in siswa.slice(0, 5)"
                        :key="ssw.ID"
                      >
                        <td style="text-align: left;">{{ ssw.ID }}</td>
                        <td style="text-align: left;">{{ ssw.NISN }}</td>
                        <td style="text-align: left;">{{ ssw.NIK }}</td>
                        <td style="text-align: left;">{{ ssw.Nama_lengkap }}</td>
                        <td style="text-align: left;">{{ ssw.Jenis_kelamin }}</td>
                        <td style="text-align: left;">{{ ssw.Tanggal_lahir }}</td>
                        <td style="text-align: left;">{{ ssw.Nama_ibuKandung }}</td>
                        <td style="text-align: left;">{{ ssw.NPSN }}</td>
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
  name: "Siswa",
  data() {
    return {
      siswa: [],
    };
  },
  created() {
    this.getSiswa();
  },
  methods: {
    async getSiswa() {
      let url = "http://127.0.0.1:8000/api/siswa";
      await axios
        .get(url)
        .then((response) => {
          this.siswa = response.data.siswa;
          console.log(this.siswa);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log("Siswa List Component Mounted");
  },
};
</script>