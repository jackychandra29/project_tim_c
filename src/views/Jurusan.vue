<template>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Data Sebaran Jurusan</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item">Tables</li>
          <li class="breadcrumb-item active">Jurusan</li>
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
                          <a href="#" class="datatable-sorter" style="text-align: left;">Kode Jurusan</a>
                        </th>
                        <th
                          data-sortable="true"
                        >
                          <a href="#" class="datatable-sorter" style="text-align: left;">Nama Jurusan</a>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="jrs in jurusan.slice(0, 5)"
                        :key="jrs.Kode_jurusan"
                      >
                        <td style="text-align: left;">{{ jrs.Kode_jurusan }}</td>
                        <td style="text-align: left;">{{ jrs.Nama_jurusan }}</td>
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
  name: "Jurusan",
  data() {
    return {
      jurusan: [],
    };
  },
  created() {
    this.getJurusan();
  },
  methods: {
    async getJurusan() {
      let url = "http://127.0.0.1:8000/api/jurusan";
      await axios
        .get(url)
        .then((response) => {
          this.jurusan = response.data.jurusan;
          console.log(this.jurusan);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.log("Jurusan List Component Mounted");
  },
};
</script>