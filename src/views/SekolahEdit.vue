<template>
    <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Form Edit Sekolah</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li class="breadcrumb-item"><a href="/sekolah">Sekolah</a></li>
          <li class="breadcrumb-item"><a href="/sekolah">Form Edit</a></li>
        </ol>
      </nav>
    </div>

    <div class="card">
        <div class="card-body">
          <h5 class="card-title">Data Sekolah</h5>

          <!-- General Form Elements -->
          <form @submit.prevent="updateSekolah">
            <div class="row mb-3">
              <label style="text-align: left;" for="inputNPSN" class="col-sm-2 col-form-label">NPSN</label>
              <div class="col-sm-10">
                <input type="number" class="form-control" v-model="sekolah.NPSN" disabled>
                <div v-if="validation.NPSN" class="mt-2 alert alert-danger">
                  {{ validation.NPSN[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-3">
                <label style="text-align: left;" for="inputNamaSekolah" class="col-sm-2 col-form-label">Nama Sekolah</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="sekolah.Nama_SP">
                  <div v-if="validation.Nama_SP" class="mt-2 alert alert-danger">
                    {{ validation.Nama_SP[0]}}
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <label style="text-align: left;" for="inputBentukPendidikan" class="col-sm-2 col-form-label">Bentuk Pendidikan</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="sekolah.Bentuk_pendidikan">
                  <div v-if="validation.Bentuk_pendidikan" class="mt-2 alert alert-danger">
                    {{ validation.Bentuk_pendidikan[0]}}
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <label style="text-align: left;" class="col-sm-2 col-form-label">Status</label>
                <div class="col-sm-10">
                  <select class="form-select" aria-label="Default select example" v-model="sekolah.Status_sekolah">
                    <option selected="">{{ sekolah.Status_sekolah }}</option>
                    <option selected="" v-if="sekolah.Status_sekolah !== 'Swasta'">Swasta</option>
                    <option value="Negeri" v-if="sekolah.Status_sekolah !== 'Negeri'">Negeri</option>
                  </select>
                </div>
              </div>
       
              <div class="row mb-3">
                <label style="text-align: left;" for="inputKodeKabKota" class="col-sm-2 col-form-label">Kode Kabupaten/Kota</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="sekolah.Kode_kabKota">
                  <div v-if="validation.Kode_kabKota" class="mt-2 alert alert-danger">
                    {{ validation.Kode_kabKota[0]}}
                  </div>
                </div>
              </div>
              
              <div class="row mb-3">
                <label style="text-align: left;" for="inputKodeKecamatan" class="col-sm-2 col-form-label">Kode Kecamatan</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="sekolah.Kode_kecamatan">
                  <div v-if="validation.Kode_kecamatan" class="mt-2 alert alert-danger">
                    {{ validation.Kode_kecamatan[0]}}
                  </div>
                </div>
              </div>
              
              

            
<br>
<div>
  <div class="float-start">
    <button class="btn btn-primary" href="/sekolah">Kembali</button>
  </div>
  <div class="float-end">
    <button type="submit" class="btn btn-primary" @click.prevent="updateSekolah">Simpan Perubahan</button>
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
    // Membuat state reaktif untuk data sekolah
    const sekolah = reactive({
      NPSN: '',
      Nama_SP: '',
      Bentuk_pendidikan: '',
      Status_sekolah: '',
      Kode_kecamatan: '',
      Kode_kabKota: '',
    });

    const kabKotaOptions = ref([]);
    const kecamatanOptions = ref([]);

    // ...
function updateKecamatanOptions() {
  // Dapatkan kode kabupaten/kota yang dipilih
  const selectedKabKota = sekolah.Kode_kabKota;

  // Cari data kecamatan yang sesuai berdasarkan kode kabupaten/kota yang dipilih
  axios
    .get(`http://localhost:8000/api/kecamatan?kode_kabkota=${selectedKabKota}`)
    .then((response) => {
      kecamatanOptions.value = response.data.data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}


    // Membuat ref untuk validasi error
    const validation = ref([]);

    // Mendapatkan instance Vue Router
    const router = useRouter();

    // Mendapatkan route saat ini
    const route = useRoute();

    // Mengambil data sekolah dari API saat komponen dipasang
    onMounted(() => {
      axios
        .get(`http://localhost:8000/api/sekolah/${route.params.NPSN}`)
        .then((response) => {
          const data = response.data.data;
          sekolah.NPSN = data.NPSN;
          sekolah.Nama_SP = data.Nama_SP;
          sekolah.Bentuk_pendidikan = data.Bentuk_pendidikan;
          sekolah.Status_sekolah = data.Status_sekolah;
          sekolah.Kode_kecamatan = data.Kode_kecamatan;
          sekolah.Kode_kabKota = data.Kode_kabKota;
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      axios
        .get('http://localhost:8000/api/kabkota')
        .then((response) => {
          kabKotaOptions.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });

    // Method untuk memperbarui data sekolah
    function updateSekolah() {
      const { NPSN, Nama_SP, Bentuk_pendidikan, Status_sekolah, Kode_kecamatan, Kode_kabKota } = sekolah;

      axios
        .put(`http://localhost:8000/api/sekolah/${route.params.NPSN}`, {
          NPSN,
          Nama_SP,
          Bentuk_pendidikan,
          Status_sekolah,
          Kode_kecamatan,
          Kode_kabKota,
        })
        .then(() => {
          console.log('Data sekolah berhasil diperbarui');
          router.push({ name: 'Sekolah' });
        })
        .catch((error) => {
          console.log(error.response.data);
          validation.value = error.response.data;
        });
    }

    return {
      sekolah,
      validation,
      updateSekolah,
      kabKotaOptions,
      kecamatanOptions,
    updateKecamatanOptions,
    };
  },
};
</script>
