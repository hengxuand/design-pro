import { defineStore } from 'pinia'
import { supabase } from '../utils/supabase'

export const userSessionStore = defineStore({
  id: 'userSession',
  state: () => ({
    user: null,
    loading: false,
    error: null,
    isInitializing: true
  }),

  actions: {
    async initializeAuth() {
      this.isInitializing = true
      try {
        // Check initial auth state with Supabase
        const { data: { session } } = await supabase.auth.getSession()
        this.user = session?.user || null
      } finally {
        this.isInitializing = false
      }
    },
    async signIn(email, password) {
      try {
        this.loading = true
        this.error = null

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        this.user = data.user
        return data
      } catch (error) {
        this.error = error.message
        return { error }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.user = null
      } catch (error) {
        this.error = error.message
      }
    },
  },

  getters: {
    isAuthenticated: (state) => {
      return !!state.user;
    },
  },
})
