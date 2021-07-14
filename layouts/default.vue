<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list shaped>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          color="primary"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed dark app flat color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="userLogout">
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
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      admin: [
        {
          icon: "mdi-desktop-mac-dashboard",
          title: "Dashboard",
          to: "/"
        },
        {
          icon: "mdi-file-document-multiple",
          title: "Laporan",
          to: "/laporan"
        },
        {
          icon: "mdi-account-circle-outline",
          title: "Petani",
          to: "/admin/petani"
        },
        {
          icon: "mdi-tractor",
          title: "Lahan",
          to: "/lahan"
        },
        {
          icon: "mdi-file-document-edit",
          title: "SOP",
          to: "/admin/sop"
        },
        {
          icon: "mdi-chat",
          title: "Konsultasi",
          to: "/konsultasi"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Agrowing"
    };
  },
  computed: {
    items() {
      if ((this.$auth.user.role_id == 2)) {
        return [
          {
            icon: "mdi-desktop-mac-dashboard",
            title: "Dashboard",
            to: "/admin/dashboard"
          },
          {
            icon: "mdi-file-document-multiple",
            title: "Laporan",
            to: "/admin/laporan"
          },
          {
            icon: "mdi-account-circle-outline",
            title: "Petani",
            to: "/admin/petani"
          },
          {
            icon: "mdi-tractor",
            title: "Lahan",
            to: "/admin/lahan"
          },
          {
            icon: "mdi-file-document-edit",
            title: "SOP",
            to: "/admin/sop"
          },
          {
            icon: "mdi-chat",
            title: "Konsultasi",
            to: "/admin/konsultasi"
          }
        ];
      } else {
        return [
          {
            icon: "mdi-view-dashboard-outline",
            title: "Dashboard",
            to: "/manager-kebun/dashboard"
          },
          {
            icon: "mdi-flower-tulip-outline",
            title: "Panduan Bertanam",
            to: "/manager-kebun/panduan"
          },
          {
            icon: "mdi-sprout-outline",
            title: "Project Tanam",
            to: "/manager-kebun/project-tanam"
          },
          {
            icon: "mdi-file-document-multiple-outline",
            title: "Pencatatan Harian",
            to: "/manager-kebun/pencatatan"
          },

        ];
      }
    }
  },
  methods: {
    async userLogout() {
      try {
        let response = await await this.$auth.logout();
        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    }
  }
};
</script>
