<template>
  <div class="dashboard-view">
    <SideBar/>
    <MainCanvas/>
  </div>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue'
import MainCanvas from '@/components/MainContent.vue'  // Adjust the import path as needed

</script>

<style scoped>
.dashboard-view {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}
</style>
