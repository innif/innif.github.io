<!-- src/components/DrinkOrder.vue -->
<template>
  <div class="min-h-screen" :class="darkMode ? 'bg-slate-900' : 'bg-gray-100'">
    <BackButton class="!bg-gray-800 !text-white hover:!bg-gray-700" />
    
    <!-- Container für den gesamten Content -->
    <div class="w-full min-h-screen flex flex-col">
      <!-- Hauptbereich mit max-width und zentriert -->
      <div class="flex-grow w-full max-w-6xl mx-auto px-4 pb-20">
        <!-- Dark Mode Toggle -->
        <div class="flex justify-end py-4">
          <button
            class="h-10 w-10 rounded-md border flex items-center justify-center"
            :class="darkMode ? 'bg-slate-800 text-white' : 'bg-white'"
            @click="toggleDarkMode"
          >
            <SunIcon v-if="darkMode" class="h-4 w-4" />
            <MoonIcon v-else class="h-4 w-4" />
          </button>
        </div>

        <!-- Grid für die Getränkekarten -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="(data, name) in drinks"
            :key="name"
            class="rounded-xl cursor-pointer hover:shadow-md transition-all"
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
            <div class="p-3 h-24 relative flex flex-col">
              <div class="mt-4 mb-1 text-center">
                <div class="font-bold" :class="getTextClass(name)">
                  {{ name }}
                </div>
              </div>
              <div class="text-center font-mono">
                {{ data.price.toFixed(2) }} €
              </div>
              <div
                v-if="data.count > 0"
                class="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center bg-black text-white"
              >
                {{ data.count }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer mit voller Breite -->
      <div
        class="fixed bottom-0 left-0 right-0 w-full shadow-lg"
        :class="darkMode ? 'bg-slate-800 text-white' : 'bg-white'"
      >
        <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
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
import { SunIcon, MoonIcon } from 'lucide-vue-next'
import BackButton from './BackButton.vue'

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
    SunIcon,
    MoonIcon
  },
  setup() {
    const drinks = ref(defaultDrinks)
    const darkMode = ref(false)

    const total = computed(() => {
      return Object.values(drinks.value).reduce(
        (sum, drink) => sum + (drink.price * drink.count),
        0
      )
    })

    const getTextClass = (text) => {
      const length = text.length
      if (length > 25) return 'text-xs'
      if (length > 15) return 'text-sm'
      return 'text-base'
    }

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value
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
      toggleDarkMode,
      incrementDrink,
      resetOrder
    }
  }
}
</script>