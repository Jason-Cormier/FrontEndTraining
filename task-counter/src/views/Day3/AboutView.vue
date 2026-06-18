<template>
    <div class="about-view">
        <h1>About</h1>
        <nav class="page-nav">
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/stats">Stats</RouterLink>
        </nav>
        <p>This is a task management app build with Vue 3.</p>
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
    color: white;
    margin-bottom: 16px;
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