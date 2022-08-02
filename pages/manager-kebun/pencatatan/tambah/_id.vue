<template>
  <v-row no-gutters>
    <v-col cols="12" class="my-3">
      <v-card>
        <v-card color="green" light elevation="0">
          <v-card-title>Pencatatan Harian</v-card-title>
        </v-card>
        <v-divider></v-divider>
        <v-card-title>Komoditas: {{ nama_sop }}</v-card-title>
        <v-card-subtitle>Alamat: {{ project.alamat.alamat }}</v-card-subtitle>
        <v-card-text class="mb-0 pb-1">
          <v-row no-gutters class="mb-0">
            <v-col cols="12 mb-2">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="nama">Blok ID</label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-select
                    outlined
                    hide-details=""
                    dense
                    v-model="charian.blok_lahan_id"
                    :items="project.blok_lahan"
                    item-text="id"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12 mb-2">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="nama">Tanggal </label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                    outlined
                    hide-details=""
                    dense
                    type="date"
                    v-model="charian.tanggal"
                    item-value="id"
                    item-text="tanggal"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12 mb-2">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="nama">Tahapan budaya </label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-autocomplete
                    outlined
                    hide-details=""
                    dense
                    :disabled="disable"
                    v-model="charian.tahapan_id"
                    :items="tahapans"
                    item-value="id"
                    @change="isiCatatan"
                    item-text="nama_tahapan"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-col cols="12" v-if="charian.tahapan_id" class="px-0">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="9">
                <v-checkbox
                  hide-details=""
                  false-value="0"
                  true-value="1"
                  label="Panen?"
                  class="py-1 my-1"
                  v-model="charian.panen"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row v-if="charian.panen == 1">
              <v-col cols="12" md="8">
                <v-text-field
                  outlined
                  dense
                  label="Panen Aktual"
                  v-model="charian.panen_aktual"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  outlined
                  dense
                  label="Panen Grade A"
                  v-model="charian.panen_gradeA"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  outlined
                  dense
                  label="Panen Grade B"
                  v-model="charian.panen_gradeB"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-col cols="12">
              Anda akan membuat
              <strong
                >Laporan
                {{
                  charian.tahapan_id == 1
                    ? "Persiapan Lahan dan Tanaman"
                    : charian.tahapan_id == 2
                    ? "Perawatan Tanaman Belum Menghasilkan"
                    : charian.tahapan_id == 3
                    ? "Perawatan Tanaman Menghasilkan"
                    : "Pemanenan"
                }}
              </strong>
              untuk <strong>Blok {{ charian.blok_lahan_id }}</strong> pada
              tanggal
              <strong>
                {{ new Date(charian.tanggal).getDate() }}
                {{ new Date(charian.tanggal).getMonth() | monthFormat }}
                {{ new Date(charian.tanggal).getFullYear() }}</strong
              >
            </v-col>
            <v-col cols="12" v-for="sop in charian.kegiatan" :key="sop.id">
              <v-row>
                <v-col cols="12" md="9">
                  <v-checkbox
                    hide-details=""
                    false-value="0"
                    true-value="1"
                    v-model="sop.filled"
                    :label="sop.item_pekerjaan"
                    class="py-1 my-1"
                  ></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                  class="d-flex align-center mx-0 my-0 py-0"
                >
                  Durasi Waktu: {{ sop.durasi_waktu }}
                </v-col>
                <v-col>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row no-gutters class="my-2" v-if="sop.filled == 1">
                <v-col
                  cols="12 mb-1"
                  v-for="indikator in sop.indikator"
                  :key="indikator.id"
                >
                  <!-- {{indikator}} -->
                  <v-text-field
                    :label="indikator.nama_indikator"
                    dense
                    outlined
                    v-model="indikator.catat_jawaban"
                    hide-details=""
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Catatan"
                rows="3"
                persistent-placeholder
                v-model="charian.catatan"
              ></v-textarea>
            </v-col>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="text-none text-caption"
              @click.stop="postCatatan()"
              block
              color="primary"
              >Simpan</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-card>
      <!-- <pre>{{ sops }}</pre> -->
    </v-col>
  </v-row>
</template>

<script>
export default {
  // middleware: "permission",
  data() {
    return {
      sop_id: "",
      blok_lahan: "",
      charian: {
        tahapan_id: "",
        panen: false,
        panen_aktual: "",
        panen_gradeA: "",
        panen_gradeB: "",
        kegiatan: [],
        catatan: "",
        tanggal: "",
      },
      disable: false,
      nama: "",
      sops: [],
      tahapans: [],
      project: {
        sop: {
          nama_sop: "",
        },
        sop_id: "",
        alamat: {
          alamat: {},
        },
      },
    };
  },
  computed: {
    nama_sop() {
      this.getSop(this.project.sop_id);
      return this.nama;
    },
  },
  mounted() {
    this.getProject();
    this.getBlok(this.$route.params.id);
  },
  methods: {
    async getBlok(id) {
      try {
        const res = this.$axios.get("api/v1/sop/" + id);
        // console.log(res.data);
      } catch (error) {
        this.error = true;
        console.log(error.message);
      }
    },
    async getTahapan(sop_id) {
      try {
        const res = await this.$axios.get(`api/v1/sop/${sop_id}/tahapan`);
        console.log();
        this.tahapans = res.data.data;
      } catch (err) {
        this.error = true;
        console.log(err.message);
      }
    },
    async getProject() {
      try {
        let response = await this.$axios.get(
          "api/v1/project/" + this.$route.params.id
        );
        this.sop_id = response.data.data.sop_id;
        this.getTahapan(response.data.data.sop_id);
        // console.log(res);
        this.project = response.data.data;
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getSop(id) {
      try {
        let response = await this.$axios.get("/api/v1/sop/" + 24);
        this.nama = response.data.data.sop_nama;
        this.sops = response.data.data;
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async isiCatatan() {
      this.disable = true;

      let f = this.sops.item_pekerjaan
        .filter((e) => e.tahapan_sop_id == this.charian.tahapan_id)
        .forEach((element) => {
          this.charian.kegiatan.push({
            item_pekerjaan_id: element.id,
            item_pekerjaan: element.nama_kegiatan,
            filled: 0,
            indikator: [],
          });
          element.indikator_kegiatan.forEach((e2) => {
            let j = this.charian.kegiatan
              .filter((e) => e.item_pekerjaan == element.nama_kegiatan)
              .forEach((e1) => {
                e1.indikator.push({
                  indikator_id: e2.id,
                  nama_indikator: e2.nama_indikator,
                  catat_jawaban: null,
                });
              });
          });
        });
    },
    async postCatatan() {
      delete this.charian.blok_lahan_id;
      delete this.charian.tanggal;
      this.charian.kegiatan.forEach((item) => {
        delete item.item_pekerjaan;
      });
      this.charian.kegiatan.forEach((item) => {
        item.indikator.forEach((ytem) => {
          delete ytem.nama_indikator;
        });
      });

      try {
        let response = await this.$axios.post(
          `api/v1/blok/${this.$route.params.id}/catat/create`,
          this.charian
        );
        console.log(response);
        this.$router.push("/manager-kebun/project-tanam");
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
