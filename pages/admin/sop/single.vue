<template>
  <v-row class="pt-5" justify="center" align="center">
    <v-col cols="12" class="py-0 px-0">
      <v-breadcrumbs>
        <a href="/admin/sop">SOP</a>
        <template>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <a href="/admin/sop/" onclick="return false">{{ sop.sop_nama }}</a>
      </v-breadcrumbs>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card light elevation="0">
          <v-card-title class="mb-0 pb-0">
            SOP {{ sop.sop_nama }}
          </v-card-title>
        </v-card>
        <v-card-subtitle>
          <div class="text-body-2 text-md-body-1 mb-2">
            Deskripsi: {{ sop.deskripsi }}
          </div>
          <div class="text-body-2 text-md-body-1">
            Estimasi Panen Pertama: {{ sop.estimasi_panen }}
          </div>
        </v-card-subtitle>

        <div>
          <!-- TAHAP 1 -->
          <v-divider></v-divider>
          <v-row>
            <v-col cols="10" md="11">
              <v-card-title
                class="mb-1 primary--text text-h6"
                style="word-break: break-word"
                >Tahap Persiapan Lahan dan Tanaman</v-card-title
              >
            </v-col>
            <v-col class="d-flex align-center">
              <v-btn icon @click="show1 = !show1">
                <v-icon>{{
                  show1 ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-expand-transition>
            <div v-show="show1">
              <v-divider></v-divider>
              <template v-for="(ip, index) in tahap1">
                <v-card-text :key="ip.id">
                  <v-row>
                    <v-col cols="1" class="d-flex justify-center">
                      {{ index + 1 }}
                    </v-col>
                    <v-col cols="15">
                      <div class="text-body-2 text-md-body-1 mb-1">
                        Kegiatan: {{ ip.a }}
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        HOK: {{ ip.b }}
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        Indikator yang perlu diperhatikan:
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        <ul>
                          <li v-for="(ind, index) in ip.c" :key="ind.id">
                            Indikator {{ index + 1 }} : {{ ind.nama_indikator }}
                          </li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </template>
            </div>
          </v-expand-transition>

          <!-- TAHAP 2 -->
          <v-divider></v-divider>
          <v-row>
            <v-col cols="10" md="11">
              <v-card-title
                class="mb-1 primary--text text-h6"
                style="word-break: break-word"
                >Tahap Perawatan Tanaman Belum Menghasilkan</v-card-title
              >
            </v-col>
            <v-col class="d-flex align-center">
              <v-btn icon @click="show2 = !show2">
                <v-icon>{{
                  show2 ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-expand-transition>
            <div v-show="show2">
              <v-divider></v-divider>
              <template v-for="(ip, index) in tahap2">
                <v-card-text :key="ip.id">
                  <v-row>
                    <v-col cols="1" class="d-flex justify-center">
                      {{ index + 1 }}
                    </v-col>
                    <v-col cols="15">
                      <div class="text-body-2 text-md-body-1 mb-1">
                        Kegiatan: {{ ip.a }}
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        HOK: {{ ip.b }}
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        Indikator yang perlu diperhatikan:
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        <ul>
                          <li v-for="(ind, index) in ip.c" :key="ind.id">
                            Indikator {{ index + 1 }} : {{ ind.nama_indikator }}
                          </li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </template>
            </div>
          </v-expand-transition>

          <!-- TAHAP 3 -->
          <v-divider></v-divider>
          <v-row>
            <v-col cols="10" md="11">
              <v-card-title
                class="mb-1 primary--text text-h6"
                style="word-break: break-word"
                >Tahap Perawatan Tanaman Menghasilkan</v-card-title
              >
            </v-col>
            <v-col class="d-flex align-center">
              <v-btn icon @click="show3 = !show3">
                <v-icon>{{
                  show3 ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-expand-transition>
            <div v-show="show3">
              <v-divider></v-divider>
              <template v-for="(ip, index) in tahap3">
                <v-card-text :key="ip.id">
                  <v-row>
                    <v-col cols="1" class="d-flex justify-center">
                      {{ index + 1 }}
                    </v-col>
                    <v-col cols="15">
                      <div class="text-body-2 text-md-body-1 mb-1">
                        Kegiatan: {{ ip.a }}
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        HOK: {{ ip.b }}
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        Indikator yang perlu diperhatikan:
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        <ul>
                          <li v-for="(ind, index) in ip.c" :key="ind.id">
                            Indikator {{ index + 1 }} : {{ ind.nama_indikator }}
                          </li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </template>
            </div>
          </v-expand-transition>

          <!-- TAHAP 4 -->
          <v-divider></v-divider>
          <v-row>
            <v-col cols="10" md="11">
              <v-card-title
                class="mb-1 primary--text text-h6"
                style="word-break: break-word"
                >Tahap Pemanenan</v-card-title
              >
            </v-col>
            <v-col class="d-flex align-center">
              <v-btn icon @click="show4 = !show4">
                <v-icon>{{
                  show4 ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-expand-transition>
            <div v-show="show4">
              <v-divider></v-divider>
              <template v-for="(ip, index) in tahap4">
                <v-card-text :key="ip.id">
                  <v-row>
                    <v-col cols="1" class="d-flex justify-center">
                      {{ index + 1 }}
                    </v-col>
                    <v-col cols="15">
                      <div class="text-body-2 text-md-body-1 mb-1">
                        Kegiatan: {{ ip.a }}
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        HOK: {{ ip.b }}
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        Indikator yang perlu diperhatikan:
                      </div>
                      <div class="text-body-2 text-md-body-1 mb-1">
                        <ul>
                          <li v-for="(ind, index) in ip.c" :key="ind.id">
                            Indikator {{ index + 1 }} : {{ ind.nama_indikator }}
                          </li>
                        </ul>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </template>
            </div>
          </v-expand-transition>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Maintenance from "../../../components/Maintenance.vue";
export default {
  components: { Maintenance },
  data() {
    return {
      show1: true,
      show2: true,
      show3: true,
      show4: true,
      sop: "",
      tahap1: [
        {
          a: "",
          b: "",
          c: [],
        },
      ],
      tahap2: [
        {
          a: "",
          b: "",
          c: [],
        },
      ],
      tahap3: [
        {
          a: "",
          b: "",
          c: [],
        },
      ],
      tahap4: [
        {
          a: "",
          b: "",
          c: [],
        },
      ],
    };
  },
  mounted() {
    this.getSop();
  },
  methods: {
    async getSop() {
      try {
        let response = await this.$axios.get("api/v1/sop/" + 15);
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
            c: this.sop.item_pekerjaan[index].indikator_kegiatan,
          });
        } else if (this.sop.item_pekerjaan[index].tahapan_sop_id === 2) {
          this.tahap2.push({
            a: this.sop.item_pekerjaan[index].nama_kegiatan,
            b: this.sop.item_pekerjaan[index].durasi_waktu,
            c: this.sop.item_pekerjaan[index].indikator_kegiatan,
          });
        } else if (this.sop.item_pekerjaan[index].tahapan_sop_id === 3) {
          this.tahap3.push({
            a: this.sop.item_pekerjaan[index].nama_kegiatan,
            b: this.sop.item_pekerjaan[index].durasi_waktu,
            c: this.sop.item_pekerjaan[index].indikator_kegiatan,
          });
        } else if (this.sop.item_pekerjaan[index].tahapan_sop_id === 4) {
          this.tahap4.push({
            a: this.sop.item_pekerjaan[index].nama_kegiatan,
            b: this.sop.item_pekerjaan[index].durasi_waktu,
            c: this.sop.item_pekerjaan[index].indikator_kegiatan,
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
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
