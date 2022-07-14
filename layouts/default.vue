<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list shaped>
        <v-list-item class="d-flex d-flex d-sm-none py-2">
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
      <v-btn icon @click.stop="userLogout" color="white">
        <v-icon>mdi-logout</v-icon>
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
            <v-icon light> mdi-repeat </v-icon>
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
  middleware: "auth",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "",
    };
  },
  computed: {
    items() {
      if (this.$auth.user.role_id == 2) {
        return [
          {
            icon: "mdi-desktop-mac-dashboard",
            title: "Dashboard",
            to: "/admin/dashboard",
          },
          {
            icon: "mdi-file-document-multiple",
            title: "Laporan",
            to: "/admin/laporan",
          },
          {
            icon: "mdi-account-circle-outline",
            title: "Petani",
            to: "/admin/petani",
          },
          {
            icon: "mdi-tractor",
            title: "Lahan",
            to: "/admin/lahan",
          },
          {
            icon: "mdi-file-document-edit",
            title: "SOP",
            to: "/admin/sop",
          },
          {
            icon: "mdi-account-clock-outline",
            title: "Membership",
            to: "/admin/membership",
          },
        ];
      } else if (this.$auth.user.role_id == 1) {
        return [
          {
            icon: "mdi-view-dashboard-outline",
            title: "Beranda",
            to: "/manager-kebun/dashboard",
          },
          {
            icon: "mdi-sprout-outline",
            title: "Project Tanam",
            to: "/manager-kebun/project-tanam",
          },
          {
            icon: "mdi-account-outline",
            title: "Profil",
            to: "/manager-kebun/profil",
          },
        ];
      }
    },
  },
  methods: {
    async userLogout() {
      try {
        let response = await this.$auth.logout();
        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
  },
};
</script>
