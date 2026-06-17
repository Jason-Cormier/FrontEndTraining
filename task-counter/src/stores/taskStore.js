import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref([
        { id: 1, name: 'Task 1', done: false, dueDate: '2024-06-10', priority: 'high' },
        { id: 2, name: 'Task 2', done: true, dueDate: '2024-06-15', priority: 'medium' },
        { id: 3, name: 'Task 3', done: false, dueDate: '2024-06-12', priority: 'low' }
    ])
    return { tasks }
})