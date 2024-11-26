// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MoneyCounter from '../components/MoneyCounter.vue'
import DrinkOrder from '../components/DrinkOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    }
  ]
})

export default router