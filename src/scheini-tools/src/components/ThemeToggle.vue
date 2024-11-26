// src/components/ThemeToggle.vue
<template>
  <button
    class="h-10 w-10 rounded-md border flex items-center justify-center p-0"
    :class="darkMode ? 'bg-slate-800 text-white border-gray-700' : 'bg-white border-gray-300'"
    @click="toggleTheme"
  >
    <component 
      :is="darkMode ? SunIcon : MoonIcon" 
      class="w-6 h-6"
      :size="24"
    />
  </button>
</template>

<script>
import { SunIcon, MoonIcon } from 'lucide-vue-next'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from 'pinia'

export default {
  name: 'ThemeToggle',
  components: {
    SunIcon,
    MoonIcon
  },
  setup() {
    const themeStore = useThemeStore()
    const { darkMode } = storeToRefs(themeStore)
    
    return {
      darkMode,
      toggleTheme: themeStore.toggleTheme,
      SunIcon,
      MoonIcon
    }
  }
}
</script>