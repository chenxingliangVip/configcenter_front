import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


import page from './page' //登录后访问的页面
import LeftMenuData from '@/components/LeftMenu/LeftMenuData' //左侧菜单数据

export let getRoutePages = () => {//根据左侧菜单数据和登录状态 获取路由
  let childrenRoute = [];//登陆后能访问的子路由
  childrenRoute = getRouteData(LeftMenuData);//获取菜单的路由信息
  return {
    path: '/',
    redirect: '/Login',
    name: 'MainPage',
    component: () => import("@/page/MainPage"),
    children: childrenRoute
  }
}

//实例化路由
export default new Router({
  routes: [
    getRoutePages(), //登录登录状态，动态根据菜单数据生成可访问路由
    {
      path: '/Login',
      name: 'Login',
      component: () => import("@/page/Login")
    }, {
      path: '/*',
      name: '404',
      component: () => import("@/page/notFound")
    }
  ],
  scrollBehavior: () => ({ y: 0 }),
})
function getRouteData(menuData, routeData) {//获取菜单 的路由信息
  routeData = routeData ? routeData : [];
  for (let i = 0; i < menuData.length; i++) {
    if (menuData[i].children) {//如果存在子
      getRouteData(menuData[i].children, routeData);
    } else {
      if (menuData[i].name) {//存在路由名称
        for (let j = 0; j < page.length; j++) {
          if (page[j].name == menuData[i].name) {//找到路由添加进去
            routeData.push(page[j]);
            break;
          }
        }
      }
    }
  }
  return routeData;
}
