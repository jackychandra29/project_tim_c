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
                                    <label for="Kode_jurusan" class="font-weight-bold">Kode Jurusan</label>
                                    <input type="text" class="form-control" v-model="post.Kode_jurusan"
                                        placeholder="Masukkan kode jurusan">

                                    <div v-if="jurusan.Kode_jurusan" class="mt-2 alert alert-danger">
                                        {{ jurusan.Kode_jurusan[0] }}
                                    </div>

                                </div>
                                <br>

                                <div class="form-group" style="text-align: left">
                                    <label for="Nama_jurusan" class="font-weight-bold">Nama Jurusan</label>
                                    <input type="text" class="form-control" v-model="post.Nama_jurusan"
                                        placeholder="Masukkan nama jurusan">

                                    <div v-if="jurusan.Nama_jurusan" class="mt-2 alert alert-danger">
                                        {{ jurusan.Nama_jurusan[0] }}
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
            Kode_jurusan: '',
            Nama_jurusan: ''
        })

        //reactive state
        let jurusan = ref([]);

        //vue router
        const router = useRouter();

        //method store
        function store() {
            let Kode_jurusan = post.Kode_jurusan
            let Nama_jurusan = post.Nama_jurusan

            axios.post('http://localhost:8000/api/jurusan', {
                Kode_jurusan: Kode_jurusan,
                Nama_jurusan: Nama_jurusan
            }).then(() => {
                router.push({
                    name: 'post.index'
                })
            }).catch(error => {
                //assign state jurusan w error
                jurusan.value = error.response.data
            })
        }

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/jurusan")
                .then((response) => {
                    //asign state jurusan with response data
                    jurusan.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });


        //return
        return {
            jurusan,
            post,
            router,
            store
        };
    },
};
</script>