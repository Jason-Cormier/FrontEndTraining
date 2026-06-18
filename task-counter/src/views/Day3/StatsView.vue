<script setup>
    import { computed } from 'vue'
    import { useTaskStore } from '@/stores/Day3/taskStore'
    const taskStore = useTaskStore()

    const totalCount = computed(() => taskStore.tasks.length)
    const doneCount = computed(() => taskStore.tasks.filter(t => t.done).length)
    const pendingCount = computed(() => totalCount.value - doneCount.value)
</script>

<template>
    <div class="stats-view">
        <h1>Stats</h1>
        <nav class="page-nav">
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/stats">Stats</RouterLink>
        </nav>
        <div class="stat-card">
            <p>Total Tasks: {{ totalCount }}</p>
            <p>Done: {{ doneCount }}</p>
            <p>Pending: {{ pendingCount }}</p>
        </div>
    </div>
</template>

<style scoped>
.stat-card {
    background: white;
    border: 1px solid #eee;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    width: 300px;
    margin:0 auto;
}
.stat-card p {
    font-size: 16px;
    color: #3b4453;
    margin: 9px 0;
    font-weight: bold;
}
a {
    color: #42b883;
    text-decoration: none;
    font-weight: 600;
}
.page-nav { 
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  justify-content: center;
}
.page-nav a.router-link-exact-active {
    color: white;
    padding: 0 3px;
    border-radius: 3px;
    background-color: #2b7a57;
}
</style>