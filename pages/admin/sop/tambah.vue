<template>
  <v-container>
    <v-row class="py-5">
      <v-col cols="12">
        <div class="d-flex">
          <div class="title">Tambah Panduan SOP</div>
        </div>
      </v-col>
      <v-col cols="12">
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="nama_tanaman">Nama Tanaman</label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                    outlined
                    v-model="sop.sop_nama"
                    hide-details=""
                    dense
                    id="nama_tanaman"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="estimasi_panen">Estimasi Panen Pertama</label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                    outlined
                    v-model="sop.estimasi_panen"
                    hide-details=""
                    dense
                    id="estimasi_panen"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12">
              <v-row align="start" no-gutters>
                <v-col cols="12" md="3">
                  <label for="deskripsi">Deskripsi</label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-textarea
                    outlined
                    hide-details=""
                    rows="3"
                    v-model="sop.deskripsi"
                    dense
                    id="deskripsi"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="waktu_panen">Kalkulasi Waktu Panen</label>
                </v-col>
                <v-col cols="12" md="9" class="d-flex">
                  <v-text-field
                    outlined
                    v-model="sop.kalkulasi_waktu_panen"
                    hide-details=""
                    dense
                    id="waktu_panen"
                  ></v-text-field>
                  <div class="my-auto ml-2">hari</div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="bobot_panen">Kalkulasi Bobot Panen</label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                    outlined
                    type="number"
                    step="any"
                    v-model="sop.kalkulasi_bobot_panen"
                    hide-details=""
                    dense
                    id="bobot_panen"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="mb-0 pb-0">
              <div class="title">Standar Operasional Prosedur Budidaya</div>
            </v-col>
            <v-col cols="12" v-for="tahapan in tahapans" :key="tahapan.id">
              <v-card elevation="1">
                <v-card-title class="subtitle-1">{{
                  tahapan.nama_tahapan
                }}</v-card-title>
                <hr />

                <v-card-text
                  v-for="(keg, c) in sop.kegiatan.filter(
                    (e) => e.tahapan_sop_id == tahapan.id
                  )"
                  :key="c"
                >
                  <v-row>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="12" class="mb-3" md="8">
                          <v-text-field
                            outlined
                            dense
                            v-model="keg.nama_kegiatan"
                            persistent-placeholder
                            hide-details
                            label="Nama kegiatan *"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mb-3 d-flex" md="2">
                          <v-text-field
                            outlined
                            dense
                            v-model="keg.durasi_waktu"
                            persistent-placeholder
                            hide-details
                            label="HOK *"
                            class="ml-md-2"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mb-3 d-flex" md="2">
                          <v-checkbox label="Upload foto" class="mt-0 ml-2">
                          </v-checkbox>
                          <v-btn
                            icon
                            class="ml-auto"
                            @click="hapusKegiatan(keg.kegiatan_id)"
                            ><v-icon>mdi-delete</v-icon></v-btn
                          >
                        </v-col>
                      </v-row>
                      <v-row
                        no-gutters
                        class="mx-3"
                        v-for="(ind, f) in keg.indikator"
                        :key="f"
                      >
                        <v-col cols="12" class="mb-3" md="7">
                          <v-text-field
                            outlined
                            dense
                            v-model="ind.nama_indikator"
                            persistent-placeholder
                            hide-details
                            label="Indikator *"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="mb-3 d-flex" md="5">
                          <v-select
                            outlined
                            dense
                            v-model="ind.tipe_jawaban"
                            persistent-placeholder
                            hide-details
                            :items="tipe_jawaban"
                            item-value="id"
                            item-text="tipe"
                            class="ml-md-2"
                            label="Tipe jawaban *"
                          ></v-select>
                          <v-btn
                            icon
                            @click="hapusIndikator(keg, ind.indikator_id)"
                            ><v-icon>mdi-delete</v-icon></v-btn
                          >
                        </v-col>
                        <v-col cols="12"> </v-col>
                      </v-row>
                      <v-btn
                        block
                        class="text-caption text-none py-1"
                        text
                        @click.stop="tambahIndikator(keg)"
                        color="primary"
                        ><v-icon class="text-caption">mdi-plus</v-icon> Tambah
                        indikator</v-btn
                      >
                    </v-col>
                  </v-row>
                  <hr />
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    color="primary"
                    rounded
                    block
                    class="text-none text-caption"
                    outlined
                    @click.stop="tambahKegiatan(tahapan.id)"
                    ><v-icon>mdi-plus</v-icon>Tambah Item Kegiatan</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-btn block color="primary" rounded @click.stop="postSOP()"
          >Simpan</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // middleware: "permission",
  data() {
    return {
      tahapans: [],
      tipe_jawaban: [],
      indikator: 0,
      sop: {
        admin_id: 1,
        sop_nama: "",
        estimasi_panen: "",
        deskripsi: "",
        foto: "",
        kalkulasi_waktu_panen: "",
        kalkulasi_bobot_panen: "",

        kegiatan: [],
      },
    };
  },
  mounted() {
    this.getTahapan();
    this.getTipeJawaban();
    this.sop.admin_id = this.$auth.user.admin.id;
  },
  methods: {
    async getTipeJawaban() {
      try {
        let response = await this.$axios.get("api/v1/tipe-jawaban");
        this.tipe_jawaban = response.data.data;

        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getTahapan() {
      try {
        let response = await this.$axios.get("api/v1/tahapan");
        this.tahapans = response.data.tahapan;
        this.tahapans.forEach((e) => {
          console.log(e);
          this.sop.kegiatan.push({
            kegiatan_id: this.sop.kegiatan.length + 1,
            nama_kegiatan: "",
            durasi_waktu: "",
            tahapan_sop_id: e.id,
            indikator: [
              {
                indikator_id: this.indikator + 1,
                nama_indikator: "",
                tipe_jawaban: "",
              },
            ],
          });
          this.indikator += 1;
        });
        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    tambahKegiatan(id) {
      this.sop.kegiatan.push({
        kegiatan_id: this.sop.kegiatan.length + 1,
        nama_kegiatan: "",
        durasi_waktu: "",
        tahapan_sop_id: id,
        indikator: [
          {
            indikator_id: this.indikator + 1,
            nama_indikator: "",
            tipe_jawaban: "",
          },
        ],
      });
      this.indikator += 1;
    },
    tambahIndikator(obj) {
      obj.indikator.push({
        indikator_id: this.indikator + 1,
        nama_indikator: "",
        tipe_jawaban: "",
      });
      this.indikator += 1;
    },
    hapusKegiatan(id) {
      let index = this.sop.kegiatan.findIndex((e) => e.kegiatan_id == id, 0);
      console.log(index);
      this.sop.kegiatan.splice(index, 1);
    },
    hapusIndikator(keg, id) {
      let index = keg.indikator.findIndex((e) => e.indikator_id == id, 0);
      console.log(index);
      keg.indikator.splice(index, 1);
    },
    async postSOP() {
      try {
        let response = await this.$axios.post("api/v1/sop", this.sop);
        console.log(response);
        this.$router.push("/admin/sop");
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
