<script setup>
import { useTaskStore } from '@/stores/taskStore.js'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
const completedTasks = computed(() =>
    tasks.value.filter(t => t.done)
)
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>✅ Completed</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list v-if="completedTasks.length > 0">
                <ion-item v-for="task in completedTasks" :key="task.id">
                    <ion-label>{{ task.name }}</ion-label>
                </ion-item>
            </ion-list>
            <ion-label v-else class="empty">
                No completed tasks yet!
            </ion-label>
        </ion-content>
    </ion-page>
</template>