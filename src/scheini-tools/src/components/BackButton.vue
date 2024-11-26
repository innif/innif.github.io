<!-- src/components/BackButton.vue -->
<template>
  <router-link 
    to="/" 
    class="absolute top-4 left-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
  >
    <span class="mr-2">←</span>
    Zurück
  </router-link>
</template>

<script>
export default {
  name: 'BackButton'
}
</script>