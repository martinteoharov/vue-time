export { default as Button } from '../../components/Button.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as Sidebar } from '../../components/Sidebar.vue'
export { default as Tracker } from '../../components/Tracker.vue'

export const LazyButton = import('../../components/Button.vue' /* webpackChunkName: "components/button" */).then(c => c.default || c)
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
export const LazySidebar = import('../../components/Sidebar.vue' /* webpackChunkName: "components/sidebar" */).then(c => c.default || c)
export const LazyTracker = import('../../components/Tracker.vue' /* webpackChunkName: "components/tracker" */).then(c => c.default || c)
