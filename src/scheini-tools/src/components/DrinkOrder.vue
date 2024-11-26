// src/components/DrinkOrder.vue
<template>
  <div class="min-h-screen transition-colors" :class="darkMode ? 'bg-slate-900' : 'bg-gray-100'">
    <!-- Navigation Bar für Buttons -->
    <div class="fixed top-0 left-0 right-0 h-16 z-10 transition-colors" :class="darkMode ? 'bg-slate-900' : 'bg-gray-100'">
      <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <BackButton :class="darkMode ? '!bg-gray-800 !text-white hover:!bg-gray-700' : '!bg-white !text-gray-800 hover:!bg-gray-100'" />
      </div>
    </div>
    
    <!-- Container für den gesamten Content -->
    <div class="w-full min-h-screen flex flex-col pt-20">
      <!-- Hauptbereich mit max-width und zentriert -->
      <div class="flex-grow w-full max-w-7xl mx-auto px-2 pb-20">
        <!-- Grid für die Getränkekarten -->
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <div
            v-for="(data, name) in drinks"
            :key="name"
            class="rounded-lg cursor-pointer hover:shadow-md transition-all"
            :class="darkMode ? 'text-white' : 'text-black'"
            :style="{
              backgroundColor: darkMode
                ? data.count > 0
                  ? '#1e3a8a'
                  : '#1e293b'
                : data.count > 0
                ? '#e6f3ff'
                : 'white'
            }"
            @click="incrementDrink(name)"
          >
            <div class="p-2 h-20 relative flex flex-col">
              <div class="mt-2 mb-1 text-center">
                <div class="font-bold" :class="getTextClass(name)">
                  {{ name }}
                </div>
              </div>
              <div class="text-center font-mono text-sm">
                {{ data.price.toFixed(2) }} €
              </div>
              <div
                v-if="data.count > 0"
                class="absolute -top-2 -right-2 h-5 w-5 rounded-full flex items-center justify-center bg-black text-white text-xs"
              >
                {{ data.count }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer mit voller Breite -->
      <div
        class="fixed bottom-0 left-0 right-0 w-full shadow-lg transition-colors"
        :class="darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'"
      >
        <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div class="text-xl font-mono">
            {{ total.toFixed(2) }} €
          </div>
          <button
            @click="resetOrder"
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            ZURÜCKSETZEN
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import BackButton from './BackButton.vue'
import ThemeToggle from './ThemeToggle.vue'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from 'pinia'

const defaultDrinks = {
  "WEIN": { price: 4.50, count: 0 },
  "BIER": { price: 3.50, count: 0 },
  "LONG DRINK": { price: 6.50, count: 0 },
  "JEVER FUN": { price: 3.00, count: 0 },
  "WEIZEN": { price: 4.50, count: 0 },
  "HEFE ALKOHOLFREI": { price: 4.00, count: 0 },
  "COLA, SCHWEPPES, SAFTSCHORLE": { price: 3.00, count: 0 },
  "BIONADE": { price: 3.50, count: 0 },
  "WASSER": { price: 2.50, count: 0 },
  "KAFFEE": { price: 3.00, count: 0 },
  "SEKT, WEINSCHORLE": { price: 4.00, count: 0 },
  "ALSTER": { price: 4.50, count: 0 }
}

export default {
  name: 'DrinkOrder',
  components: {
    BackButton,
    ThemeToggle
  },
  setup() {
    const drinks = ref(defaultDrinks)
    const themeStore = useThemeStore()
    const { darkMode } = storeToRefs(themeStore)

    const total = computed(() => {
      return Object.values(drinks.value).reduce(
        (sum, drink) => sum + (drink.price * drink.count),
        0
      )
    })

    const getTextClass = (text) => {
      const length = text.length
      if (length > 25) return 'text-xs'
      if (length > 15) return 'text-xs'
      return 'text-sm'
    }

    const incrementDrink = (drinkName) => {
      drinks.value[drinkName].count++
    }

    const resetOrder = () => {
      Object.keys(drinks.value).forEach(drink => {
        drinks.value[drink].count = 0
      })
    }

    return {
      drinks,
      darkMode,
      total,
      getTextClass,
      incrementDrink,
      resetOrder
    }
  }
}
</script>