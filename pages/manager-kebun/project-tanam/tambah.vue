<template>
  <v-row class="py-5">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">
          Buat Proyek Tanam
        </div>
      </div>
    </v-col>

    <v-col cols="12">
      <!-- <pre>
            {{ project }}
        </pre
      > -->
      <v-form @submit.prevent="postProject">
        <v-card>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12">
                <div class="subtitle-1 font-weight-bold">
                  Data Varietas Tanaman
                </div>
              </v-col>
              <v-col cols="12 mb-2">
                <v-row align="center" no-gutters>
                  <v-col cols="12" md="3">
                    <label for="nama">Pilih Tanaman </label>
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-autocomplete
                      outlined
                      v-model="project.sop_id"
                      :items="sops"
                      hide-details=""
                      dense
                      item-value="id"
                      item-text="sop_nama"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12 mb-2">
                <v-row align="center" no-gutters>
                  <v-col cols="12" md="3">
                    <label for="nama">Pilih Tahap Pencatatan Awal </label>
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-autocomplete
                      outlined
                      v-model="project.tahapan_sop_id"
                      hide-details=""
                      dense
                      :items="tahapans"
                      item-value="id"
                      item-text="nama_tahapan"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <hr class="mb-7" />
            <v-row no-gutters>
              <v-col cols="12">
                <div class="subtitle-1 font-weight-bold">Data Lahan</div>
              </v-col>
              <v-col cols="12 mb-2">
                <v-row no-gutters>
                  <v-col cols="12" md="3">
                    <label for="nama">Alamat </label>
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-textarea
                      outlined
                      v-model="project.alamat"
                      rows="2"
                      hide-details=""
                      dense
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12 mb-2">
                <v-row align="center" no-gutters>
                  <v-col cols="12" md="3">
                    <label for="nama">Kota / Kabupaten </label>
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-autocomplete
                      outlined
                      :items="kota"
                      item-value="id"
                      v-model="project.regencies_id"
                      item-text="name"
                      hide-details=""
                      dense
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <hr class="mb-7" />
            <v-row no-gutters v-for="(blok, c) in project.blok" :key="c">
              <v-col cols="12">
                <div class="subtitle-1 font-weight-bold">
                  <v-btn icon x-small color="red" @click.stop="hapusBlok(c)"
                    >x</v-btn
                  >
                  Data Blok {{ c + 1 }}
                </div>
              </v-col>
              <v-col cols="12 mb-2">
                <v-row align="center" no-gutters>
                  <v-col cols="12" md="3">
                    <label for="nama">Luas Blok </label>
                  </v-col>
                  <v-col cols="12 d-flex" md="9">
                    <v-text-field
                      outlined
                      type="number"
                      v-model="blok.luas_blok"
                      hide-details=""
                      dense
                    ></v-text-field>
                    <div class="my-auto ml-2">m2</div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12 mb-2">
                <v-row align="center" no-gutters>
                  <v-col cols="12" md="3">
                    <label for="nama">Jumlah Tanaman </label>
                  </v-col>
                  <v-col cols="12 d-flex" md="9">
                    <v-text-field
                      outlined
                      type="number"
                      v-model="blok.jumlah_tanaman"
                      hide-details=""
                      dense
                    ></v-text-field>
                    <div class="my-auto ml-2">pokok tanaman</div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12 mb-2">
                <v-row align="center" no-gutters>
                  <v-col cols="12" md="3">
                    <label for="nama">Umur tanaman </label>
                  </v-col>
                  <v-col cols="12 d-flex" md="9">
                    <v-text-field
                      outlined
                      type="number"
                      v-model="blok.umur_tanaman"
                      hide-details=""
                      dense
                    ></v-text-field>
                    <div class="my-auto ml-2">bulan</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <hr class="mb-7" />
            <v-btn
              block
              rounded
              color="primary"
              text
              class="text-none text-caption "
              @click.stop="tambahBlok()"
              >Tambah Blok</v-btn
            >
            <v-card-actions>
              <v-btn
                color="primary"
                rounded
                type="submit"
                block
                class="text-none text-caption"
                >Simpan</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      sops: [],
      tahapans: [],
      kota: [],
      project: {
        manager_kebun_id: "",
        sop_id: "",
        tahapan_sop_id: "1",

        alamat: "",
        regencies_id: "",

        blok: [
          {
            luas_blok: "",
            jumlah_tanaman: "",
            umur_tanaman: ""
          }
        ]
      }
    };
  },
  mounted() {
    this.getSops();
    this.getTahapan();
    this.getKota();
    this.project.manager_kebun_id = this.$auth.user.manager_kebun.id;
  },

  methods: {
    async postProject() {
      try {
        let response = await this.$axios.post(
          "api/v1/project/create",
          this.project
        );
        console.log(response);
        this.$router.push("/manager-kebun/project-tanam");
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    tambahBlok() {
      this.project.blok.push({
        luas_blok: "",
        jumlah_tanaman: "",
        umur_tanaman: ""
      });
    },
    hapusBlok(c) {
      this.project.blok.splice(c, 1);
    },
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
    async getSops() {
      try {
        let response = await this.$axios.get("api/v1/sop");
        this.sops = response.data.sop;

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
        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
