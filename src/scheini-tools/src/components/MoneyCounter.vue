<!-- src/components/MoneyCounter.vue -->
<template>
  <div class="min-h-screen bg-gray-900 p-4">
    <BackButton class="!bg-gray-800 !text-white hover:!bg-gray-700" />
    <div class="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-xl p-8 mt-16">
      <h1 class="text-2xl font-bold text-center mb-8 text-white">Geld Zähler</h1>
      
      <div class="grid gap-6">
        <!-- Scheine -->
        <div>
          <h2 class="text-lg font-semibold mb-4 text-gray-200">Scheine</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="value in bills" :key="value" class="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <label class="text-lg font-medium text-gray-200">{{ value }}€</label>
              <input
                type="number"
                v-model.number="counts[value]"
                min="0"
                class="w-24 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              >
            </div>
          </div>
        </div>

        <!-- Münzen -->
        <div>
          <h2 class="text-lg font-semibold mb-4 text-gray-200">Münzen</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="value in coins" :key="value" class="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <label class="text-lg font-medium text-gray-200">
                {{ value >= 1 ? value + '€' : (value * 100) + 'Cent' }}
              </label>
              <input
                type="number"
                v-model.number="counts[value]"
                min="0"
                class="w-24 px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
              >
            </div>
          </div>
        </div>
        
        <!-- Gesamt -->
        <div class="mt-8 space-y-4">
          <div class="text-2xl font-bold text-center p-4 bg-gray-700 text-white rounded-lg">
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
</template>

<script>
import BackButton from './BackButton.vue'

export default {
  name: 'MoneyCounter',
  components: {
    BackButton
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