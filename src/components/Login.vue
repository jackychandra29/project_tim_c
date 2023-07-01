<template>
  <main>
    <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div class="d-flex justify-content-center py-4">
                <a href="#" class="logo d-flex align-items-center w-auto">
                  <img src="assets/img/logo-color.png" alt="">
                  <span class="d-none d-lg-block">Dashboard Manajemen Sistem Vokasi Riau</span>
                </a>
              </div><!-- End Logo -->

              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">LOGIN</h5>
                  </div>

                  <form class="row g-3 needs-validation" @submit.prevent="LoginData">

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
                      <input type="password" v-model="user.password" name="password" class="form-control" id="password"
                        required>
                      <div class="invalid-feedback">Please enter your password!</div>
                    </div>


                    <div class="col-12">
                      <button class="btn btn-primary w-100" type="submit">Login</button>
                    </div>

                    <div class="col-12">
                      <a class="nav-link" href="/register"><u>Register</u></a>
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
import { useStore } from 'vuex'; 

// Vue.use(axios)
export default {
  name: 'Login',
  data() {
    return {
      result: {},
      user: {
        email: '',
        password: '',
      }
    }
  },
  mounted() {
    console.log("mounted() called...");
  },
  created() {
    const store = useStore(); // Menggunakan useStore() untuk mendapatkan instance store
    store.commit('setLoggedIn', false);
    store.commit('setUser', null);
  },
  methods: {
    LoginData() {
      axios.post("http://127.0.0.1:8000/api/login", this.user)
        .then(({ data }) => {
          console.log(data);
          try {
            if (data.status === true && data.data.status==1) {
              alert("Login Successfully");
              this.$store.commit('setLoggedIn', true);
              this.$store.commit('setUser', data.data);
              this.$router.push({ name: 'Dashboard' });
              // console.log(this.$store.getters.user);
            } else {
              alert("Login Failed");
            }
          } catch (err) {
            alert("Failed");
          }
        });
    },
  },
}
</script>