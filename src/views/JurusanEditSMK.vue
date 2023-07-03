<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Form Edit Jurusan</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li class="breadcrumb-item"><a href="/jurusan">Jurusan</a></li>
          <li class="breadcrumb-item"><a href="/jurusan">Form Edit</a></li>
        </ol>
      </nav>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Data Jurusan</h5>

        <form @submit.prevent="updateJurusan">
          <div class="row mb-3">
            <label style="text-align: left;" for="inputKodeJurusan" class="col-sm-2 col-form-label">Kode Jurusan</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="jurusan.Kode_jurusan" disabled>
              <div v-if="validation.Kode_jurusan" class="mt-2 alert alert-danger">
                {{ validation.Kode_jurusan[0] }}
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <label style="text-align: left;" for="inputNamaJurusan" class="col-sm-2 col-form-label">Nama Jurusan</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" v-model="jurusan.Nama_jurusan">
              <div v-if="validation.Nama_jurusan" class="mt-2 alert alert-danger">
                {{ validation.Nama_jurusan[0] }}
              </div>
            </div>
          </div>


          <br>
          <div>
            <div class="float-start">
              <button class="btn btn-primary" href="/jurusan">Kembali</button>
            </div>
            <div class="float-end">
              <button type="submit" class="btn btn-primary" @click.prevent="updateJurusan">Simpan Perubahan</button>
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
    // Membuat state reaktif untuk data jurusan
    const jurusan = reactive({
      Kode_jurusan: '',
      Nama_jurusan: '',
    });

    // Membuat ref untuk validasi error
    const validation = ref([]);

    // Mendapatkan instance Vue Router
    const router = useRouter();

    // Mendapatkan route saat ini
    const route = useRoute();

    // Mengambil data jurusan dari API saat komponen dipasang
    onMounted(() => {
      axios
        .get(`http://localhost:8000/api/jurusan/${route.params.Kode_jurusan}`)
        .then((response) => {
          const data = response.data.data;
          jurusan.Kode_jurusan = data.Kode_jurusan;
          jurusan.Nama_jurusan = data.Nama_jurusan;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    // Method untuk memperbarui data jurusan
    function updateJurusan() {
      const { Kode_jurusan, Nama_jurusan } = jurusan;

      axios
        .put(`http://localhost:8000/api/jurusan/${route.params.Kode_jurusan}`, {
          Kode_jurusan,
          Nama_jurusan,
        })
        .then(() => {
          console.log('Data jurusan berhasil diperbarui');
          router.push({ name: 'jurusanSMK' });
        })
        .catch((error) => {
          console.log(error.response.data);
          validation.value = error.response.data;
        });
    }

    return {
      jurusan,
      validation,
      updateJurusan,
    };
  },
};
</script>
