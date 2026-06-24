<!--
=============================================================
  DAY 4 ASSIGNMENT — TaskListView.vue (refactored for Pinia)
  Remove all local state. Use the store for everything.
=============================================================
-->
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
  IonImg
} from '@ionic/vue'

// TODO 1: Import your store
// import { useTaskStore } from '@/stores/taskStore'
import { useTaskStore } from '@/stores/taskStore'

import { useRouter } from 'vue-router'

// TODO 2: Get the store instance
// const taskStore = useTaskStore()
const taskStore = useTaskStore()

// TODO 3: Destructure REACTIVE STATE using storeToRefs()
// const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore)
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore)

// TODO 4: Destructure ACTIONS directly (no storeToRefs needed for functions)
// const { addTask, toggleTask, removeTask } = taskStore
const { addTask, toggleTask, removeTask } = taskStore

// This local ref is fine — it's UI state, not task state
const newTaskName = ref('')

function handleAdd() {
  // TODO 5: Call addTask() from the store, then clear the input
  addTask(newTaskName.value)
  newTaskName.value = ''
}

const router = useRouter()

function goToDetail(id) {
  router.push(`/tabs/tab1/tasks/${id}`)
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>📝 Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="stats">
        Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
      </div>
      <ion-item>
        <ion-input
          v-model="newTaskName"
          placeholder="New task..."
          @keyup.enter="handleAdd"
        />
      </ion-item>
      <ion-button expand="block" @click="handleAdd">Add Task</ion-button>
      <ion-list>
        <ion-item v-for="task in tasks" :key="task.id" @click="goToDetail(task.id)">
          <ion-checkbox
            slot="start"
            :checked="task.done"
            @ionChange="toggleTask(task.id)"
            @click.stop
          />
          <ion-label :class="{ done: task.done }">{{ task.name }}</ion-label>
          <ion-img
            v-if="task.photo"
            :src="task.photo"
            slot="end"
            style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;"
          />
          <ion-button
            slot="end"
            fill="outline"
            color="danger"
            @click.stop="removeTask(task.id)"
          >Remove</ion-button>
        </ion-item>
      </ion-list>
      <ion-label v-if="totalCount === 0" class="empty">No remaining tasks</ion-label>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.stats {
  font-size: 13px;
  color: #555;
  padding: 8px 12px;
  background: #e9f7f0;
  border-radius: 6px;
  margin: 16px 0;
}
.done {
  text-decoration: line-through;
  color: #9ca3af;
}
.empty {
  text-align: center;
  color: #aaa;
  display: block;
  margin-top: 32px;
}
</style>
