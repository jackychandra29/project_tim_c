<template>
<!-- ======= Header ======= -->
  <Header></Header>
<!-- End Header -->

<!-- ======= Sidebar ======= -->
  <Sidebar></Sidebar>
<!-- End Sidebar-->

<!-- Main -->
<router-view></router-view>
<!-- End #main -->

<!-- ======= Footer ======= -->
  <Footer></Footer>
<!-- End Footer -->

    <a
      href="#"
      class="back-to-top d-flex align-items-center justify-content-center"
      ><i class="bi bi-arrow-up-short"></i
    ></a>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
