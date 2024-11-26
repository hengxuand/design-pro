<template>
  <div class="main-content">
    <RouterView :key="$route.fullPath"/>
  </div>
</template>

<style scoped>
.main-content {
  flex: 1;
  padding: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin: 0 0 10px;
  font-size: 20px;
}

.card p {
  margin: 5px 0;
  font-size: 14px;
  color: #555;
}
</style>
