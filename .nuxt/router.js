import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1cb53f98 = () => interopDefault(import('../pages/insights.vue' /* webpackChunkName: "pages/insights" */))
const _03e094fc = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _7579d9f2 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _ed87c708 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _ddfe8e92 = () => interopDefault(import('../pages/projects.vue' /* webpackChunkName: "pages/projects" */))
const _1baadb40 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _70fde992 = () => interopDefault(import('../pages/reports.vue' /* webpackChunkName: "pages/reports" */))
const _523bf154 = () => interopDefault(import('../pages/tags.vue' /* webpackChunkName: "pages/tags" */))
const _3a38f1e5 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'button-active',
  scrollBehavior,

  routes: [{
    path: "/insights",
    component: _1cb53f98,
    name: "insights"
  }, {
    path: "/login",
    component: _03e094fc,
    name: "login"
  }, {
    path: "/logout",
    component: _7579d9f2,
    name: "logout"
  }, {
    path: "/profile",
    component: _ed87c708,
    name: "profile"
  }, {
    path: "/projects",
    component: _ddfe8e92,
    name: "projects"
  }, {
    path: "/register",
    component: _1baadb40,
    name: "register"
  }, {
    path: "/reports",
    component: _70fde992,
    name: "reports"
  }, {
    path: "/tags",
    component: _523bf154,
    name: "tags"
  }, {
    path: "/",
    component: _3a38f1e5,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
