<template>
  <div>
    <v-row class="py-5" justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            {{ nama_sop }}
          </v-card-title>
          <v-card-subtitle>
            <div>Project Tanam ID : {{ project.id }}</div>
          </v-card-subtitle>
          <v-card-text>
            <div>
              Tahapan kebun :
              {{
                project.tahapan_sop_id == 1
                  ? "Persiapan Lahan dan Tanaman"
                  : project.tahapan_sop_id == 2
                  ? "Perawatan Tanaman Belum Menghasilkan"
                  : project.tahapan_sop_id == 3
                  ? "Perawatan Tanaman Menghasilkan"
                  : "Pemanenan"
              }}
            </div>
            <template>
              <span
                >Dibuat pada {{ new Date(project.created_at).getDate() }}
                {{ new Date(project.created_at).getMonth() | monthFormat }}
                {{ new Date(project.created_at).getFullYear() }}
              </span>
            </template>
          </v-card-text>

          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                md="4"
                v-for="blok in project.blok_lahan"
                :key="blok.id"
              >
                <v-sheet outlined color="green" rounded>
                  <v-card
                    outlined
                    elevation="0"
                    class="d-flex align-content-start flex-wrap"
                  >
                    <v-card-title>
                      <div class="text-subtitle-1 font-weight-bold">
                        Blok ID {{ blok.id }}
                      </div>
                    </v-card-title>
                    <v-card-text>
                      <div class="text-body1">
                        Luas lahan {{ blok.luas_blok }} m2
                      </div>
                      <div class="text-body1">
                        Jumlah tanaman : {{ blok.jumlah_tanaman }}
                      </div>
                      <div class="text-body1">
                        Umur tanaman : {{ blok.umur_tanaman }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-card tile>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in pencatatan" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item.catatan"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import Maintenance from "../../../components/Maintenance.vue";
export default {
  // middleware: "permission",
  components: { Maintenance },
  data() {
    return {
      nama: "",
      tahapan: "",
      project: {},
      pencatatan: [],
    };
  },
  mounted() {
    this.getProject();
    this.getCatatanHarian();
  },
  computed: {
    nama_sop() {
      this.getSop(this.project.sop_id);
      return this.nama;
    },
  },
  methods: {
    async getCatatanHarian() {
      try {
        const res = await this.$axios.get(
          "api/v1/blok/" + this.$route.params.id + "/catat"
        );
        this.pencatatan = res.data.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    async getSop(id) {
      try {
        let response = await this.$axios.get("/api/v1/sop/" + id);
        this.nama = response.data.data.sop_nama;
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
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
