<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore.js'

const taskStore = useTaskStore()
onMounted(() => {
  taskStore.loadTasks()
})
</script>
