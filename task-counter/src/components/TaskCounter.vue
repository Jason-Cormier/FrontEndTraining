<!--
=============================================================
  DAY 1 ASSIGNMENT — Reactive Task Counter App
  Topic: Vue 3 Composition API (ref, computed, v-model, v-for)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reactive task management app that demonstrates Vue 3's
reactivity system. You will use ref(), computed(), v-model, v-for,
and event handling — the core building blocks of every Vue app.

WHAT TO BUILD
-------------
A single-file Vue component (this file) that:

  1. Has a text input + "Add Task" button to create new tasks.
  2. Displays the task list, each item with:
       - A checkbox to mark it as done
       - The task name (strike-through when done)
       - A "Remove" button
  3. Shows a live stats bar:
       Total Tasks | Done: X | Pending: X
  4. Shows an empty state message when there are no tasks.

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] Use ref() for the text input value
  [x] Use ref() for the tasks array
  [x] Use computed() for total, done, and pending counts
  [x] Use v-model on the text input
  [x] Use v-for with :key to render the task list
  [x] Use @keyup.enter on the input to also trigger addTask
  [x] Prevent adding empty/whitespace-only tasks
  [x] Clear the input after adding a task

EXTENSION (if you finish early)
---------------------------------
  - Add a filter bar: All | Done | Pending — filters the visible list
  - Add a "Clear All Done" button that removes all completed tasks
  - Add a task priority: Low / Medium / High (use a <select> dropdown)

HINTS (read only if stuck)
---------------------------
  Hint 1: import { ref, computed } from 'vue'
  Hint 2: tasks.value.push({ id: Date.now(), name: '...', done: false })
  Hint 3: computed(() => tasks.value.filter(t => t.done).length)
  Hint 4: For :class strikethrough — :class="{ done: task.done }"
  Hint 5: v-model on a checkbox binds to a boolean — v-model="task.done"
  Hint 6: To prevent empty tasks — if (!newTaskName.value.trim()) return

FILE STRUCTURE (this is a single-file component)
-------------------------------------------------
  <script setup>  — all your reactive logic goes here
  <template>      — your HTML markup
  <style scoped>  — your CSS (scoped = only applies to this component)
=============================================================
-->

<script setup>
import { ref, computed } from 'vue'

// TODO 1: Create a ref for the text input value (initial value: '')
const newTaskName = ref('')

const newTaskPriority = ref('low')

// TODO 2: Create a ref for the tasks array (initial value: [])
const tasks = ref([])

// TODO 3: Create computed() values for total, done, and pending counts
const totalCount  = computed(() => tasks.value.length)
const doneCount   = computed(() => tasks.value.filter(task => task.done).length)
const pendingCount = computed(() => totalCount.value - doneCount.value)

// TODO 4: Write the addTask() function
// - Prevent empty tasks
// - Push a new task object to tasks.value: { id, name, done }
// - Clear the input
function addTask() {
  if (!newTaskName.value.trim()) return
  tasks.value.push({
    id: Date.now(),
    name: newTaskName.value.trim(),
    done: false,
    priority: newTaskPriority.value
  })
  newTaskName.value = ''
  newTaskPriority.value = 'low'
}

// TODO 5: Write toggleTask(id) — flip task.done for the matching task
function toggleTask(id) {
  const task = tasks.value.find(task => task.id === id)
  if (task) {task.done = !task.done}
}

// TODO 6: Write removeTask(id) — filter out the task with this id
function removeTask(id) {
  tasks.value = tasks.value.filter(task => task.id !== id)
}

const activeFilter = ref('all')

const filteredTasks = computed(() => {
  if (activeFilter.value === 'all') {
    return tasks.value
  }
  if (activeFilter.value === 'done') {
    return tasks.value.filter(task => task.done)
  }
  if (activeFilter.value === 'pending') {
    return tasks.value.filter(task => !task.done)
  }
})

function clearDone() {
  tasks.value = tasks.value.filter(task => !task.done)
}
</script>

<template>
  <div class="app">
    <h1>Task Counter</h1>

    <!-- TODO 7: Add an input with v-model, @keyup.enter, and placeholder -->
    <!-- TODO 8: Add an "Add Task" button with @click="addTask" -->
    <div class="input-row">
      <input
        v-model="newTaskName"
        @keyup.enter="addTask"
        placeholder="Enter a new task"
      />
      <select v-model="newTaskPriority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button @click="addTask">Add Task</button>
    </div>

    <!-- TODO 9: Display the stats bar using your computed values -->
    <!-- Format: Total: X | Done: X | Pending: X -->
    <div class="stats">
      Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
    </div>

    <button class="clear-btn" @click="clearDone" v-if="doneCount > 0">Clear All Done</button>

    <div class="filters">
      <button :class="{ active: activeFilter === 'all' }" @click="activeFilter = 'all'">All</button>
      <button :class="{ active: activeFilter === 'done' }" @click="activeFilter = 'done'">Done</button>
      <button :class="{ active: activeFilter === 'pending' }" @click="activeFilter = 'pending'">Pending</button>
    </div>

    <!-- TODO 10: Show this message only when the task list is empty -->
    <!-- <p class="empty">No tasks yet. Add one above!</p> -->
    <p class="empty" v-if="totalCount === 0">No tasks yet. Add one above!</p>

    <!-- TODO 11: Render the task list using v-for -->
    <!-- Each item needs: checkbox (v-model), task name (:class done), remove button -->
    <ul class="task-list">
      <li v-for="task in filteredTasks" :key="task.id">
        <input type="checkbox" v-model="task.done" />
        <span :class="{done: task.done}">{{ task.name }}</span>
        <span class="priority" :class="task.priority">{{ task.priority }}</span>
        <button @click="removeTask(task.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.app {
  max-width: 480px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

h1 { color: #1B2A4A; margin-bottom: 20px; }

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.input-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-row button {
  padding: 8px 16px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.stats {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #e9f7f0;
  border-radius: 6px;
}

.empty {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin: 32px 0;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #eee;
}

.task-list li span {
  flex: 1;
  font-size: 14px;
}

/* TODO: Apply this class to task names when task.done is true */
.done {
  text-decoration: line-through;
  color: #aaa;
}

.task-list li button {
  padding: 4px 10px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.filters button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  background: white;
  color: black
}
.filters button.active {
  background: #42B883;
  color: white;
  border-color: #42B883;
}

.clear-btn {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #dc2626;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
}
.clear-btn:hover {
  background: #dc2626;
  color: white;
}

.priority {
  font-size: 11px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
}
.low {
  background: #d1fae5;
  color: #065f46;
}
.medium {
  background: #fef3c7;
  color: #92400e;
}
.high {
  background: #fee2e2;
  color: #dc2626;
}
</style>
