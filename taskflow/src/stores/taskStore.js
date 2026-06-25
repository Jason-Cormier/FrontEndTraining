import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Preferences } from '@capacitor/preferences'

export const useTaskStore = defineStore('tasks', () => {

  const tasks = ref([])
  const nextId = ref(1)

  const totalCount = computed(() => tasks.value.length)
  const doneCount = computed(() => tasks.value.filter(t => t.done).length)
  const pendingCount = computed(() => totalCount.value - doneCount.value)

  function addTask(name) {
    if (!name.trim()) return
    tasks.value.push({
      id: nextId.value++,
      name,
      done: false,
      photo: ""
    })
    saveTasks()
  }

  function toggleTask(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) { task.done = !task.done }
    saveTasks()
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveTasks()
  }

  function addPhotoToTask(taskId, photoPath) {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) task.photo = photoPath
    saveTasks()
  }

  async function saveTasks() {
    await Preferences.set({
      key: 'tasks',
      value: JSON.stringify(tasks.value)
    })
  }

  async function loadTasks() {
    const { value } = await Preferences.get({ key: 'tasks' })
    if (value) {
      tasks.value = JSON.parse(value)
    }
  }

  return {
    tasks,
    totalCount,
    doneCount,
    pendingCount,
    addTask,
    toggleTask,
    removeTask,
    addPhotoToTask,
    saveTasks,
    loadTasks
  }
}, { persist: true })