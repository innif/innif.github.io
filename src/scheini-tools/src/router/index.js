// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoneyCounter from '../components/MoneyCounter.vue'
import DrinkOrder from '../components/DrinkOrder.vue'
import FullscreenClock from '../components/FullscreenClock.vue'
import TimerView from '../components/Timer.vue'

const router = createRouter({
  history: createWebHistory('/scheini-tools/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/money-counter',
      name: 'money-counter',
      component: MoneyCounter
    },
    {
      path: '/drink-order',
      name: 'drink-order',
      component: DrinkOrder
    },
    {
      path: '/clock',
      name: 'clock',
      component: FullscreenClock
    },
    {
      path: '/timer',
      name: 'timer',
      component: TimerView
    }
  ]
})

export default router