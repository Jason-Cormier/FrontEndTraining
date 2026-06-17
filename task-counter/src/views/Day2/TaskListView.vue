<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup>
import { ref } from 'vue'
import TaskCard from './TaskCard.vue'

// TODO 1: Create a ref() tasks array with at least 3 sample tasks
// Each task: { id, name, done, dueDate }
// const tasks = ref([...])
const tasks = ref([
  { id: 1, name: 'Task 1', done: false, dueDate: '2024-06-10', priority: 'high' },
  { id: 2, name: 'Task 2', done: true, dueDate: '2024-06-15', priority: 'medium' },
  { id: 3, name: 'Task 3', done: false, dueDate: '2024-06-12', priority: 'low' }
])

// TODO 2: Write handleComplete(id) — toggle the done state of the task with this id
function handleComplete(id) {
  // your code here
  const task = tasks.value.find(task => task.id === id)
  if (task) {task.done = !task.done}
}

// TODO 3: Write handleDelete(id) — remove the task with this id from the array
function handleDelete(id) {
  // your code here
  tasks.value = tasks.value.filter(task => task.id !== id)
}

function handleUpdate(payload) {
  const task = tasks.value.find(task => task.id === payload.id)
  if (task) {task.name = payload.name}
}
</script>

<template>
  <div class="task-list-view">
    <h1>My Tasks</h1>

    <!-- TODO 4: Render a <TaskCard> for each task using v-for
         - Pass :task="task" as a prop
         - Listen @complete="handleComplete"
         - Listen @delete="handleDelete"
         - Fill the "meta" named slot with the due date
    -->

    <!-- Example structure (remove the comment markers and complete it):
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="???"
      @complete="???"
      @delete="???"
    >
      <template #meta>
        Due: {{ ??? }}
      </template>
    </TaskCard>
    -->
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :priority="task.priority"
      @complete="handleComplete"
      @delete="handleDelete"
      @update="handleUpdate"
    >
      <template #meta>
        Due: {{ task.dueDate }}
      </template>
    </TaskCard>
    <div v-if="tasks.length === 0">No tasks left!</div>
  </div>
</template>

<style scoped>
.task-list-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 { color: #1B2A4A; margin-bottom: 24px; }
</style>
