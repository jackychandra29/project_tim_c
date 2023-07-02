<template>
    <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Form Edit Siswa</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li class="breadcrumb-item"><a href="/siswa">Siswa</a></li>
          <li class="breadcrumb-item"><a href="/siswa">Form Edit</a></li>
        </ol>
      </nav>
    </div>

    <div class="card">
        <div class="card-body">
          <h5 class="card-title">Data Siswa</h5>

          <!-- General Form Elements -->
          <form @submit.prevent="updateSiswa">
            <div class="row mb-3">
              <label style="text-align: left;" for="inputID" class="col-sm-2 col-form-label">ID</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" v-model="siswa.ID" disabled>
                <div v-if="validation.ID" class="mt-2 alert alert-danger">
                  {{ validation.ID[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label style="text-align: left;" for="inputNISN" class="col-sm-2 col-form-label">NISN</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="siswa.NISN">
                <div v-if="validation.NISN" class="mt-2 alert alert-danger">
                  {{ validation.NISN[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label style="text-align: left;" for="inputNIK" class="col-sm-2 col-form-label">NIK</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="siswa.NIK">
                <div v-if="validation.NIK" class="mt-2 alert alert-danger">
                  {{ validation.NIK[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label style="text-align: left;" for="inputNamaLengkap" class="col-sm-2 col-form-label">Nama Lengkap</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="siswa.Nama_lengkap">
                <div v-if="validation.Nama_lengkap" class="mt-2 alert alert-danger">
                  {{ validation.Nama_lengkap[0]}}
                </div>
              </div>
            </div>

           <div class="row mb-3">
                <label style="text-align: left;" class="col-sm-2 col-form-label">Jenis Kelamin</label>
                <div class="col-sm-10">
                  <select class="form-select" aria-label="Default select example" v-model="siswa.Jenis_kelamin">
                    <option selected="">{{ siswa.Jenis_kelamin }}</option>
                    <option selected="" v-if="siswa.Jenis_kelamin !== 'Laki-Laki'">Laki-Laki</option>
                    <option value="Perempuan" v-if="siswa.Jenis_kelamin !== 'Perempuan'">Perempuan</option>
                  </select>
                </div>
              </div>
       
              <div class="row mb-3">
                  <label style="text-align: left;" for="inputTanggalLahir" class="col-sm-2 col-form-label">Tanggal Lahir</label>
                  <div class="col-sm-10">
                    <input type="date" class="form-control" v-model="siswa.Tanggal_lahir">
                    <div v-if="validation.Nama_lengkap" class="mt-2 alert alert-danger">
                  {{ validation.Tanggal_lahir[0]}}
                </div>
                  </div>
                </div>
              
              <div class="row mb-3">
              <label style="text-align: left;" for="inputNamaIbu" class="col-sm-2 col-form-label">Nama Ibu</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="siswa.Nama_ibuKandung">
                <div v-if="validation.Nama_ibuKandung" class="mt-2 alert alert-danger">
                  {{ validation.Nama_ibuKandung[0]}}
                </div>
              </div>
            </div>
              
<div class="row mb-3">
              <label style="text-align: left;" for="inputNPSN" class="col-sm-2 col-form-label">NPSN</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="siswa.NPSN">
                <div v-if="validation.NPSN" class="mt-2 alert alert-danger">
                  {{ validation.NPSN[0]}}
                </div>
              </div>
            </div>
            
<br>
<div>
  <div class="float-start">
    <button class="btn btn-primary" href="/siswa">Kembali</button>
  </div>
  <div class="float-end">
    <button type="submit" class="btn btn-primary" @click.prevent="updateSiswa">Simpan Perubahan</button>
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
    // Membuat state reaktif untuk data siswa
    const siswa = reactive({
      ID: '',
      NISN: '',
      NIK: '',
      Nama_lengkap: '',
      Jenis_kelamin: '',
      Tanggal_lahir: '',
      Nama_ibuKandung: '',
      NPSN: '',
    });


    // Membuat ref untuk validasi error
    const validation = ref([]);

    // Mendapatkan instance Vue Router
    const router = useRouter();

    // Mendapatkan route saat ini
    const route = useRoute();

    // Mengambil data sekolah dari API saat komponen dipasang
    onMounted(() => {
      axios
        .get(`http://localhost:8000/api/siswa/${route.params.ID}`)
        .then((response) => {
          const data = response.data.data;
          siswa.ID = data.ID;
          siswa.NISN = data.NISN;
          siswa.NIK = data.NIK;
          siswa.Nama_lengkap = data.Nama_lengkap;
          siswa.Jenis_kelamin = data.Jenis_kelamin;
          siswa.Tanggal_lahir = data.Tanggal_lahir;
          siswa.Nama_ibuKandung = data.Nama_ibuKandung;
          siswa.NPSN = data.NPSN;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    // Method untuk memperbarui data siswa
    function updateSiswa() {
      const { ID, NISN, NIK, Nama_lengkap, Jenis_kelamin, Tanggal_lahir, Nama_ibuKandung, NPSN } = siswa;

      axios
        .put(`http://localhost:8000/api/siswa/${route.params.ID}`, {
          ID, 
          NISN,
          NIK,
          Nama_lengkap,
          Jenis_kelamin,
          Tanggal_lahir,
          Nama_ibuKandung,
          NPSN,
        })
        .then(() => {
          console.log('Data siswa berhasil diperbarui');
          router.push({ name: 'Siswa' });
        })
        .catch((error) => {
          console.log(error.response.data);
          validation.value = error.response.data;
        });
    }

    return {
      siswa,
      validation,
      updateSiswa,
    };
  },
};
</script>
