<template>
    <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Form Edit Ruang</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li class="breadcrumb-item"><a href="/ruang">Ruang</a></li>
          <li class="breadcrumb-item"><a href="/ruang">Form Edit</a></li>
        </ol>
      </nav>
    </div>

    <div class="card">
        <div class="card-body">
          <h5 class="card-title">Data Ruang</h5>

          <form @submit.prevent="updateRuang">
            <div class="row mb-3">
              <label style="text-align: left;" for="inputKodeRuang" class="col-sm-2 col-form-label">Kode Ruang</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="ruang.Kode_ruang" disabled>
                <div v-if="validation.Kode_ruang" class="mt-2 alert alert-danger">
                  {{ validation.Kode_ruang[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputNamaRuang" class="col-sm-2 col-form-label">Nama Ruang</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="ruang.Nama_ruang">
                <div v-if="validation.Nama_ruang" class="mt-2 alert alert-danger">
                  {{ validation.Nama_ruang[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputPanjang" class="col-sm-2 col-form-label">Panjang</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" v-model="ruang.Panjang">
                <div v-if="validation.Panjang" class="mt-2 alert alert-danger">
                  {{ validation.Panjang[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputLebar" class="col-sm-2 col-form-label">Lebar</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" v-model="ruang.Lebar">
                <div v-if="validation.Lebar" class="mt-2 alert alert-danger">
                  {{ validation.Lebar[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputLantai" class="col-sm-2 col-form-label">Lantai</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" v-model="ruang.Lantai">
                <div v-if="validation.Lantai" class="mt-2 alert alert-danger">
                  {{ validation.Lantai[0]}}
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <label style="text-align: left;" for="inputKodeBangunan" class="col-sm-2 col-form-label">Kode Bangunan</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="ruang.Kode_bangunan">
                <div v-if="validation.Kode_bangunan" class="mt-2 alert alert-danger">
                  {{ validation.Kode_bangunan[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label style="text-align: left;" for="inputKodeJenisRuang" class="col-sm-2 col-form-label">Kode Jenis Ruang</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="ruang.Kode_jenis_ruang">
                <div v-if="validation.Kode_jenis_ruang" class="mt-2 alert alert-danger">
                  {{ validation.Kode_jenis_ruang[0]}}
                </div>
              </div>
            </div>


<br>
<div>
  <div class="float-start">
    <button class="btn btn-primary" href="/ruang">Kembali</button>
  </div>
  <div class="float-end">
    <button type="submit" class="btn btn-primary" @click.prevent="updateRuang">Simpan Perubahan</button>
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

import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import Footer from '../components/Footer.vue';

export default {
  components: {
    Header,
    Sidebar,
    Footer,
  },
  setup() {
    // Membuat state reaktif untuk data ruang
    const ruang = reactive({
      Kode_ruang: '',
      Nama_ruang: '',
      Panjang: '',
      Lebar: '',
      Lantai: '',
      Kode_bangunan: '',
      Kode_jenis_ruang: '',
    });

    // Membuat ref untuk validasi error
    const validation = ref([]);

    // Mendapatkan instance Vue Router
    const router = useRouter();

    // Mendapatkan route saat ini
    const route = useRoute();

    // Mengambil data ruang dari API saat komponen dipasang
    onMounted(() => {
      axios
        .get(`http://localhost:8000/api/ruang/${route.params.Kode_ruang}`)
        .then((response) => {
          const data = response.data.data;
          ruang.Kode_ruang = data.Kode_ruang;
          ruang.Nama_ruang = data.Nama_ruang;
          ruang.Panjang = data.Panjang;
          ruang.Lebar = data.Lebar;
          ruang.Lantai = data.Lantai;
          ruang.Kode_bangunan = data.Kode_bangunan;
          ruang.Kode_jenis_ruang = data.Kode_jenis_ruang;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    // Method untuk memperbarui data ruang
    function updateRuang() {
      const { Kode_ruang, Nama_ruang, Panjang, Lebar, Lantai, Kode_bangunan, Kode_jenis_ruang } = ruang;

      axios
        .put(`http://localhost:8000/api/ruang/${route.params.Kode_ruang}`, {
          Kode_ruang,
          Nama_ruang,
          Panjang,
          Lebar,
          Lantai,
          Kode_bangunan,
          Kode_jenis_ruang,
        })
        .then(() => {
          console.log('Data ruang berhasil diperbarui');
          router.push({ name: 'ruangSMK' });
        })
        .catch((error) => {
          console.log(error.response.data);
          validation.value = error.response.data;
        });
    }

    return {
      ruang,
      validation,
      updateRuang,
    };
  },
};
</script>