<template>
  <v-row class="py-5" justify="center">
    <v-col cols="12">
      <div class="title">Project Tanam ID : {{project.id}}</div>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <div class="d">
            <div class="title">
              {{ nama_sop }}
            </div>
            <div class="subtitle-1">
              Tahapan kebun
            </div>
          </div>
          <div class="">Dibuat {{ project.created_at }}</div>
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col
              cols="12"
              md="4"
              v-for="blok in project.blok_lahan"
              :key="blok.id"
            >
              <v-card>
                <v-card-title class="mb-0 pb-0"
                  >Blok ID {{ blok.id }}</v-card-title
                >
                <v-card-text>
                  <div class="">
                    Luas lahan {{ blok.luas_blok }} m<sup>2</sup>
                  </div>
                  <div class="">Jumlah tanaman {{ blok.luas_blok }}</div>
                  <div class="">Umur tanaman {{ blok.umur_tanaman }} bulan</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

      </v-card>
    </v-col>
    <v-col cols="5">
      <maintenance/>
    </v-col>
  </v-row>
</template>

<script>
import Maintenance from '../../../components/Maintenance.vue';
export default {
  components: { Maintenance },
  data() {
    return {
      nama: "",
      tahapan: "",
      project: {}
    };
  },
  mounted() {
    this.getProject();
  },
  computed: {
    nama_sop() {
      this.getSop(this.project.sop_id);
      return this.nama;
    }
  },
  methods: {
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
