<!--
=============================================================
  DAY 4 ASSIGNMENT — TaskListView.vue (refactored for Pinia)
  Remove all local state. Use the store for everything.
=============================================================
-->
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

// TODO 1: Import your store
// import { useTaskStore } from '@/stores/taskStore'
import { useTaskStore } from '@/stores/Day4/taskStore'

import { useUserStore } from '@/stores/Day4/userStore'

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

const userStore = useUserStore()

const { currentUser, isLoggedIn } = storeToRefs(userStore)

const { login } = userStore

const loginName = ref('')

function handleAdd() {
  // TODO 5: Call addTask() from the store, then clear the input
  addTask(newTaskName.value)
  newTaskName.value = ''
}

function handleLogin() {
  if (!loginName.value.trim()) return
  login(loginName.value)
}
</script>

<template>
  <div class="task-view">
    <h1>📝 Tasks</h1>

    <div v-if="!isLoggedIn" class="login-form">
      <input v-model="loginName" placeholder="Enter your name..." @keyup.enter="handleLogin" />
      <button @click="handleLogin">Login</button>
    </div>

    <div v-else class="user-header">
      <p>Welcome, {{ currentUser }}! 👋</p>
    </div>

    <!-- TODO 6: Display totalCount, doneCount, pendingCount from the store -->
    <div class="stats">
      <!-- Total: {{ ??? }} | Done: {{ ??? }} | Pending: {{ ??? }} -->
       Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
    </div>

    <div class="input-row">
      <input v-model="newTaskName" placeholder="New task..." @keyup.enter="handleAdd" />
      <button @click="handleAdd">Add</button>
    </div>

    <!-- TODO 7: Render the task list using tasks from the store -->
    <ul class="task-list">
      <!-- v-for task in tasks -->
      <!--   checkbox v-model="task.done" @change="toggleTask(task.id)" -->
      <!--   span :class done -->
      <!--   remove button @click="removeTask(task.id)" -->
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" v-model="task.done" />
        <span :class="{ done: task.done }">{{ task.name }}</span>
        <button class="remove" @click="removeTask(task.id)">Remove</button>
      </li>
      <p class="empty" v-if="totalCount === 0">No remaining task</p>

    </ul>
  </div>
</template>

<style scoped>
.task-view { max-width: 480px; margin: 40px auto; padding: 24px; font-family: Arial, sans-serif; }
h1 { color: #1B2A4A; }
.stats { font-size: 13px; color: #555; padding: 8px 12px; background: #e9f7f0; border-radius: 6px; margin-bottom: 16px; }
.input-row { display: flex; gap: 8px; margin-bottom: 16px; }
.input-row input { flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
.input-row button { padding: 8px 16px; background: #42B883; color: white; border: none; border-radius: 6px; cursor: pointer; }
.task-list { list-style: none; padding: 0; margin: 0; }
.task-list li { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: white; border-radius: 6px; margin-bottom: 8px; border: 1px solid #eee; }
.task-list li span { flex: 1; font-size: 14px; }
.done { text-decoration: line-through; color: #9ca3af; }
.task-list li .remove { padding: 4px 10px; background: #fee2e2; color: #dc2626; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; }
.login-form { display: flex; gap: 8px; margin-bottom: 16px; }
.login-form input { flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
.login-form button { padding: 8px 16px; background: #1B2A4A; color: white; border: none; border-radius: 6px; cursor: pointer; }
.user-header { margin-bottom: 16px; font-weight: bold; color: #1b2a4a; }
</style>
