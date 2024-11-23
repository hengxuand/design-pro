<script setup>
import { useRouter } from 'vue-router'
import { userSessionStore } from '@/stores/userSessionStore.js'
import { PATHS } from '@/constants/paths.js'

const router = useRouter()
const userSession = userSessionStore()

const handleLogout = async () => {
  try {
    console.log('logout')
    await userSession.logout() // Make sure you have this action in your store
    await router.push(PATHS.LOGIN)
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <div class="sidebar">
    <div class="top-section">
      <div class="logo">
        <img src="../assets/logo.jpg" height="80" width="128" />
      </div>
      <div>
        <ul class="nav-list">
          <li class="nav-item active">Quote</li>
          <li class="nav-item">Submit a request</li>
          <li class="nav-item">My Sample</li>
        </ul>
      </div>
    </div>
    <div class="sign-out-container">
      <button class="sign-out-btn" @click="handleLogout">Sign Out</button>
    </div>
  </div>
</template>
<style scoped>
.sidebar {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between; /* Push sign out button to bottom */
  background-color: var(--color-warm-beige); /* Sidebar tone */
  padding: 1rem;
}

.top-section {
  display: flex;
  flex-direction: column;
}

.logo {
  width: 100%;
  display: flex;
  justify-content: center;
  color: var(--color-text-main); /* Main text color for logo */
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  padding: 10px 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 10px;
  margin: 10px;
  color: var(--color-text-secondary); /* Main text color for readability */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.nav-item:hover {
  background-color: var(--color-light-sand); /* Soft card section */
}

.nav-item.active {
  background-color: var(--color-accent); /* High contrast for active state */
  font-weight: bold;
  color: --color-text-main; /* White text to contrast with black background */
}

.sign-out-container {
  display: flex;
  justify-content: center; /* Center sign-out button */
  padding: 10px 20px;
  margin: 20px 0;
}

.sign-out-btn {
  background-color: var(--color-border-light); /* Light gray tone to make it distinct */
  color: var(--color-text-main); /* Main text color for readability */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s; /* Smooth transition for hover effects */
}

.sign-out-btn:hover {
  background-color: var(--color-accent-hover); /* Highlight color on hover for emphasis */
  transform: scale(1.05); /* Slightly larger on hover */
}

.sign-out-btn:active {
  transform: scale(0.95); /* Button shrinks slightly on click */
}
</style>
