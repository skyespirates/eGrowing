<template>
  <v-row>
    <v-col cols="12">
      <v-card
        class="mx-auto"
        color="light-green darken-4"
        dark
        max-width="100%"
      >
        <v-card-title>
          <v-icon large left>
            mdi-account
          </v-icon>
          <span class="text-h6 font-weight-light">Profil Petani</span>
        </v-card-title>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar size="100">
              <img
                src="~assets/img/petani.png"
                alt="Petani"
                aspect-ratio="1"
                class="elevation-6"
              />
            </v-list-item-avatar>

            <v-list-item-content>
              <h2 class="title" style="margin-top:20px;">
                {{ $auth.$state.user.manager_kebun.nama }}
              </h2>
              <v-list-item-subtitle
                ><v-icon>mdi-map-marker</v-icon> Subang</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card class="mx-auto" color="white" max-width="100%">
        <v-simple-table class="no-border">
          <template v-slot:default>
            <tbody>
              <tr>
                <td class="komponen">Nama</td>
                <td class="value">
                  {{ $auth.$state.user.manager_kebun.nama }}
                </td>
              </tr>
              <tr>
                <td class="komponen">Nomor HP</td>
                <td class="value">
                  {{ $auth.$state.user.manager_kebun.no_hp }}
                </td>
              </tr>
              <tr>
                <td class="komponen">Email</td>
                <td class="value">
                  {{ $auth.$state.user.manager_kebun.email }}
                </td>
              </tr>
              <tr>
                <td class="komponen">Jenis Kelamin</td>
                <td class="value">
                  {{ $auth.$state.user.manager_kebun.jenis_kelamin }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // middleware: "permission",
  data() {
    return {
      alert: false,
      success: false,
      messages: "",

      valid: false
    };
  },
  computed: {
    notInEdit() {
      return this.edit.name || this.edit.email;
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.background {
  height: auto;
  max-width: 100%;
}
</style>
