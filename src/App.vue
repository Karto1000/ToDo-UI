<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <body>
    <header>
      <div class="wrapper"></div>
    </header>

    <main>
      <RouterView />
    </main>

    <footer class="bg-body-tertiary text-center text-lg-start">
      <div class="text-center p-3">
        © 2023 Copyright:
        <a class="text-body" href="https://mdbootstrap.com/">ToDos.com</a>
      </div>
    </footer>
  </body>
</template>

<style scoped></style>
