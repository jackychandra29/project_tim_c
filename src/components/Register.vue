<template>
    <main>
    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div class="d-flex justify-content-center py-4">
                <a href="index.html" class="logo d-flex align-items-center w-auto">
                  <img src="assets/img/logo-color.png" alt="">
                  <span class="d-none d-lg-block">Dashboard Manajemen Sistem Vokasi Riau</span>
                </a>
              </div><!-- End Logo -->

              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">REGISTER</h5>
                  </div>

                  <form class="row g-3 needs-validation" @submit.prevent="saveData">

                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Name</label>
                      <div class="input-group has-validation">
                        <input type="text" v-model="user.name" name="name" class="form-control" id="name" required>
                        <div class="invalid-feedback">Please enter your name.</div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourUsername" class="form-label">Email</label>
                      <div class="input-group has-validation">
                        <span class="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="email" v-model="user.email" name="email" class="form-control" id="email" required>
                        <div class="invalid-feedback">Please enter your email.</div>
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="yourPassword" class="form-label">Password</label>
                      <input type="password" v-model="user.password" name="password" class="form-control" id="password" required>
                      <div class="invalid-feedback">Please enter your password!</div>
                    </div>

                    
                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit">Register</button>
                    </div>

                    <div class="col-12">
                     <a class="nav-link" href="/"><u>Login</u></a>
                    </div>
                    
                  </form>

                </div>
              </div>

              <div class="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
              </div>

            </div>
          </div>
        </div>

      </section>

    </div>
  </main>
</template>

<script>
// import Vue from 'vue';
import axios from 'axios';

// Vue.use(axios)
export default{
    name: 'Registration',
    data(){
        return{
            result: {},
            user:{
                name:'',
                email:'',
                password:''
            }
        }
    },
    created(){

    },
    mounted(){
        console.log("mounted() called...");
    },
    methods:{
        saveData(){
            axios.post("http://127.0.0.1:8000/api/register", this.user)
            .then(
                ({data})=>{
                    console.log(data);
                    try{
                        alert("saved");
                    } catch (err){
                        alert("failed");
                    }
                }
            )
        }
    }
}
</script>