<template>
    <Header></Header>
    <Sidebar></Sidebar>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 style="text-align: left;">Tambah Data Siswa</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                    <li class="breadcrumb-item"><a href="/siswa">Siswa</a></li>
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
                                    <label for="NISN" class="font-weight-bold">NISN</label>
                                    <input type="text" class="form-control" v-model="post.NISN" placeholder="Masukkan NISN">

                                    <div v-if="siswa.NISN" class="mt-2 alert alert-danger">
                                        {{ siswa.NISN[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="NIK" class="font-weight-bold">NIK</label>
                                    <input type="text" class="form-control" v-model="post.NIK" placeholder="Masukkan NIK">

                                    <div v-if="siswa.NIK" class="mt-2 alert alert-danger">
                                        {{ siswa.NIK[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Nama_lengkap" class="font-weight-bold">Nama Lengkap</label><br>
                                    <input type="text" class="form-control" v-model="post.Nama_lengkap"
                                        placeholder="Masukkan nama lengkap">

                                    <div v-if="siswa.Nama_lengkap" class="mt-2 alert alert-danger">
                                        {{ siswa.Nama_lengkap[0] }}
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

                                    <div v-if="siswa.Jenis_kelamin" class="mt-2 alert alert-danger">
                                        {{ siswa.Jenis_kelamin[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Tanggal_lahir" class="font-weight-bold">Tanggal Lahir</label>
                                    <input type="text" class="form-control" v-model="post.Tanggal_lahir"
                                        placeholder="Masukkan tanggal lahir">

                                    <div v-if="siswa.Tanggal_lahir" class="mt-2 alert alert-danger">
                                        {{ siswa.Tanggal_lahir[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Nama_ibuKandung" class="font-weight-bold">Nama Ibu Kandung</label>
                                    <input type="text" class="form-control" v-model="post.Nama_ibuKandung"
                                        placeholder="Masukkan nama ibu kandung">

                                    <div v-if="siswa.Nama_ibuKandung" class="mt-2 alert alert-danger">
                                        {{ siswa.Nama_ibuKandung[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="NPSN" class="font-weight-bold">NPSN</label>
                                    <input type="text" class="form-control" v-model="post.NPSN"
                                        placeholder="Masukkan NPSN sekolah">

                                    <div v-if="siswa.NPSN" class="mt-2 alert alert-danger">
                                        {{ siswa.NPSN[0] }}
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
            NISN: '',
            NIK: '',
            Nama_lengkap: '',
            Jenis_kelamin: '',
            Tanggal_lahir: '',
            Nama_ibuKandung: '',
            NPSN: ''
        })

        //reactive state
        let siswa = ref([]);

        //vue router
        const router = useRouter();

        //method store
        function store() {
            let NISN = post.NISN
            let NIK = post.NIK
            let Nama_lengkap = post.Nama_lengkap
            let Jenis_kelamin = post.Jenis_kelamin
            let Tanggal_lahir = post.Tanggal_lahir
            let Nama_ibuKandung = post.Nama_ibuKandung
            let NPSN = post.NPSN

            axios.post('http://localhost:8000/api/siswa', {
                NISN: NISN,
                NIK: NIK,
                Nama_lengkap: Nama_lengkap,
                Jenis_kelamin: Jenis_kelamin,
                Tanggal_lahir: Tanggal_lahir,
                Nama_ibuKandung: Nama_ibuKandung,
                NPSN: NPSN
            })
            router.push({
                name: 'Siswa'
            })
        }

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/siswa")
                .then((response) => {
                    //asign state siswa with response data
                    siswa.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });


        //return
        return {
            siswa,
            post,
            router,
            store
        };
    },
};
</script>