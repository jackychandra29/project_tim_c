<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Tambah Data Sekolah</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li class="breadcrumb-item"><a href="/sekolah">Sekolah</a></li>
        </ol>
      </nav>
    </div>
    <!-- End Page Title -->

    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">

              <hr>
              <form @submit.prevent="store">
                <div class="form-group" style="text-align: left">
                  <label for="NPSN" class="font-weight-bold">NPSN</label>
                  <input type="text" class="form-control" v-model="post.NPSN" placeholder="Masukkan NPSN baru">

                  <div v-if="sekolah.NPSN" class="mt-2 alert alert-danger">
                    {{ sekolah.NPSN[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="Nama_SP" class="font-weight-bold">Nama Sekolah</label>
                  <input type="text" class="form-control" v-model="post.Nama_SP" placeholder="Masukkan nama sekolah baru">

                  <div v-if="sekolah.Nama_SP" class="mt-2 alert alert-danger">
                    {{ sekolah.Nama_SP[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="Bentuk_pendidikan" class="font-weight-bold">Bentuk Pendidikan</label><br>
                  <input type="radio" id="smk" v-model="post.Bentuk_pendidikan" value="SMK" style="margin: 0 5px;">
                  <label for="smk"> SMK</label><br>
                  <input type="radio" id="sma" v-model="post.Bentuk_pendidikan" value="SMA" style="margin: 0 5px;">
                  <label for="sma"> SMA</label><br>

                  <div v-if="sekolah.Bentuk_pendidikan" class="mt-2 alert alert-danger">
                    {{ sekolah.Bentuk_pendidikan[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="Status_sekolah" class="font-weight-bold">Status Sekolah</label><br>
                  <input type="radio" id="negeri" v-model="post.Status_sekolah" value="Negeri" style="margin: 0 5px;">
                  <label for="negeri"> Negeri</label><br>
                  <input type="radio" id="swasta" v-model="post.Status_sekolah" value="Swasta" style="margin: 0 5px;">
                  <label for="swasta"> Swasta</label><br>

                  <div v-if="sekolah.Status_sekolah" class="mt-2 alert alert-danger">
                    {{ sekolah.Status_sekolah[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="Kode_kecamatan" class="font-weight-bold">Kode Kecamatan</label>
                  <input type="text" class="form-control" v-model="post.Kode_kecamatan"
                    placeholder="Masukkan kode kecamatan">

                  <div v-if="sekolah.Kode_kecamatan" class="mt-2 alert alert-danger">
                    {{ sekolah.Kode_kecamatan[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="Kode_kabKota" class="font-weight-bold">Kode Kabupaten/Kota</label>
                  <input type="text" class="form-control" v-model="post.Kode_kabKota"
                    placeholder="Masukkan kode kabupaten/kota">

                  <div v-if="sekolah.Kode_kabKota" class="mt-2 alert alert-danger">
                    {{ sekolah.Kode_kabKota[0] }}
                  </div>

                </div>
                <br>
                <button type="submit" class="btn btn-primary rounded-pill">Simpan</button>
              </form>

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
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

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
    //state post
    const post = reactive({
      NPSN: '',
      Nama_SP: '',
      Bentuk_pendidikan: '',
      Status_sekolah: '',
      Kode_kecamatan: '',
      Kode_kabKota: ''
    })

    //reactive state
    let sekolah = ref([]);

    //vue router
    const router = useRouter();

    //method store
    function store() {
      let NPSN = post.NPSN
      let Nama_SP = post.Nama_SP
      let Bentuk_pendidikan = post.Bentuk_pendidikan
      let Status_sekolah = post.Status_sekolah
      let Kode_kecamatan = post.Kode_kecamatan
      let Kode_kabKota = post.Kode_kabKota

      axios.post('http://localhost:8000/api/sekolah', {
        NPSN: NPSN,
        Nama_SP: Nama_SP,
        Bentuk_pendidikan: Bentuk_pendidikan,
        Status_sekolah: Status_sekolah,
        Kode_kecamatan: Kode_kecamatan,
        Kode_kabKota: Kode_kabKota
      }).then(() => {
        router.push({
          name: 'Sekolah'
        })
      })
    }

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/sekolah")
        .then((response) => {
          //asign state sekolah with response data
          sekolah.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });


    //return
    return {
      sekolah,
      post,
      router,
      store
    };
  },
};
</script>