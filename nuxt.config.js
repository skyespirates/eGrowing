import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  server: {
    // port: 3030 // default: 3000
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "eGrowing",
    title: "eGrowing",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/logo.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/filters.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
  ],
  auth: {
    // Options
    redirect: {
      login: "/masuk",
      logout: "/masuk",
      callback: "/",
      home: "/",
    },
    strategies: {
      local: {
        token: {
          property: "data.token",
          global: true,
          // required: true,
          type: "Bearer",
        },
        user: {
          // property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: "/api/v1/login", method: "post" },
          logout: { url: "/api/auth/logout", method: "post" },
          user: { url: "/api/v1/user", method: "get" },
        },
      },
    },
  },
  router: {
    middleware: ["auth"],
    auth: ["guest"],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // port: 3010,
    // host: "47.254.251.8",
    // https: false,
    baseURL: "https://glacial-harbor-03739.herokuapp.com/",
    // headers:{
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Accept': 'application/json'
    // }
    // proxy: true
  },
  // proxy: {
  //   '/api': { target: 'https://agrowing-api.herokuapp.com/', changeOrigin: true }
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: "eGrowing",
    },
    manifest: {
      lang: "en",
      name: "eGrowing",
      short_name: "eGrowing",
    },
    icon: {
      fileName: "logo.png",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: colors.green.darken1,
          accent: colors.grey.darken3,
          secondary: colors.white,
          green: colors.green.lighten2,
        },
      },
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
