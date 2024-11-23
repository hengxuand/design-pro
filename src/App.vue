<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { userSessionStore } from './stores/userSessionStore'
import { supabase } from './utils/supabase'

const userSession = userSessionStore()

supabase.auth.onAuthStateChange((event, session) => {
  console.log(`onAuthStateChange: ${event} UserSession: ${session?.user.id} isAuthenticated: ${userSession?.isAuthenticated}`)
  userSession.user = session?.user || null
})
</script>
