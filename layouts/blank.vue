<template>
  <v-app>
    <v-app-bar clipped-left fixed dark app elevation="1" class="white">
      <v-spacer />
      <v-toolbar-title>
        <!-- screen mobile -->
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
          class="hidden-md-and-up"
        >
          <div>
            <img height="40px" src="~assets/img/logo e-growing hijau.png" />
          </div>
        </router-link>
      </v-toolbar-title>

      <v-spacer />
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "eGrowing",
  data() {
    return {
      sidebar: false,
      menuItems: [
        { title: "Panduan", path: "/", icon: "mdi-view-dashboard-outline" },
        { title: "Daftar", path: "/daftar", icon: "mdi-account-outline" }
      ]
    };
  }
};
</script>
<style>
#imagewrapper {
  text-align: center;
}

#imagewrapper img {
  display: inline-block;
  margin: 0 5px;
}
</style>
