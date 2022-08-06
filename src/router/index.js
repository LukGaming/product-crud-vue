import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import CreateProduct from '../components/CreateProduct.vue'
import CreateCategory from '../components/CreateCategory.vue'
const routes = [
  {
    path: '/product/create',
    name: 'create-product',
    component: CreateProduct
  },
  {
    path: '/category/create',
    name: 'create-category',
    component: CreateCategory
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
