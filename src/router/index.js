import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 防止点击重复路由报错
const routerPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index'),
    meta: {
      keepAlive: true,
      tabBar: true
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my/index'),
    meta: {
      keepAlive: true,
      tabBar: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index'),
    meta: {
      keepAlive: true,
      tabBar: true
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/order/index'),
    meta: {
      keepAlive: false,
      tabBar: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/my/infoDetail'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/address',
    name: 'address',
    component: () => import('@/views/address/index'),
    meta: {
      keepAlive: false,
      tabBar: false
    }
  },
  {
    path: '/addressAdd',
    name: 'addressAdd',
    component: () => import('@/views/address/addressAdd'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/getAddressDetail',
    name: 'getAddressDetail',
    component: () => import('@/views/address/getAddressDetail'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/balanceDetail',
    name: 'balanceDetail',
    component: () => import('@/views/my/balanceDetail'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/giftDetail',
    name: 'giftDetail',
    component: () => import('@/views/my/giftDetail'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/disGiftDetail',
    name: 'disGiftDetail',
    component: () => import('@/views/my/disGiftDetail'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/giftExchange',
    name: 'giftExchange',
    component: () => import('@/views/my/giftExchange'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/integralDetail',
    name: 'integralDetail',
    component: () => import('@/views/my/integralDetail'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/restaurantDetail',
    name: 'restaurantDetail',
    component: () => import('@/views/restaurant/restaurantDetail'),
    meta: {
      keepAlive: false,
      tabBar: false
    }
  },
  {
    path: '/orderComfirm',
    name: 'orderComfirm',
    component: () => import('@/views/order/comfirmOrder'),
    meta: {
      keepAlive: false,
      tabBar: false
    }
  },
  {
    path: '/writeMark',
    name: 'writeMark',
    component: () => import('@/views/order/writeMark'),
    meta: {
      keepAlive: false,
      tabBar: false
    }
  },
  {
    path: '/selectAddress',
    name: 'selectAddress',
    component: () => import('@/views/order/selectAddress'),
    meta: {
      keepAlive: false,
      tabBar: false
    }
  },
  {
    path: '/payMent',
    name: 'payMent',
    component: () => import('@/views/order/payMent'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/restaurantCategory',
    name: 'restaurantCategory',
    component: () => import('@/views/restaurant/restaurantCategory'),
    meta: {
      keepAlive: false,
      tabBar: false
    }
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import('@/views/order/orderDetail'),
    meta: {
      keepAlive: false,
      tabBar: false
    }
  },
  {
    path: '/restaurantInfo',
    name: 'restaurantInfo',
    component: () => import('@/views/restaurant/restaurantInfo'),
    meta: {
      keepAlive: false,
      tabBar: false
    }
  },
  {
    path: '/vip',
    name: 'vip',
    component: () => import('@/views/vip/index'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  },
  {
    path: '/service',
    name: 'service',
    component: () => import('@/views/service/index'),
    meta: {
      keepAlive: true,
      tabBar: false
    }
  }
]

const router = new VueRouter({
  routes
})

export default router