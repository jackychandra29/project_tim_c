<template>
    <Header></Header>
    <Sidebar></Sidebar>
    <main id="main" class="main">
        <div class="pagetitle">
            <h1 style="text-align: left;">Tambah Data Jurusan</h1>
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                    <li class="breadcrumb-item"><a href="/jurusan">Jurusan</a></li>
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
                                    <label for="Kode_ruang" class="font-weight-bold">Kode Ruangan</label>
                                    <input type="text" class="form-control" v-model="post.Kode_ruang"
                                        placeholder="Masukkan kode ruangan">

                                    <div v-if="ruang.Kode_ruang" class="mt-2 alert alert-danger">
                                        {{ ruang.Kode_ruang[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Nama_ruang" class="font-weight-bold">Nama Ruangan</label>
                                    <input type="text" class="form-control" v-model="post.Nama_ruang"
                                        placeholder="Masukkan nama ruangan">

                                    <div v-if="ruang.Nama_ruang" class="mt-2 alert alert-danger">
                                        {{ ruang.Nama_ruang[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Panjang" class="font-weight-bold">Panjang Ruangan</label>
                                    <input type="text" class="form-control" v-model="post.Panjang"
                                        placeholder="Masukkan panjang ruangan">

                                    <div v-if="ruang.Panjang" class="mt-2 alert alert-danger">
                                        {{ ruang.Panjang[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Lebar" class="font-weight-bold">Lebar Ruangan</label>
                                    <input type="text" class="form-control" v-model="post.Lebar"
                                        placeholder="Masukkan lebar ruangan">

                                    <div v-if="ruang.Lebar" class="mt-2 alert alert-danger">
                                        {{ ruang.Lebar[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Lantai" class="font-weight-bold">Lantai Ruangan</label>
                                    <input type="text" class="form-control" v-model="post.Lantai"
                                        placeholder="Masukkan lantai ruangan">

                                    <div v-if="ruang.Lantai" class="mt-2 alert alert-danger">
                                        {{ ruang.Lantai[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Kode_bangunan" class="font-weight-bold">Kode Bangunan</label>
                                    <input type="text" class="form-control" v-model="post.Kode_bangunan"
                                        placeholder="Masukkan kode bangunan">

                                    <div v-if="ruang.Kode_bangunan" class="mt-2 alert alert-danger">
                                        {{ ruang.Kode_bangunan[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Kode_jenis_ruang" class="font-weight-bold">Kode Jenis Ruangan</label>
                                    <input type="text" class="form-control" v-model="post.Kode_jenis_ruang"
                                        placeholder="Masukkan kode jenis ruangan">

                                    <div v-if="ruang.Kode_jenis_ruang" class="mt-2 alert alert-danger">
                                        {{ ruang.Kode_jenis_ruang[0] }}
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
            Kode_ruang: '',
            Nama_ruang: '',
            Panjang: '',
            Lebar: '',
            Lantai: '',
            Kode_bangunan: '',
            Kode_jenis_ruang: '',
        })

        //reactive state
        let ruang = ref([]);

        //vue router
        const router = useRouter();

        //method store
        function store() {
            let Kode_ruang = post.Kode_ruang
            let Nama_ruang = post.Nama_ruang
            let Panjang = post.Panjang
            let Lebar = post.Lebar
            let Lantai = post.Lantai
            let Kode_bangunan = post.Kode_bangunan
            let Kode_jenis_ruang = post.Kode_jenis_ruang

            axios.post('http://localhost:8000/api/ruang', {
                Kode_ruang: Kode_ruang,
                Nama_ruang: Nama_ruang,
                Panjang: Panjang,
                Lebar: Lebar,
                Lantai: Lantai,
                Kode_bangunan: Kode_bangunan,
                Kode_jenis_ruang: Kode_jenis_ruang,
            }).then(() => {
                router.push({
                    name: 'post.index'
                })
            }).catch(error => {
                //assign state jurusan w error
                ruang.value = error.response.data
            })
        }

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/ruang")
                .then((response) => {
                    //asign state ruang with response data
                    ruang.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });


        //return
        return {
            ruang,
            post,
            router,
            store
        };
    },
};
</script>