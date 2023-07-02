<template>
    <Header></Header>
    <Sidebar></Sidebar>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 style="text-align: left;">Tambah Data Admin SMK</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                    <li class="breadcrumb-item"><a href="/adminsmk">Admin SMK</a></li>
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
                                    <label for="NIP" class="font-weight-bold">NIP</label>
                                    <input type="text" class="form-control" v-model="post.NIP" placeholder="Masukkan NIP">

                                    <div v-if="adminsmk.NIP" class="mt-2 alert alert-danger">
                                        {{ adminsmk.NIP[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="NIK" class="font-weight-bold">NIK</label>
                                    <input type="text" class="form-control" v-model="post.NIK" placeholder="Masukkan NIK">

                                    <div v-if="adminsmk.NIK" class="mt-2 alert alert-danger">
                                        {{ adminsmk.NIK[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="NamaAdm" class="font-weight-bold">Nama Lengkap</label>
                                    <input type="text" class="form-control" v-model="post.NamaAdm"
                                        placeholder="Masukkan nama lengkap">

                                    <div v-if="adminsmk.NamaAdm" class="mt-2 alert alert-danger">
                                        {{ adminsmk.NamaAdm[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="NoTelpAdm" class="font-weight-bold">Nomor Telepon</label>
                                    <input type="text" class="form-control" v-model="post.NoTelpAdm"
                                        placeholder="Masukkan nomor telepon">

                                    <div v-if="adminsmk.NoTelpAdm" class="mt-2 alert alert-danger">
                                        {{ adminsmk.NoTelpAdm[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="EmailAdm" class="font-weight-bold">Email</label>
                                    <input type="text" class="form-control" v-model="post.EmailAdm"
                                        placeholder="Masukkan email">

                                    <div v-if="adminsmk.EmailAdm" class="mt-2 alert alert-danger">
                                        {{ adminsmk.EmailAdm[0] }}
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

                                    <div v-if="adminsmk.Jenis_kelamin" class="mt-2 alert alert-danger">
                                        {{ adminsmk.Jenis_kelamin[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="NPSN" class="font-weight-bold">NPSN</label>
                                    <input type="text" class="form-control" v-model="post.NPSN"
                                        placeholder="Masukkan NPSN sekolah asal">

                                    <div v-if="adminsmk.NPSN" class="mt-2 alert alert-danger">
                                        {{ adminsmk.NPSN[0] }}
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
            NIP: '',
            NIK: '',
            NamaAdm: '',
            NoTelpAdm: '',
            EmailAdm: '',
            Jenis_kelamin: '',
            NPSN: '',
        })

        //reactive state
        let adminsmk = ref([]);

        //vue router
        const router = useRouter();

        //method store
        function store() {
            let NIP = post.NIP
            let NIK = post.NIK
            let NamaAdm = post.NamaAdm
            let NoTelpAdm = post.NoTelpAdm
            let EmailAdm = post.EmailAdm
            let Jenis_kelamin = post.Jenis_kelamin
            let NPSN = post.NPSN

            axios.post('http://localhost:8000/api/adminsmk', {
                NIP: NIP,
                NIK: NIK,
                NamaAdm: NamaAdm,
                NoTelpAdm: NoTelpAdm,
                EmailAdm: EmailAdm,
                Jenis_kelamin: Jenis_kelamin,
                NPSN: NPSN,
            }).then(() => {
                router.push({
                    name: 'post.index'
                })
            }).catch(error => {
                //assign state jurusan w error
                adminsmk.value = error.response.data
            })
        }

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/adminsmk")
                .then((response) => {
                    //asign state adminsmk with response data
                    adminsmk.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });


        //return
        return {
            adminsmk,
            post,
            router,
            store
        };
    },
};
</script>