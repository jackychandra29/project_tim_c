<template>
    <Header></Header>
    <Sidebar></Sidebar>
    <main id="main" class="main">
      <div class="pagetitle">
        <h1 style="text-align: left;">Data Admin SMK</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item">Tables</li>
            <li class="breadcrumb-item active">Ruang</li>
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
                            <a href="#" class="datatable-sorter" style="text-align: left;">Nama</a>
                          </th>
                          <th
                            data-sortable="true"
                          >
                            <a href="#" class="datatable-sorter" style="text-align: left;">Email</a>
                          </th>
                          <th
                            data-sortable="true"
                          >
                            <a href="#" class="datatable-sorter" style="text-align: left;">Sekolah</a>
                          </th>
                          <th
                            data-sortable="true"
                          >
                            <a href="#" class="datatable-sorter" style="text-align: left;">Status</a>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(usr, id) in users.slice(0, 5)" :key="id"
                        >
                          <td style="text-align: left;">{{ usr.name }}</td>
                          <td style="text-align: left;">{{ usr.email }}</td>
                          <td style="text-align: left;">{{ usr.schoolName }}</td>
                          <td style="text-align: left;">
                            <div class="form-check form-switch">
                                <input @change.prevent="updateStatus(usr)" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" :checked="usr.status === 1">
                            </div>
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
      let users = ref([]);
  
      //mounted
      onMounted(() => {
        //get API from Laravel Backend
        axios
          .get("http://localhost:8000/api/users")
          .then((response) => {
            // Filter users with status=1 : hanya tampilin akun AdminSMK
            const filteredUsers = response.data.data.filter(user => user.role === 1);
            const promises = filteredUsers.map((user) =>
            axios.get(`http://localhost:8000/api/sekolah/${user.NPSN}`)
          );
          Promise.all(promises)
            .then((responses) => {
              responses.forEach((response, index) => {
                const schoolName = response.data.data.Nama_SP;
                filteredUsers[index].schoolName = schoolName;
              });
              users.value = filteredUsers;
            })
            .catch((error) => {
              console.log(error.response.data);
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });

      function updateStatus(usr) {
        // Mengambil nilai status terbaru dari elemen input
        const newStatus = usr.status === 1 ? 0 : 1;

        // Mengirim permintaan API untuk memperbarui nilai status
        axios.post(`http://localhost:8000/api/users/${usr.id}`, { status: newStatus })
        .then((response) => {
            // Proses respons atau lakukan operasi lain setelah berhasil memperbarui status
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
      }

      //return
      return {
        users,
        updateStatus,
      };
    },
  };
  </script>