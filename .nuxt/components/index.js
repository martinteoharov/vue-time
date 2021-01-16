export { default as Button } from '../../components/Button.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as Sidebar } from '../../components/Sidebar.vue'
export { default as Timer } from '../../components/Timer.vue'
export { default as Tracker } from '../../components/Tracker.vue'
export { default as TrackerEntry } from '../../components/TrackerEntry.vue'

export const LazyButton = import('../../components/Button.vue' /* webpackChunkName: "components/button" */).then(c => c.default || c)
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
export const LazySidebar = import('../../components/Sidebar.vue' /* webpackChunkName: "components/sidebar" */).then(c => c.default || c)
export const LazyTimer = import('../../components/Timer.vue' /* webpackChunkName: "components/timer" */).then(c => c.default || c)
export const LazyTracker = import('../../components/Tracker.vue' /* webpackChunkName: "components/tracker" */).then(c => c.default || c)
export const LazyTrackerEntry = import('../../components/TrackerEntry.vue' /* webpackChunkName: "components/tracker-entry" */).then(c => c.default || c)
