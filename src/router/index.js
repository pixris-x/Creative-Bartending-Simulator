import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CocktailCreator from '../views/CocktailCreator.vue'
import MyCreations from '../views/MyCreations.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      name: 'create',
      component: CocktailCreator
    },
    {
      path: '/my-creations',
      name: 'myCreations',
      component: MyCreations
    }
  ]
})