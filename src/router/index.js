import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/Welcome'
import UserList from '@/views/UserList'
import Roles from '@/views/Roles'
import Rights from '@/views/Rights'
import Goods from '@/views/Goods'
import Categories from '@/views/Categories'
import GoodsAdd from '@/views/GoodsAdd'
import Params from '@/views/Params'
import Orders from '@/views/Orders'
import Reports from '@/views/Reports'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {path: '/', component: Welcome},
        {path: '/users', component: UserList},
        {path: '/roles', component: Roles},
        {path: '/rights', component: Rights},
        {path: '/goods', component: Goods},
        {path: '/categories', component: Categories},
        {path: '/goodsadd', component: GoodsAdd},
        {path: '/params', component: Params},
        {path: '/orders', component: Orders},
        {path: '/reports', component: Reports},
      ]
    }
  ]
})
