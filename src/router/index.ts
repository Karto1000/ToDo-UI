import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import TodoList from '../views/TodoList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todo',
      component: TodoList
    }
  ]
})

export default router
