export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'time-tracker',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css'},
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'}
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: '~/plugins/vuex-persist', ssr: false }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/apollo',
        '@nuxtjs/axios',
    ],

    axios: {
        // Base URL of GraphQL API (4000)
        // baseURL: 'http://127.0.0.1:4000'
    },

    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: 'http://localhost:4000/'
            }
        }
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
    },

    // Global router settings (meaning on every route)
    router: {
        linkExactActiveClass: "button-active",
    }
}
