<template>
    <div class="about-view">
        <h1>About</h1>
        <p>This is a task management app build with Vue 3.</p>
        <RouterLink to="/home">Back to Tasks</RouterLink>
    </div>
</template>

<style scoped>
    .about-view {
        max-width: 520px;
        margin: 40px auto;
        padding: 24px;
        font-family: Arial, sans-serif;
    }
    h1 {
        color: #1b2a4a;
        margin-bottom: 16px;
    }
    a {
        color: #42b883;
        text-decoration: none;
        font-weight: 600;
    }
</style>