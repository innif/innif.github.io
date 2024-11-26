// src/components/FullscreenClock.vue
<template>
  <div class="min-h-screen flex items-center justify-center transition-colors relative" 
       :class="darkMode ? 'bg-gray-900' : 'bg-gray-100'">
    <!-- Navigation Bar -->
    <div class="fixed top-0 left-0 right-0 h-16 z-10 transition-colors" 
         :class="darkMode ? 'bg-gray-900' : 'bg-gray-100'">
      <div class="max-w-7xl mx-auto flex items-center h-full px-4">
        <BackButton :class="darkMode ? '!bg-gray-800 !text-white hover:!bg-gray-700' : '!bg-white !text-gray-800 hover:!bg-gray-100'" />
      </div>
    </div>

    <!-- Clock Display -->
    <div class="text-[25vw] font-mono font-bold" 
         :class="darkMode ? 'text-white' : 'text-gray-900'">
      {{ currentTime }}
    </div>
  </div>
</template>

<script>
import BackButton from './BackButton.vue'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'FullscreenClock',
  components: {
    BackButton
  },
  setup() {
    const themeStore = useThemeStore()
    const { darkMode } = storeToRefs(themeStore)
    
    const currentTime = ref('')
    let intervalId = null

    const updateTime = () => {
      const now = new Date()
      currentTime.value = now.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }

    onMounted(() => {
      updateTime()
      intervalId = setInterval(updateTime, 1000)
    })

    onUnmounted(() => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    })

    return {
      darkMode,
      currentTime
    }
  }
}
</script>