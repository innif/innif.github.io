// src/components/Timer.vue
<template>
  <div class="min-h-screen bg-black" @click="showControls">
    <!-- Navigation Bar -->
    <div class="fixed top-0 left-0 right-0 h-16 z-10 bg-black">
      <div class="max-w-7xl mx-auto flex items-center justify-between h-full px-4">
        <BackButton class="!bg-gray-800 !text-white hover:!bg-gray-700" />
      </div>
    </div>

    <div class="timer-container" :class="{ 
      'timer-warning': timeLeft <= 30 && timeLeft >= 0, 
      'timer-overtime blink': timeLeft < 0
    }">
      <!-- Settings Container -->
      <div v-if="!isRunning" 
           class="time-settings"
           :class="{ 'fade-out': !showUI, 'fade-in': showUI }">
        <div class="settings-group">
          <label>Minuten:</label>
          <input 
            type="number" 
            v-model="minutes" 
            min="0" 
            max="999"
            @change="updateTimer"
          >
        </div>
        <div class="settings-group">
          <label>Sekunden:</label>
          <input 
            type="number" 
            v-model="seconds" 
            min="0" 
            max="59"
            @change="updateTimer"
          >
        </div>
      </div>
      
      <!-- Time Display -->
      <div class="time-display">
        <div class="time" :style="dynamicFontSize">
          <span v-if="timeLeft < 0">-</span>{{ formatTime(Math.abs(timeLeft)) }}
        </div>
      </div>
      
      <!-- Controls Container -->
      <div class="controls" :class="{ 'fade-out': !showUI, 'fade-in': showUI }">
        <button @click.stop="startTimer" :disabled="isRunning">Start</button>
        <button @click.stop="pauseTimer" :disabled="!isRunning">Pause</button>
        <button @click.stop="resetTimer">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import BackButton from './BackButton.vue'

export default {
  name: 'Timer',
  components: {
    BackButton
  },
  data() {
    return {
      timeLeft: 420,
      isRunning: false,
      timerId: null,
      minutes: 7,
      seconds: 0,
      containerWidth: 0,
      containerHeight: 0,
      initialTime: 420,
      showUI: false,
      hideTimeout: null
    }
  },
  mounted() {
    this.updateContainerSize()
    window.addEventListener('resize', this.updateContainerSize)
  },
  beforeDestroy() {
    if (this.timerId) clearInterval(this.timerId)
    if (this.hideTimeout) clearTimeout(this.hideTimeout)
    window.removeEventListener('resize', this.updateContainerSize)
  },
  computed: {
    dynamicFontSize() {
      const displayString = this.formatTime(Math.abs(this.timeLeft))
      const extraChar = this.timeLeft < 0 ? 1 : 0
      
      // Größere Schrift da nun mehr Platz verfügbar ist
      const fontSize = Math.min(
        this.containerWidth / ((displayString.length + extraChar) * 0.6),
        this.containerHeight * 0.8 // Erhöht auf 80% der Containerhöhe
      )
      
      return {
        fontSize: `${fontSize}px`,
        lineHeight: '1.1'
      }
    }
  },
  methods: {
    showControls() {
      // Zeige UI-Elemente
      this.showUI = true
      
      // Setze einen bestehenden Timer zurück
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout)
      }
      
      // Starte einen neuen Timer zum Ausblenden
      this.hideTimeout = setTimeout(() => {
        this.showUI = false
      }, 3000) // UI wird nach 3 Sekunden ausgeblendet
    },
    updateContainerSize() {
      this.containerWidth = window.innerWidth * 0.95  // Erhöht auf 95%
      this.containerHeight = window.innerHeight * 0.95 // Erhöht auf 95%
    },
    startTimer() {
      if (!this.isRunning) {
        this.isRunning = true
        this.timerId = setInterval(() => {
          this.timeLeft--
        }, 1000)
      }
    },
    pauseTimer() {
      this.isRunning = false
      clearInterval(this.timerId)
    },
    resetTimer() {
      this.pauseTimer()
      this.updateTimer()
    },
    updateTimer() {
      this.minutes = Math.min(Math.max(parseInt(this.minutes) || 0, 0), 999)
      this.seconds = Math.min(Math.max(parseInt(this.seconds) || 0, 0), 59)
      this.timeLeft = (this.minutes * 60) + this.seconds
      this.initialTime = this.timeLeft
    },
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
.timer-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.5s;
}

@keyframes blink {
  0% { background-color: #661111; }
  50% { background-color: #000; }
  100% { background-color: #661111; }
}

.blink {
  animation: blink 1s infinite;
}

.timer-warning {
  background-color: #852222;
}

.timer-overtime {
  background-color: #661111;
}

/* Time Display Container */
.time-display {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.time {
  color: white;
  font-family: monospace;
  text-align: center;
  width: 100%;
}

/* Fade Animations */
.fade-in {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

.fade-out {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
}

/* Controls Container */
.controls {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

button {
  padding: 0.75rem 1.5rem;
  font-size: max(1rem, min(2vw, 1.5rem));
  border: none;
  border-radius: 0.5rem;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 80px;
}

button:hover:not(:disabled) {
  background-color: #444;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Settings Container */
.time-settings {
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.settings-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

label {
  color: white;
  font-size: max(0.875rem, min(1.5vw, 1.25rem));
}

input {
  width: 5em;
  padding: 0.5rem;
  font-size: max(0.875rem, min(1.5vw, 1.25rem));
  text-align: center;
  background-color: #333;
  color: white;
  border: 1px solid #666;
  border-radius: 0.5rem;
}

input:focus {
  outline: none;
  border-color: #888;
}

@media (orientation: landscape) {
  .time-settings {
    flex-direction: row;
  }
}

@media (orientation: portrait) {
  .time-settings {
    flex-direction: column;
  }
}
</style>