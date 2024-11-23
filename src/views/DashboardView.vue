<template>
  <div class="dashboard-view">
    <SideBar />
    <MainContent />
  </div>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue'
import MainContent from '@/components/MainContent.vue' // Adjust the import path as needed
</script>

<style scoped>
.dashboard-view {
  display: flex; /* Arrange children side-by-side */
  height: 100vh; /* Full height of the viewport */
  width: 100vw; /* Full width of the viewport */
  overflow: hidden; /* Prevent scrolling if needed */
}

.dashboard-view > :first-child {
  flex: 0 0 250px; /* SideBar takes a fixed width of 250px */
}

.dashboard-view > :last-child {
  flex: 1; /* MainContent takes the remaining space */
}
</style>
