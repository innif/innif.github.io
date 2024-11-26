// src/components/MoneyCounter.vue
<template>
  <div class="min-h-screen transition-colors" :class="darkMode ? 'bg-gray-900' : 'bg-gray-100'">
    <!-- Navigation Bar -->
    <div class="fixed top-0 left-0 right-0 h-16 z-10 transition-colors px-4" :class="darkMode ? 'bg-gray-900' : 'bg-gray-100'">
      <div class="max-w-7xl mx-auto flex items-center justify-between h-full">
        <BackButton :class="darkMode ? '!bg-gray-800 !text-white hover:!bg-gray-700' : '!bg-white !text-gray-800 hover:!bg-gray-100'" />
      </div>
    </div>

    <div class="pt-16 px-4">
      <div class="max-w-2xl mx-auto rounded-lg shadow-xl p-8 transition-colors"
           :class="darkMode ? 'bg-gray-800' : 'bg-white'">
        <h1 class="text-2xl font-bold mb-8" :class="darkMode ? 'text-white' : 'text-gray-900'">
          Geld Zähler
        </h1>
        
        <div class="grid gap-6">
          <!-- Scheine -->
          <div>
            <h2 class="text-lg font-semibold mb-4" :class="darkMode ? 'text-gray-200' : 'text-gray-700'">
              Scheine
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="value in bills" :key="value" 
                   class="flex items-center justify-between p-3 rounded-lg transition-colors"
                   :class="darkMode ? 'bg-gray-700' : 'bg-gray-100'">
                <label class="text-lg font-medium" :class="darkMode ? 'text-gray-200' : 'text-gray-700'">
                  {{ value }}€
                </label>
                <input
                  type="number"
                  v-model.number="counts[value]"
                  min="0"
                  class="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right transition-colors"
                  :class="darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'"
                >
              </div>
            </div>
          </div>

          <!-- Münzen -->
          <div>
            <h2 class="text-lg font-semibold mb-4" :class="darkMode ? 'text-gray-200' : 'text-gray-700'">
              Münzen
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="value in coins" :key="value" 
                   class="flex items-center justify-between p-3 rounded-lg transition-colors"
                   :class="darkMode ? 'bg-gray-700' : 'bg-gray-100'">
                <label class="text-lg font-medium" :class="darkMode ? 'text-gray-200' : 'text-gray-700'">
                  {{ value >= 1 ? value + '€' : (value * 100) + 'Cent' }}
                </label>
                <input
                  type="number"
                  v-model.number="counts[value]"
                  min="0"
                  class="w-24 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right transition-colors"
                  :class="darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'"
                >
              </div>
            </div>
          </div>
          
          <!-- Gesamt -->
          <div class="mt-8 space-y-4">
            <div class="text-2xl font-bold text-center p-4 rounded-lg transition-colors"
                 :class="darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'">
              Gesamt: {{ calculateTotal() }}€
            </div>
            <button 
              @click="resetCounts"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Zurücksetzen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from './BackButton.vue'
import ThemeToggle from './ThemeToggle.vue'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from 'pinia'

export default {
  name: 'MoneyCounter',
  components: {
    BackButton,
    ThemeToggle
  },
  setup() {
    const themeStore = useThemeStore()
    const { darkMode } = storeToRefs(themeStore)
    
    return {
      darkMode
    }
  },
  data() {
    return {
      bills: [500, 200, 100, 50, 20, 10, 5],
      coins: [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01],
      counts: {
        '500': 0, '200': 0, '100': 0, '50': 0, '20': 0, '10': 0, '5': 0,
        '2': 0, '1': 0, '0.5': 0, '0.2': 0, '0.1': 0, '0.05': 0, '0.02': 0, '0.01': 0
      }
    }
  },
  methods: {
    calculateTotal() {
      const total = Object.entries(this.counts).reduce((sum, [value, count]) => {
        return sum + (parseFloat(value) * (count || 0))
      }, 0);
      return total.toFixed(2);
    },
    resetCounts() {
      Object.keys(this.counts).forEach(key => {
        this.counts[key] = 0
      })
    }
  }
}
</script>