<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex">
          <div class="title">
            Laporan Harian
          </div>
        </div>
      </v-col>
      <template v-if="laporans">
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col cols="6">
                <v-simple-table class="no-border">
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>Tanggal</td>
                        <td>
                          {{
                            new Date(laporan.catat.created_at)
                              .getDate()
                              .toLocaleString()
                          }}
                          {{
                            new Date(laporan.catat.created_at).getMonth()
                              | monthFormat
                          }}
                          {{ new Date(laporan.catat.created_at).getFullYear() }}
                          {{
                            new Date(laporan.catat.created_at)
                              .getHours()
                              .toLocaleString()
                              .padStart(2, "0")
                          }}:{{
                            new Date(laporan.catat.created_at)
                              .getMinutes()
                              .toLocaleString()
                              .padStart(2, "0")
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td>Nama</td>
                        <td>HADUDUDU</td>
                      </tr>
                      <tr>
                        <td>Lokasi Lahan</td>
                        <td>{{ laporan.lokasi_lahan }}</td>
                      </tr>
                      <tr>
                        <td>Blok</td>
                        <td>{{ laporan.catat.blok_lahan_id }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col cols="6">
                <v-simple-table class="no-border">
                  <template v-slot:default>
                    <tbody>
                      <tr>
                        <td>Periode</td>
                        <td>{{ laporan.catat.blok_lahan.periode }}</td>
                      </tr>
                      <tr>
                        <td>Produk Budidaya</td>
                        <td>{{ laporan.nama_buah }}</td>
                      </tr>
                      <tr>
                        <td>Aktivitas</td>
                        <td>{{ laporan.catat.tahapan.nama_tahapan }}</td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>
                          {{
                            laporan.catat.catat_panen.length == 0
                              ? "Belum selesai"
                              : "Selesai"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // middleware: "permission",
  data() {
    return {
      kota: [],
      laporan: [{}],
      laporans: false
    };
  },
  mounted() {
    this.getKota();
    this.getLaporanHariIni();
  },

  methods: {
    async getKota() {
      try {
        let response = await this.$axios.get("/api/v1/kota");
        this.kota = response.data.kota;

        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getLaporanHariIni() {
      try {
        var index = 0;
        let response = await this.$axios.get(
          "api/v1/project/catat-harian/" + this.$route.params.id
        );
        this.laporan = response.data[index];
        this.laporans = true;
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
