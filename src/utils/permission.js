import router from '@/router/index'
import store from '@/store'

router.beforeEach((to, from, next) => {
  let address = store.state.user.addressDetail
  /*路由发生改变修改页面的title */
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (address.id) {
    next()
  } else {
    if (to.path == '/getAddressDetail') {
      next()
    } else {
      next({
        path: '/getAddressDetail'
      })
    }
  }

})