// src/App.vue
<template>
  <div class="min-h-screen transition-colors" :class="darkMode ? 'bg-gray-900' : 'bg-gray-100'">
    <!-- Globaler Theme Toggle -->
    <div class="fixed top-4 right-4 z-50">
      <ThemeToggle />
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
import { useThemeStore } from './stores/theme'
import { storeToRefs } from 'pinia'
import ThemeToggle from './components/ThemeToggle.vue'

export default {
  name: 'App',
  components: {
    ThemeToggle
  },
  setup() {
    const themeStore = useThemeStore()
    const { darkMode } = storeToRefs(themeStore)
    
    return {
      darkMode
    }
  }
}
</script>