<template>
    <Header></Header>
    <Sidebar></Sidebar>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 style="text-align: left;">Tambah Data Rombel</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                    <li class="breadcrumb-item"><a href="/rombel">Rombel</a></li>
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
                                    <label for="Kode_rombel" class="font-weight-bold">Kode Rombel</label>
                                    <input type="text" class="form-control" v-model="post.Kode_rombel"
                                        placeholder="Masukkan kode rombel">

                                    <div v-if="rombel.Kode_rombel" class="mt-2 alert alert-danger">
                                        {{ rombel.Kode_rombel[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Nama_rombel" class="font-weight-bold">Nama Rombel</label>
                                    <input type="text" class="form-control" v-model="post.Nama_rombel"
                                        placeholder="Masukkan nama rombel">

                                    <div v-if="rombel.Nama_rombel" class="mt-2 alert alert-danger">
                                        {{ rombel.Nama_rombel[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Nama_lengkap" class="font-weight-bold">Tingkat</label><br>
                                    <input type="radio" id="10" v-model="post.Semester" value="Kelas 10" style="margin: 0 5px;">
                                    <label for="10"> Kelas 10</label><br>
                                    <input type="radio" id="11" v-model="post.Semester" value="Kelas 11" style="margin: 0 5px;">
                                    <label for="11"> Kelas 11</label><br>
                                    <input type="radio" id="12" v-model="post.Semester" value="Kelas 12" style="margin: 0 5px;">
                                    <label for="12"> Kelas 12</label><br>

                                    <div v-if="rombel.Semester" class="mt-2 alert alert-danger">
                                        {{ rombel.Semester[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Semester" class="font-weight-bold">Semester</label><br>
                                    <input type="radio" id="ganjil" v-model="post.Semester" value="Ganjil" style="margin: 0 5px;">
                                    <label for="ganjil"> Ganjil</label><br>
                                    <input type="radio" id="genap" v-model="post.Semester" value="Genap" style="margin: 0 5px;">
                                    <label for="genap"> Genap</label><br>

                                    <div v-if="rombel.Semester" class="mt-2 alert alert-danger">
                                        {{ rombel.Semester[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Tahun_pelajaran" class="font-weight-bold">Tahun Pelajaran</label>
                                    <input type="text" class="form-control" v-model="post.Tahun_pelajaran"
                                        placeholder="Masukkan tahun pelajaran">

                                    <div v-if="rombel.Tahun_pelajaran" class="mt-2 alert alert-danger">
                                        {{ rombel.Tahun_pelajaran[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Kurikulum" class="font-weight-bold">Kurikulum</label>
                                    <input type="text" class="form-control" v-model="post.Kurikulum"
                                        placeholder="Masukkan kurikulum">

                                    <div v-if="rombel.Kurikulum" class="mt-2 alert alert-danger">
                                        {{ rombel.Kurikulum[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Kode_ruang" class="font-weight-bold">Kode Ruang</label>
                                    <input type="text" class="form-control" v-model="post.Kode_ruang"
                                        placeholder="Masukkan kode ruang">

                                    <div v-if="rombel.Kode_ruang" class="mt-2 alert alert-danger">
                                        {{ rombel.Kode_ruang[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="ID_staff" class="font-weight-bold">ID Staff</label>
                                    <input type="text" class="form-control" v-model="post.ID_staff"
                                        placeholder="Masukkan ID staff wali">

                                    <div v-if="rombel.ID_staff" class="mt-2 alert alert-danger">
                                        {{ rombel.ID_staff[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Jurusan_SP_ID" class="font-weight-bold">ID Jurusan Sekolah</label>
                                    <input type="text" class="form-control" v-model="post.Jurusan_SP_ID"
                                        placeholder="Masukkan ID jurusan sekolah">

                                    <div v-if="rombel.Jurusan_SP_ID" class="mt-2 alert alert-danger">
                                        {{ rombel.Jurusan_SP_ID[0] }}
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
            Kode_rombel: '',
            Nama_rombel: '',
            Tingkat: '',
            Semester: '',
            Tahun_pelajaran: '',
            Kurikulum: '',
            Kode_ruang: '',
            ID_staff: '',
            Jurusan_SP_ID: ''
        })

        //reactive state
        let rombel = ref([]);

        //vue router
        const router = useRouter();

        //method store
        function store() {
            let Kode_rombel = post.Kode_rombel
            let Nama_rombel = post.Nama_rombel
            let Tingkat = post.Tingkat
            let Semester = post.Semester
            let Tahun_pelajaran = post.Tahun_pelajaran
            let Kurikulum = post.Kurikulum
            let Kode_ruang = post.Kode_ruang
            let ID_staff = post.ID_staff
            let Jurusan_SP_ID = post.Jurusan_SP_ID

            axios.post('http://localhost:8000/api/ruang', {
                Kode_rombel: Kode_rombel,
                Nama_rombel: Nama_rombel,
                Tingkat: Tingkat,
                Semester: Semester,
                Tahun_pelajaran: Tahun_pelajaran,
                Kurikulum: Kurikulum,
                Kode_ruang: Kode_ruang,
                ID_staff: ID_staff,
                Jurusan_SP_ID: Jurusan_SP_ID,
            }).then(() => {
                router.push({
                    name: 'post.index'
                })
            }).catch(error => {
                //assign state validation w error
                rombel.value = error.response.data
            })
        }

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/ruang")
                .then((response) => {
                    //asign state rombel with response data
                    rombel.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });


        //return
        return {
            rombel,
            post,
            router,
            store
        };
    },
};
</script>