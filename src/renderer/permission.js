import router from './router'
import store from './store'

const whiteList = ['/Login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  let user =store.getters.user
  if (user && user.userInfo) {
    /* has token*/
    if (to.path == '/' || to.path == '') {
      next({path: '/Login'})
    } else if (to.path === '/Login') {
      next()
    } else {
      store.dispatch('permission/generateRoutes').then(() => { // 根据roles权限生成可访问的路由表
        // let addRoutes =  store.getters.addRouters;
        // for(let route of addRoutes){
        //   router.addRoute(route) // 动态添加可访问路由表
        // }

        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        let path = to.path
        if (false) {
          next({path: '/Login'})
        } else {
          next()
        }
      })
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/Login')
    }
  }
})

router.afterEach(() => {

})
