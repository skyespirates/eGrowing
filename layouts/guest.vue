<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list shaped>
        <v-list-item class="d-flex d-sm-none py-2">
          <div>
            <img height="40px" src="~assets/img/logo e-growing hijau.png" />
          </div>
        </v-list-item>
        <v-divider class="d-flex d-sm-none"></v-divider>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          color="primary"
        >
          <v-list-item-action class="mr-5">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="'/masuk'" class="d-flex d-sm-none">
          <v-list-item-action class="mr-5">
            <v-icon>mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Masuk'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed dark app elevation="1" class="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white" />
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <div class="py-2 px-12">
        <img height="40px" src="~assets/img/logo e-growing putih.png" />
      </div>

      <v-spacer />
      <v-btn @click.stop="goToLoginPage" color="white" class="hidden-xs-only">
        <h5 style="color:green">Masuk</h5>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ""
    };
  },
  computed: {
    items() {
      return [
        {
          icon: "mdi-flower-tulip-outline",
          title: "Panduan Budidaya",
          to: "/"
        },
        {
          icon: "mdi-account-outline",
          title: "Daftar",
          to: "/daftar"
        }
      ];
    }
  },
  methods: {
    goToLoginPage() {
      this.$router.push("/masuk");
    }
  }
};
</script>
