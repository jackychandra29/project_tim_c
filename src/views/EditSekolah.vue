<template>
    <div>
        <h1>Edit Sekolah - {{ sekolah.NPSN }}</h1>
        <form @submit="updateSekolah">
            <label>NPSN</label>
            <input type="text" v-model="sekolah.NPSN" disabled />
            <label>Nama Sekolah</label>
            <input type="text" v-model="sekolah.Nama_SP" />
            <label>Bentuk Pendidikan</label>
            <input type="text" v-model="sekolah.Bentuk_pendidikan" />
            <label>Status</label>
            <input type="text" v-model="sekolah.Status_sekolah" />
            <label>Kode Kecamatan</label>
            <input type="text" v-model="sekolah.Kode_kecamatan" />
            <label>Kode Kabupaten Kota</label>
            <input type="text" v-model="sekolah.Kode_kabKota" />
            <button type="submit">Update</button>
        </form>
    </div>
</template>

<script>
    import {
        reactive,
        ref,
        onMounted
    } from "vue";
    import {
        useRouter,
        useRoute
    } from "vue-router";
    import axios from "axios";

    export default {
        setup() {
            // Create reactive state for sekolah data
            const sekolah = reactive({
                NPSN: '',
                Nama_SP: '',
                Bentuk_pendidikan: '',
                Status_sekolah: '',
                Kode_kecamatan: '',
                Kode_kabKota: '',
            });

            // Create ref for validation errors
            const validation = ref([]);

            // Get Vue Router instance
            const router = useRouter();

            // Get current route
            const route = useRoute();

            // Fetch sekolah data from API on component mount
            onMounted(() => {
                axios
                    .get(`http://localhost:8000/api/sekolah/${route.params.NPSN}`)
                    .then((response) => {
                        sekolah.NPSN = response.data.data.NPSN;
                        sekolah.Nama_SP = response.data.data.Nama_SP;
                        sekolah.Bentuk_pendidikan = response.data.data.Bentuk_pendidikan;
                        sekolah.Status_sekolah = response.data.data.Status_sekolah;
                        sekolah.Kode_kecamatan = response.data.data.Kode_kecamatan;
                        sekolah.Kode_kabKota = response.data.data.Kode_kabKota;
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                    });
            });

            // Method to update sekolah data
            function updateSekolah() {
                let NPSN = sekolah.NPSN;
                let Nama_SP = sekolah.Nama_SP;
                let Bentuk_pendidikan = sekolah.Bentuk_pendidikan;
                let Status_sekolah = sekolah.Status_sekolah;
                let Kode_kecamatan = sekolah.Kode_kecamatan;
                let Kode_kabKota = sekolah.Kode_kabKota;

                axios
                    .put(`http://localhost:8000/api/sekolah/${route.params.NPSN}`, {
                        NPSN: NPSN,
                        Nama_SP: Nama_SP,
                        Bentuk_pendidikan: Bentuk_pendidikan,
                        Status_sekolah: Status_sekolah,
                        Kode_kecamatan: Kode_kecamatan,
                        Kode_kabKota: Kode_kabKota,
                    })
                    .then(() => {
                        console.log('Sekolah updated successfully');
                        router.push({
                            name: 'Sekolah'
                        });
                    })
                    .catch((error) => {
                        console.log(error.response.data);
                        validation.value = error.response.data;
                    });
            }

            // Return data and methods
            return {
                sekolah,
                validation,
                updateSekolah,
            };
        },
    };
</script>