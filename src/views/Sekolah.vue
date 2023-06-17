<template>
    <div class="container">
        <div class="table table-hover">
            <thead>
                <tr>
                    <th>NPSN</th>
                    <th>Nama</th>
                    <th>Bentuk</th>
                    <th>Status</th>
                    <th>Kode_Kec</th>
                    <th>Kode_kab</th>
                </tr>
            </thead>
            
            <tbody>
                <tr v-for="sek in sekolah.slice(0,5)" :key="sek.npsn">
                    <td>{{ sek.NPSN }}</td>
                    <td>{{ sek.Nama_SP }}</td>
                    <td>{{ sek.Bentuk_pendidikan }}</td>
                    <td>{{ sek.Status_sekolah }}</td>
                    <td>{{ sek.Kode_kecamatan }}</td>
                    <td>{{ sek.Kode_kabKota }}</td>
                </tr>
                
            </tbody>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Sekolah',
    data(){
        return{
            
            sekolah:[]
        }
    },
    created(){
        this.getSekolah();
    },
    methods: {
        async getSekolah(){
            let url = 'http://127.0.0.1:8000/api/sekolah';
            await axios.get(url).then(response => {
                this.sekolah = response.data.sekolah;
                console.log(this.sekolah);
            }).catch(error =>{
                console.log(error);
            });
        }
    },
    mounted(){
        console.log('Sekolah List Compoenent Mounted');
    }
}
</script>