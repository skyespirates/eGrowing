<template>
  <v-row no-gutters>
    <v-col cols="12 mb-3">
      <div class="d-flex">
        <div class="title">
          Pencatatan Harian
        </div>
      </div>
    </v-col>
    <!-- <pre>{{project}}</pre> -->
    <v-col cols="12" class="mb-3">
      <v-card>
        <!-- <pre>

        {{ charian }}
        </pre> -->
        <v-card-title>{{ nama_sop }}</v-card-title>
        <v-card-subtitle>{{ project.alamat.alamat }}</v-card-subtitle>
        <v-card-text>
          <v-row no-gutters>
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
                    item-value="id"
                    item-text="nama_tahapan"
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
      </v-card>
    </v-col>
    <v-col cols="12" v-if="charian.tahapan_id">
      <v-card>
        <!-- <pre>

{{ charian }}
        </pre> -->
        <v-card-text>
          <v-row>
            <v-col cols="12" v-for="sop in charian.kegiatan" :key="sop.id">
              <v-checkbox
                hide-details=""
                false-value="0"
                true-value="1"
                v-model="sop.filled"
                :label="sop.item_pekerjaan"
              ></v-checkbox>
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
                persistent-placeholder
                v-model="charian.catatan"
              ></v-textarea>
            </v-col>
          </v-row>
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      charian: {
        blok_lahan_id: "",
        tahapan_id: "",
        kegiatan: [],
        catatan: ""
      },
      disable: false,
      nama: "",
      sops: [],
      tahapans: [],
      project: {
        sop: {
          nama_sop: ""
        },
        sop_id: "",
        alamat: {
          alamat: {}
        }
      }
    };
  },
  computed: {
    nama_sop() {
      this.getSop(this.project.sop_id);
      return this.nama;
    }
  },
  mounted() {
    this.getProject();
    this.getTahapan();
    this.getSop(this.$route.params.id);
  },
  methods: {
    async getTahapan() {
      try {
        let response = await this.$axios.get("api/v1/tahapan");
        this.tahapans = response.data.tahapan;
        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getProject() {
      try {
        let response = await this.$axios.get(
          "api/v1/project/" + this.$route.params.id
        );
        this.project = response.data.data;
        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getSop(id) {
      try {
        let response = await this.$axios.get("/api/v1/sop/" + id);
        this.nama = response.data.data.sop_nama;
        this.sops = response.data.data;
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    isiCatatan() {
      this.disable = true;
      let f = this.sops.item_pekerjaan
        .filter(e => e.tahapan_sop_id == this.charian.tahapan_id)
        .forEach(element => {
          this.charian.kegiatan.push({
            item_pekerjaan: element.nama_kegiatan,
            filled: 0,
            indikator: []
          });
          // console.log(element);
          // let g = this.charian.kegiatan
          //   .filter(e => e.item_pekerjaan == element.nama_kegiatan)
          //   .forEach(e1 => {
          //     e1.indikator.push({
          //       nama_indikator: e2.nama_indikator,
          //       catat_jawaban: null
          //     })
          //   })
          // console.log(g);
          element.indikator_kegiatan.forEach(e2 => {
            let j = this.charian.kegiatan
              .filter(e => e.item_pekerjaan == element.nama_kegiatan)
              .forEach(e1 => {
                e1.indikator.push({
                  id: e2.id,
                  nama_indikator: e2.nama_indikator,
                  catat_jawaban: null
                });
              });
          });
        });
    },
    async postCatatan() {
      try {
        let response = await this.$axios.post(
          "api/v1/project/catat-harian",
          this.charian
        );
        console.log(response);
        this.$router.push("/manager-kebun/project-tanam");
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
