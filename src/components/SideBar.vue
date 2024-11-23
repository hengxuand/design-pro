<script setup>
import { useRouter } from 'vue-router'
import { userSessionStore } from '@/stores/userSessionStore.js'
import { PATHS } from '@/constants/paths.js'

const router = useRouter()
const userSession = userSessionStore()

const handleLogout = async () => {
  try {
    await userSession.logout() // Make sure you have this action in your store
    await router.push(PATHS.LOGIN)
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <div>
    <div class="sidebar">
      <ul class="nav-list">
        <li class="nav-item active">Subscriber</li>
        <li class="nav-item">Quotes</li>
        <li class="nav-item">News</li>
        <li class="nav-item">Email</li>
        <li class="nav-item">Advisor</li>
      </ul>
    </div>
    <div class="sign-out-container">
      <button class="sign-out-btn">Sign Out</button>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #2b2b2b;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  padding: 15px 20px;
  cursor: pointer;
  font-size: 16px;
}

.nav-item:hover {
  background-color: #1f1f1f;
}

.nav-item.active {
  background-color: #4caf50;
  font-weight: bold;
}

.sign-out-container {
  display: flex;
  justify-content: flex-end; /* Align button to the right */
  padding: 10px 20px;
  background-color: #f9f9f9;
}

.sign-out-btn {
  background-color: #4caf50; /* Green color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.sign-out-btn:hover {
  background-color: #45a049; /* Slightly darker green */
  transform: scale(1.05); /* Button grows slightly on hover */
}

.sign-out-btn:active {
  background-color: #3e8e41; /* Even darker green for active state */
  transform: scale(0.95); /* Button shrinks slightly on click */
}

.sign-out-btn:focus {
  outline: 2px solid #4caf50; /* Optional focus outline for accessibility */
}
</style>
