<script setup>
import { ref } from 'vue'
import { userSessionStore } from '@/stores/userSessionStore'
import { useRouter } from 'vue-router'
import { PATHS } from '@/constants/paths.js'

const router = useRouter()
const userSession = userSessionStore()

const email = ref('')
const password = ref('')
let showPassword = ref(false)

const signIn = async () => {
  const { error } = await userSession.signIn(email.value, password.value)
  if (!error) {
    await router.push(PATHS.DASHBOARD)
  }
}

</script>

<template>
  <div class="login-page">
    <h1>Welcome to DesignPro</h1>

    <div class="login-form">
      <input class="email-input" type="email" placeholder="Email" v-model="email" />

      <div class="password-container">
        <input
          class="password-input"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Password"
          v-model="password"
        />
        <span @click="showPassword = !showPassword" class="password-toggle">
          {{ showPassword ? 'Hide' : 'Show' }}
        </span>
      </div>
      <button class="login-btn" @click="signIn">Sign in</button>
      <!-- <div>
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
  height: 200px;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid lightgray;
  justify-content: center;
}

.email-input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
}

.password-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.password-input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  flex: 1;
}
.password-toggle {
  cursor: pointer;
  color: black;
  position: absolute;
  right: 10px;
  font-weight: bold;
}
.login-btn {
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
