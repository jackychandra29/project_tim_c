<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="text-align: left;">Tambah Data Staff</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
          <li class="breadcrumb-item"><a href="/staff">Staff</a></li>
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
                  <label for="NUPTK" class="font-weight-bold">NUPTK</label>
                  <input type="text" class="form-control" v-model="post.NUPTK" placeholder="Masukkan NUPTK">

                  <div v-if="staffs.NUPTK" class="mt-2 alert alert-danger">
                    {{ staffs.NUPTK[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="Nama_lengkap" class="font-weight-bold">Nama Lengkap</label>
                  <input type="text" class="form-control" v-model="post.Nama_lengkap" placeholder="Masukkan nama lengkap">

                  <div v-if="staffs.Nama_lengkap" class="mt-2 alert alert-danger">
                    {{ staffs.Nama_lengkap[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="NIK" class="font-weight-bold">NIK</label>
                  <input type="text" class="form-control" v-model="post.NIK" placeholder="Masukkan NIK">

                  <div v-if="staffs.NIK" class="mt-2 alert alert-danger">
                    {{ staffs.NIK[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="NIP" class="font-weight-bold">NIP</label>
                  <input type="text" class="form-control" v-model="post.NIP" placeholder="Masukkan NIP">

                  <div v-if="staffs.NIP" class="mt-2 alert alert-danger">
                    {{ staffs.NIP[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="Jenis_kelamin" class="font-weight-bold">Jenis Kelamin</label><br>
                  <input type="radio" id="laki-laki" v-model="post.Jenis_kelamin" value="Laki-laki"
                    style="margin: 0 5px;">
                  <label for="laki-laki"> Laki-laki</label><br>
                  <input type="radio" id="perempuan" v-model="post.Jenis_kelamin" value="Perempuan"
                    style="margin: 0 5px;">
                  <label for="perempuan"> Perempuan</label><br>

                  <div v-if="staffs.Jenis_kelamin" class="mt-2 alert alert-danger">
                    {{ staffs.Jenis_kelamin[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="Tanggal_lahir" class="font-weight-bold">Tanggal Lahir</label>
                  <input type="text" class="form-control" v-model="post.Tanggal_lahir"
                    placeholder="Masukkan tanggal lahir">

                  <div v-if="staffs.Tanggal_lahir" class="mt-2 alert alert-danger">
                    {{ staffs.Tanggal_lahir[0] }}
                  </div>

                </div>
                <br>

                <div class="form-group" style="text-align: left">
                  <label for="Induk" class="font-weight-bold">Induk</label><br>
                  <input type="radio" id="ya" v-model="post.Induk" value="Ya" style="margin: 0 5px;">
                  <label for="ya"> Ya</label><br>
                  <input type="radio" id="tidak" v-model="post.Induk" value="Tidak" style="margin: 0 5px;">
                  <label for="tidak"> Tidak</label><br>

                  <div v-if="staffs.Induk" class="mt-2 alert alert-danger">
                    {{ staffs.Induk[0] }}
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
      NUPTK: '',
      Nama_lengkap: '',
      NIK: '',
      NIP: '',
      Jenis_kelamin: '',
      Tanggal_lahir: '',
      Induk: ''
    })

    //reactive state
    let staffs = ref([]);

    //vue router
    const router = useRouter();

    //method store
    function store() {
      let NUPTK = post.NUPTK
      let Nama_lengkap = post.Nama_lengkap
      let NIK = post.NIK
      let NIP = post.NIP
      let Jenis_kelamin = post.Jenis_kelamin
      let Tanggal_lahir = post.Tanggal_lahir
      let Induk = post.Induk

      axios.post('http://localhost:8000/api/staff', {
        NUPTK: NUPTK,
        Nama_lengkap: Nama_lengkap,
        NIK: NIK,
        NIP: NIP,
        Jenis_kelamin: Jenis_kelamin,
        Tanggal_lahir: Tanggal_lahir,
        Induk: Induk
      }).then(() => {
        router.push({
          name: 'Staff'
        })
      }).catch(error => {
        //assign state validation w error
        staffs.value = error.response.data
      })
    }

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/staff")
        .then((response) => {
          //asign state staffs with response data
          staffs.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });


    //return
    return {
      staffs,
      post,
      router,
      store
    };
  },
};
</script>