<script setup lang="ts">

const logout = () => {
  localStorage.removeItem('jwt')
}
</script>

<template>
  <nav class="navbar navbar-expand-sm bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="">
        <img src="src/assets/clipboard-regular.svg" alt="logo" width="30" height="30" />
        ToDo's
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="">Home</a>
          </li>
           <li class="nav-item">
            <a class="nav-link active" aria-current="page" @click="logout" href="/login">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
