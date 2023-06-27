<template>
    <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <a class="nav-link" href="/dashboard">
        <i class="bi bi-grid fs-5"></i>
        <span>Dashboard</span>
      </a>

      <li class="nav-heading" style="font-size: 12px">Data Pendidikan</li>
      <li class="nav-item">
        <router-link class="nav-link" to="/sekolah">
          <i class="bi bi-building-fill-up fs-5"></i>
          <span>Sekolah</span>
        </router-link>
        <a class="nav-link" href="/jurusan">
          <i class="bi bi-vector-pen fs-5"></i>
          <span>Jurusan</span>
        </a>
        <a class="nav-link" href="/ruang">
          <i class="bi bi-house-up fs-5"></i>
          <span>Ruang</span>
        </a>
        <a class="nav-link" href="/staff">
          <i class="bi bi-person-video3 fs-5"></i>
          <span>Staff</span>
        </a>
        <a class="nav-link" href="/siswa">
          <i class="bi bi-person-video2 fs-5"></i>
          <span>Siswa</span>
        </a>
        <a class="nav-link" href="/rombel">
          <i class="bi bi-diagram-3 fs-5"></i>
          <span>Rombel</span>
        </a>
      </li>
      <!-- End Dashboard Nav -->
    </ul>
  </aside>
</template>