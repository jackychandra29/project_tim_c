<template>
    <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Form Edit Rombel</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li class="breadcrumb-item"><a href="/rombel">Rombel</a></li>
          <li class="breadcrumb-item"><a href="/rombel">Form Edit</a></li>
        </ol>
      </nav>
    </div>

    <div class="card">
        <div class="card-body">
          <h5 class="card-title">Data Rombel</h5>

          <form @submit.prevent="updateRombel">
            <div class="row mb-3">
              <label style="text-align: left;" for="inputKodeRombel" class="col-sm-2 col-form-label">Kode Rombel</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="rombel.Kode_rombel" disabled>
                <div v-if="validation.Kode_rombel" class="mt-2 alert alert-danger">
                  {{ validation.Kode_rombel[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputNamaRombel" class="col-sm-2 col-form-label">Nama Rombel</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="rombel.Nama_rombel">
                <div v-if="validation.Nama_rombel" class="mt-2 alert alert-danger">
                  {{ validation.Nama_rombel[0]}}
                </div>
              </div>
            </div>

<div class="row mb-3">
  <label style="text-align: left;" class="col-sm-2 col-form-label">Tingkat</label>
  <div class="col-sm-10">
    <select class="form-select" aria-label="Default select example" v-model="rombel.Tingkat">
      <option value="Kelas 10" :selected="rombel.Tingkat === 'Kelas 10'">Kelas 10</option>
      <option value="Kelas 11" :selected="rombel.Tingkat === 'Kelas 11'">Kelas 11</option>
      <option value="Kelas 12" :selected="rombel.Tingkat === 'Kelas 12'">Kelas 12</option>
    </select>
  </div>
</div>

            <div class="row mb-3">
                <label style="text-align: left;" class="col-sm-2 col-form-label">Semester</label>
                <div class="col-sm-10">
                  <select class="form-select" aria-label="Default select example" v-model="rombel.Semester">
                    <option selected="">{{ rombel.Semester }}</option>
                    <option selected="" v-if="rombel.Semester !== 'Ganjil'">Ganjil</option>
                    <option value="Genap" v-if="rombel.Semester !== 'Genap'">Genap</option>
                  </select>
                </div>
              </div>

              <div class="row mb-3">
              <label style="text-align: left;" for="inputTahunPelajaran" class="col-sm-2 col-form-label">Tahun Pelajaran</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="rombel.Tahun_pelajaran">
                <div v-if="validation.Tahun_pelajaran" class="mt-2 alert alert-danger">
                  {{ validation.Tahun_pelajaran[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputKurikulum" class="col-sm-2 col-form-label">Kurikulum</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="rombel.Kurikulum">
                <div v-if="validation.Kurikulum" class="mt-2 alert alert-danger">
                  {{ validation.Kurikulum[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputKodeRuang" class="col-sm-2 col-form-label">Kode Ruang</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="rombel.Kode_ruang">
                <div v-if="validation.Kode_ruang" class="mt-2 alert alert-danger">
                  {{ validation.Kode_ruang[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputIDStaff" class="col-sm-2 col-form-label">ID Staff</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="rombel.ID_staff">
                <div v-if="validation.ID_staff" class="mt-2 alert alert-danger">
                  {{ validation.ID_staff[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputJurusanSPID" class="col-sm-2 col-form-label">Jurusan SP ID</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="rombel.Jurusan_SP_ID">
                <div v-if="validation.Jurusan_SP_ID" class="mt-2 alert alert-danger">
                  {{ validation.Jurusan_SP_ID[0]}}
                </div>
              </div>
            </div>


<br>
<div>
  <div class="float-start">
    <button class="btn btn-primary" href="/rombel">Kembali</button>
  </div>
  <div class="float-end">
    <button type="submit" class="btn btn-primary" @click.prevent="updateRombel">Simpan Perubahan</button>
  </div>
  </div>
  

          </form>

        </div>
      </div>
  </main>
  <Footer></Footer>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

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
    // Membuat state reaktif untuk data rombel
    const rombel = reactive({
      Kode_rombel: '',
      Nama_rombel: '',
      Tingkat: '',
      Semester: '',
      Tahun_pelajaran: '',
      Kurikulum: '',
      Kode_ruang: '',
      ID_staff: '',
      Jurusan_SP_ID: '',
    });

    // Membuat ref untuk validasi error
    const validation = ref([]);

    // Mendapatkan instance Vue Router
    const router = useRouter();

    // Mendapatkan route saat ini
    const route = useRoute();

    // Mengambil data rombel dari API saat komponen dipasang
    onMounted(() => {
      axios
        .get(`http://localhost:8000/api/rombel/${route.params.Kode_rombel}`)
        .then((response) => {
          const data = response.data.data;
          rombel.Kode_rombel = data.Kode_rombel;
          rombel.Nama_rombel = data.Nama_rombel;
          rombel.Tingkat = data.Tingkat;
          rombel.Semester = data.Semester;
          rombel.Tahun_pelajaran = data.Tahun_pelajaran;
          rombel.Kurikulum = data.Kurikulum;
          rombel.Kode_ruang = data.Kode_ruang;
          rombel.ID_staff = data.ID_staff;
          rombel.Jurusan_SP_ID = data.Jurusan_SP_ID;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    // Method untuk memperbarui data rombel
    function updateRombel() {
      const { Kode_rombel, Nama_rombel, Tingkat, Semester, Tahun_pelajaran, Kurikulum, Kode_ruang, ID_staff, Jurusan_SP_ID } = rombel;

      axios
        .put(`http://localhost:8000/api/rombel/${route.params.Kode_rombel}`, {
          Kode_rombel,
          Nama_rombel,
          Tingkat, 
          Semester, 
          Tahun_pelajaran, 
          Kurikulum, 
          Kode_ruang, 
          ID_staff, 
          Jurusan_SP_ID
        })
        .then(() => {
          console.log('Data rombel berhasil diperbarui');
          router.push({ name: 'rombelSMK' });
        })
        .catch((error) => {
          console.log(error.response.data);
          validation.value = error.response.data;
        });
    }

    return {
      rombel,
      validation,
      updateRombel,
    };
  },
};
</script>
