// src/views/HomeView.vue
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-12" :class="darkMode ? 'text-white' : 'text-gray-900'">
      Meine Tools
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link 
        v-for="tool in tools" 
        :key="tool.path"
        :to="tool.path"
        class="group"
      >
        <div class="h-48 rounded-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl border"
             :class="darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'">
          <div>
            <h2 class="text-2xl font-bold mb-2 text-blue-400 group-hover:text-blue-300">
              {{ tool.name }}
            </h2>
            <p :class="darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'">
              {{ tool.description }}
            </p>
          </div>
          
          <div class="flex justify-between items-center">
            <span class="text-blue-400 group-hover:text-blue-300">Öffnen →</span>
            <div class="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <component 
                :is="tool.iconComponent" 
                class="w-5 h-5 text-blue-400"
              />
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { EuroIcon, CalculatorIcon, BeerIcon } from 'lucide-vue-next'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from 'pinia'

export default {
  name: 'HomeView',
  components: {
    EuroIcon,
    CalculatorIcon,
    BeerIcon
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
      tools: [
        {
          name: 'Geld Zähler',
          description: 'Zähle Münzen und Scheine einfach und schnell',
          path: '/money-counter',
          iconComponent: 'EuroIcon'
        },
        {
          name: 'Getränke Bestellung',
          description: 'Verwalte und berechne Getränkebestellungen',
          path: '/drink-order',
          iconComponent: 'BeerIcon'
        },
        {
          name: 'Tool 3',
          description: 'Beschreibung für Tool 3',
          path: '/tool3',
          iconComponent: 'CalculatorIcon'
        }
      ]
    }
  }
}
</script>