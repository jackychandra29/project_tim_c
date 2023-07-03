<template>
    <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Form Edit Staff</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li class="breadcrumb-item"><a href="/staff">Staff</a></li>
          <li class="breadcrumb-item"><a href="/staff">Form Edit</a></li>
        </ol>
      </nav>
    </div>

    <div class="card">
        <div class="card-body">
          <h5 class="card-title">Data Staff</h5>

          <form @submit.prevent="updateStaff">
            <div class="row mb-3">
              <label style="text-align: left;" for="inputIDStaff" class="col-sm-2 col-form-label">ID Staff</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="staff.ID_staff" disabled>
                <div v-if="validation.ID_staff" class="mt-2 alert alert-danger">
                  {{ validation.ID_staff[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputNUPTK" class="col-sm-2 col-form-label">NUPTK</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="staff.NUPTK">
                <div v-if="validation.NUPTK" class="mt-2 alert alert-danger">
                  {{ validation.NUPTK[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputNamaLengkap" class="col-sm-2 col-form-label">Nama Lengkap</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="staff.Nama_lengkap">
                <div v-if="validation.Nama_lengkap" class="mt-2 alert alert-danger">
                  {{ validation.Nama_lengkap[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputNIK" class="col-sm-2 col-form-label">NIK</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="staff.NIK">
                <div v-if="validation.NIK" class="mt-2 alert alert-danger">
                  {{ validation.NIK[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputNIP" class="col-sm-2 col-form-label">NIP</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="staff.NIP">
                <div v-if="validation.NIP" class="mt-2 alert alert-danger">
                  {{ validation.NIP[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
                <label style="text-align: left;" class="col-sm-2 col-form-label">Jenis Kelamin</label>
                <div class="col-sm-10">
                  <select class="form-select" aria-label="Default select example" v-model="staff.Jenis_kelamin">
                    <option selected="">{{ staff.Jenis_kelamin }}</option>
                    <option selected="" v-if="staff.Jenis_kelamin !== 'Laki-Laki'">Laki-Laki</option>
                    <option value="Perempuan" v-if="staff.Jenis_kelamin !== 'Perempuan'">Perempuan</option>
                  </select>
                </div>
              </div>

              <div class="row mb-3">
                  <label style="text-align: left;" for="inputTanggalLahir" class="col-sm-2 col-form-label">Tanggal Lahir</label>
                  <div class="col-sm-10">
                    <input type="date" class="form-control" v-model="staff.Tanggal_lahir">
                    <div v-if="validation.Nama_lengkap" class="mt-2 alert alert-danger">
                  {{ validation.Tanggal_lahir[0]}}
                </div>
                  </div>
                </div>

                <div class="row mb-3">
                <label style="text-align: left;" class="col-sm-2 col-form-label">Jenis Kelamin</label>
                <div class="col-sm-10">
                  <select class="form-select" aria-label="Default select example" v-model="staff.Induk">
                    <option selected="">{{ staff.Induk }}</option>
                    <option selected="" v-if="staff.Induk !== 'Ya'">Ya</option>
                    <option value="Tidak" v-if="staff.Induk !== 'Tidak'">Tidak</option>
                  </select>
                </div>
              </div>

<br>
<div>
  <div class="float-start">
    <button class="btn btn-primary" href="/staff">Kembali</button>
  </div>
  <div class="float-end">
    <button type="submit" class="btn btn-primary" @click.prevent="updateStaff">Simpan Perubahan</button>
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
    // Membuat state reaktif untuk data staff
    const staff = reactive({
      ID_staff: '',
      NUPTK: '',
      Nama_lengkap: '',
      NIK: '',
      NIP: '',
      Jenis_kelamin: '',
      Tanggal_lahir: '',
      Induk: '',
    });

    // Membuat ref untuk validasi error
    const validation = ref([]);

    // Mendapatkan instance Vue Router
    const router = useRouter();

    // Mendapatkan route saat ini
    const route = useRoute();

    // Mengambil data staff dari API saat komponen dipasang
    onMounted(() => {
      axios
        .get(`http://localhost:8000/api/staff/${route.params.ID_staff}`)
        .then((response) => {
          const data = response.data.data;
          staff.ID_staff = data.ID_staff;
          staff.NUPTK = data.NUPTK;
          staff.Nama_lengkap = data.Nama_lengkap;
          staff.NIK = data.NIK;
          staff.NIP = data.NIP;
          staff.Jenis_kelamin = data.Jenis_kelamin;
          staff.Tanggal_lahir = data.Tanggal_lahir;
          staff.Induk = data.Induk;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    // Method untuk memperbarui data staff
    function updateStaff() {
      const { ID_staff,NUPTK,Nama_lengkap,NIK,NIP, Jenis_kelamin,Tanggal_lahir, Induk } = staff;

      axios
        .put(`http://localhost:8000/api/staff/${route.params.ID_staff}`, {
          ID_staff,
          NUPTK,
          Nama_lengkap,
          NIK,
          NIP,
          Jenis_kelamin,
          Tanggal_lahir,
          Induk,
        })
        .then(() => {
          console.log('Data staff berhasil diperbarui');
          router.push({ name: 'Staff' });
        })
        .catch((error) => {
          console.log(error.response.data);
          validation.value = error.response.data;
        });
    }

    return {
      staff,
      validation,
      updateStaff,
    };
  },
};
</script>
