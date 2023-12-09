<script setup lang="ts">
import { RouterView } from 'vue-router'
//@ts-ignore
import Navigation from '@/components/Navigation.vue'
</script>

<template>
  <body>
    <header>
      <div class="wrapper"></div>
    </header>

    <Navigation />

    <main>
      <RouterView />
    </main>

    <footer class="bg-body-tertiary text-center text-lg-start fixed-bottom">
      <div class="text-center p-3">
        © 2023 Copyright:
        <a class="text-body" href="https://mdbootstrap.com/">ToDos.com</a>
      </div>
    </footer>
  </body>
</template>

<style scoped>
main {
  padding: 12px;
}
</style>
