import { createRouter, createWebHistory } from 'vue-router';
import Goods from '../views/Goods.vue';
import Seller from '../views/Seller.vue';
import Ratings from '../views/Ratings.vue';
import GoodDetail from '../views//GoodDetail.vue'

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Goods,
  },
  {
    path: '/ratings',
    name: 'Ratings',
    component: Ratings
  },
  {
    path: '/seller',
    name: 'Seller',
    component: Seller
  },
  {
    path: '/gooddetail/:id',
    name: 'GoodDetail',
    component: GoodDetail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active"
})

export default router
