import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import CreateOrder from '@/views/CreateOrder.vue'
import PayOrder from '@/views/PayOrder.vue'
import QueryResult from '@/views/QueryResult.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'CreateOrder',
    component: CreateOrder
  },
  {
    path: '/pay/:orderId',
    name: 'PayOrder',
    component: PayOrder
  },
  {
    path: '/query',
    name: 'QueryResult',
    component: QueryResult
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router