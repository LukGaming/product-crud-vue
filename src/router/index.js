import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import CreateProduct from '../components/CreateProduct.vue'
const routes = [
  {
    path: '/create-product',
    name: 'create-product',
    component: CreateProduct
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
