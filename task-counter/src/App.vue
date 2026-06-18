<script setup lang="ts">
  import { RouterView } from 'vue-router'
</script>

<template>
  <Transition name="fade">
    <RouterView />
  </Transition>
</template>

<style>
body {
  justify-content: center;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>