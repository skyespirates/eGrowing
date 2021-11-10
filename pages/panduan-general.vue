<template>
  <v-row class="py-5" justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card color="green" light elevation="0">
          <v-card-title> SOP {{ sop.sop_nama }} </v-card-title>
        </v-card>
        <v-card-subtitle>
          <div class="subtitle-2">Deskripsi: {{ sop.deskripsi }}</div>
          <div class="subtitle-2">
            Estimasi Panen Pertama: {{ sop.estimasi_panen }}
          </div>
        </v-card-subtitle>
        <div>
          <!-- TAHAP 1 -->
          <v-divider></v-divider>
          <v-card-title class="mb-1 primary--text"
            >Tahap Persiapan Lahan dan Tanaman</v-card-title
          >
          <template v-for="(ip, index) in tahap1">
            <v-card-text :key="ip.id">
              <v-row>
                <v-col cols="1" class="d-flex justify-center">
                  {{ index + 1 }}
                </v-col>
                <v-col cols="15">
                  <div class="subtitle-1">Kegiatan: {{ ip.a }}</div>
                  <div class="subtitle-2">HOK: {{ ip.b }}</div>
                  <div class="subtitle-2">
                    Indikator yang perlu diperhatikan:
                  </div>
                  <ul>
                    <li v-for="(ind, index) in ip.c" :key="ind.id">
                      Indikator {{ index + 1 }} : {{ ind.nama_indikator }}
                    </li>
                  </ul>
                </v-col>
              </v-row>
            </v-card-text>
          </template>

          <!-- TAHAP 2 -->
          <v-divider></v-divider>
          <v-card-title class="mb-1 primary--text"
            >Tahap Perawatan Tanaman Belum Menghasilkan</v-card-title
          >
          <template v-for="(ip, index) in tahap2">
            <v-card-text :key="ip.id">
              <v-row>
                <v-col cols="1" class="d-flex justify-center">
                  {{ index + 1 }}
                </v-col>
                <v-col cols="15">
                  <div class="subtitle-1">Kegiatan: {{ ip.a }}</div>
                  <div class="subtitle-2">HOK: {{ ip.b }}</div>
                  <div class="subtitle-2">
                    Indikator yang perlu diperhatikan:
                  </div>
                  <ul>
                    <li v-for="(ind, index) in ip.c" :key="ind.id">
                      Indikator {{ index + 1 }} : {{ ind.nama_indikator }}
                    </li>
                  </ul>
                </v-col>
              </v-row>
            </v-card-text>
          </template>

          <!-- TAHAP 3 -->
          <v-divider></v-divider>
          <v-card-title class="mb-1 primary--text"
            >Tahap Perawatan Tanaman Menghasilkan</v-card-title
          >
          <template v-for="(ip, index) in tahap3">
            <v-card-text :key="ip.id">
              <v-row>
                <v-col cols="1" class="d-flex justify-center">
                  {{ index + 1 }}
                </v-col>
                <v-col cols="15">
                  <div class="subtitle-1">Kegiatan: {{ ip.a }}</div>
                  <div class="subtitle-2">HOK: {{ ip.b }}</div>
                  <div class="subtitle-2">
                    Indikator yang perlu diperhatikan:
                  </div>
                  <ul>
                    <li v-for="(ind, index) in ip.c" :key="ind.id">
                      Indikator {{ index + 1 }} : {{ ind.nama_indikator }}
                    </li>
                  </ul>
                </v-col>
              </v-row>
            </v-card-text>
          </template>

          <!-- TAHAP 4 -->
          <v-divider></v-divider>
          <v-card-title class="mb-1 primary--text"
            >Tahap Pemanenan</v-card-title
          >
          <template v-for="(ip, index) in tahap4">
            <v-card-text :key="ip.id">
              <v-row>
                <v-col cols="1" class="d-flex justify-center">
                  {{ index + 1 }}
                </v-col>
                <v-col cols="15">
                  <div class="subtitle-1">Kegiatan: {{ ip.a }}</div>
                  <div class="subtitle-2">HOK: {{ ip.b }}</div>
                  <div class="subtitle-2">
                    Indikator yang perlu diperhatikan:
                  </div>
                  <ul>
                    <li v-for="(ind, index) in ip.c" :key="ind.id">
                      Indikator {{ index + 1 }} : {{ ind.nama_indikator }}
                    </li>
                  </ul>
                </v-col>
              </v-row>
            </v-card-text>
          </template>
        </div>
      </v-card>
      <pre>{{ tahap1.a }}</pre>
    </v-col>
  </v-row>
</template>

<script>
import Maintenance from "../components/Maintenance.vue";
export default {
  auth: false,
  layout: "guest",
  components: { Maintenance },
  data() {
    return {
      sop: "",
      tahap1: [
        {
          a: "",
          b: "",
          c: []
        }
      ],
      tahap2: [
        {
          a: "",
          b: "",
          c: []
        }
      ],
      tahap3: [
        {
          a: "",
          b: "",
          c: []
        }
      ],
      tahap4: [
        {
          a: "",
          b: "",
          c: []
        }
      ]
    };
  },
  mounted() {
    this.getSop();
  },
  methods: {
    async getSop() {
      try {
        let response = await this.$axios.get(
          "api/v1/sop/" + this.$route.params.id
        );
        this.sop = response.data.data;
        console.log(response);
        this.getSOPByTahapan();
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getSOPByTahapan() {
      for (let index = 0; index < this.sop.item_pekerjaan.length; index++) {
        if (this.sop.item_pekerjaan[index].tahapan_sop_id === 1) {
          this.tahap1.push({
            a: this.sop.item_pekerjaan[index].nama_kegiatan,
            b: this.sop.item_pekerjaan[index].durasi_waktu,
            c: this.sop.item_pekerjaan[index].indikator_kegiatan
          });
        } else if (this.sop.item_pekerjaan[index].tahapan_sop_id === 2) {
          this.tahap2.push({
            a: this.sop.item_pekerjaan[index].nama_kegiatan,
            b: this.sop.item_pekerjaan[index].durasi_waktu,
            c: this.sop.item_pekerjaan[index].indikator_kegiatan
          });
        } else if (this.sop.item_pekerjaan[index].tahapan_sop_id === 3) {
          this.tahap3.push({
            a: this.sop.item_pekerjaan[index].nama_kegiatan,
            b: this.sop.item_pekerjaan[index].durasi_waktu,
            c: this.sop.item_pekerjaan[index].indikator_kegiatan
          });
        } else if (this.sop.item_pekerjaan[index].tahapan_sop_id === 4) {
          this.tahap4.push({
            a: this.sop.item_pekerjaan[index].nama_kegiatan,
            b: this.sop.item_pekerjaan[index].durasi_waktu,
            c: this.sop.item_pekerjaan[index].indikator_kegiatan
          });
        }
      }
      if (this.tahap1[0].a == "") {
        this.tahap1.splice(0, 1);
      }
      if (this.tahap2[0].a == "") {
        this.tahap2.splice(0, 1);
      }
      if (this.tahap3[0].a == "") {
        this.tahap3.splice(0, 1);
      }
      if (this.tahap4[0].a == "") {
        this.tahap4.splice(0, 1);
      }
    },
    middleware({ redirect, store }) {
      // If the user is not authenticated
      if (store.state.auth.user.role_id == 1) {
        return redirect("/manager-kebun/dashboard");
      } else if (store.state.auth.user.role_id == 2) {
        return redirect("/admin/dashboard");
      }
    }
  }
};
</script>

<style></style>
