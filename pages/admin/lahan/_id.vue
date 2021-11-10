<template>
  <v-container>
    <template v-if="lahans">
      <v-card class="px-4 py-4">
        <v-row>
          <v-col cols="12">
            <div class="text-overline">
              Profil Lahan
            </div>
            <div class="title">Lahan {{ lahan.sop.sop_nama }}</div>
          </v-col>
          <v-col cols="12" class="my-0 pt-0">
            <v-divider color="primary"></v-divider>
          </v-col>
          <v-col cols="12" md="6" class="mb-0 pb-0 pb-md-2">
            <v-simple-table class="no-border">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="komponen">Nama</td>
                    <td class="value">{{ lahan.manager_kebun.nama }}</td>
                  </tr>
                  <tr>
                    <td class="komponen">Nomor HP</td>
                    <td class="value">{{ lahan.manager_kebun.no_hp }}</td>
                  </tr>
                  <tr>
                    <td class="komponen">Email</td>
                    <td class="value">{{ lahan.manager_kebun.email }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12" md="6" class="mt-0 pt-0 pt-md-2">
            <v-simple-table class="no-border">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="komponen">Produk</td>
                    <td class="value">
                      {{ lahan.sop.sop_nama }}
                    </td>
                  </tr>
                  <tr>
                    <td class="komponen">Alamat</td>
                    <td class="value">{{ lahan.alamat.alamat }}</td>
                  </tr>
                  <tr>
                    <td class="komponen">Ditambahkan pada</td>
                    <td class="value">
                      {{ new Date(lahan.created_at).getDate() }}
                      {{ new Date(lahan.created_at).getMonth() | monthFormat }}
                      {{ new Date(lahan.created_at).getFullYear() }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-card>
    </template>
    <!-- <pre>{{ lahan }}</pre> -->
  </v-container>
</template>

<script>
export default {
  // middleware: "permission",
  data() {
    return {
      lahans: false,
      lahan: {
        nama: "",
        no_hp: "",
        lokasi_lahan: "",
        nama_buah: "",
        tahapan: ""
      },
      proyek: []
    };
  },
  mounted() {
    this.getLahan();
    // this.getProyekTanam();
  },

  methods: {
    async getLahan() {
      try {
        let response = await this.$axios.get(
          "api/v1/lahan/" + this.$route.params.id
        );
        this.lahan = response.data;
        this.lahans = true;
        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getProyekTanam() {
      try {
        let response = await this.$axios.get("api/v1/project");
        this.proyek = response.data;
        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss">
.no-border td {
  border-bottom: none !important;
}
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>
