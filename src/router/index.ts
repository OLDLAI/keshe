import { useAlertStore } from '@/stores'
import { createRouter, createWebHashHistory } from 'vue-router'
import * as RoleType from '@/datasource/roleType'

//路由对象
const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL)
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/loginView.vue')
    },
    
    {
      name: 'welcome',
      path: '/welcome',
      component: () => import('@/views/welcome/welcomeView.vue')
    },
    {
      name: 'changeStuPassword',
      path: '/changeStuPassword',
      component: () => import('@/views/student/changePasswordView.vue'),
      meta: { role: RoleType.STUDENT }
    },
    
    {
      name: 'montorSelect',
      path: '/montorSelect',
      component: () => import('@/views/student/mentorSelectView.vue'),
      meta: { role: RoleType.STUDENT }
    },
    {
      name: 'montorSelected',
      path: '/montorSelected',
      component: () => import('@/views/student/mentorSelectedView.vue'),
      meta: { role: RoleType.STUDENT }
    },
    
    
  ]
})
//-路由对象

//前置守卫
router.beforeEach((to, from) => {
  // 排除，没有声明角色权限的路由
  if (!to.meta.role && !to.meta.roles) {
    return true
  }
  if (
    to.meta.roles &&
    Array.isArray(to.meta.roles) &&
    !to.meta.roles.includes(sessionStorage.getItem('role'))
  ) {
    // 调用函数获取pinia state数据，必须在pinia加载后执行
    const store = useAlertStore()
    store.exceptional = '无权限'
    // 支持返回路由对象
    // return { name: 'login-g' }
    return '/login'
  }
  if (to.meta.role && to.meta.role != sessionStorage.getItem('role')) {
    // 调用函数获取pinia state数据，必须在pinia加载后执行
    const store = useAlertStore()
    store.exceptional = '无权限'
    // 支持返回路由对象
    // return { name: 'login-g' }
    return '/login'
  }
  return true
})
//前置守卫

export default router
