import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import * as userActions from '@/store/user/action'
import { processRouterQueryToUrl } from '@/utils'
import Bounce from '@/components/Bounce'
import Routes from './path'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: "/boss2/",
  routes: []
})

router.beforeEach((to, from, next) => {
  const isToLogin = !!~to.path.indexOf('login')
  const redirectUri = isToLogin ? '' : `/boss2${processRouterQueryToUrl(to)}`

  if (!to.meta.loginCheck) {
    next()
    return
  }

  if (!to.meta.permissionCheck) {
    next()
    return
  }

  store.dispatch(userActions.CHECK_PERMISSION, {
    path: to.path.startsWith('/crm') ? to.path : `/boss${to.path}`,
    next,
    redirectUri
  })
})

router.beforeResolve((to, from, next) => {
  Bounce.hide()
  next()
})

router.afterEach((to, from) => {
  if (to.meta.loginCheck) {
    store.dispatch(userActions.USER_PROFILE)
  }
})

export default router
