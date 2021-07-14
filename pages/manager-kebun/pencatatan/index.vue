<template>
  <v-row class="py-5" justify="center">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">
          Pencatatan harian
        </div>
        <!-- <div class="ml-auto">
          <v-btn
            rounded
            class="text-none text-caption px-7  "
            to="/manager-kebun/project-tanam/tambah"
            color="primary"
            ><v-icon>mdi-plus</v-icon> Tambah Project</v-btn
          >
        </div> -->
      </div>
    </v-col>
    <v-col cols="12" v-for="ctt in catatans" :key="ctt.id">
      <v-card>
        <v-card-title>{{
          ctt.blok_lahan.project_tanam.sop.sop_nama
        }}</v-card-title>
        <v-card-subtitle>{{ ctt.created_at }}</v-card-subtitle>
        <v-card-text>
          <div>Project tanam {{ ctt.blok_lahan.project_tanam.id }}</div>
          <div class="mb-3">Blok {{ ctt.blok_lahan_id }}</div>
          <div class="subtitle-2">{{ ctt.tahapan.nama_tahapan }}</div>
          {{ ctt.catatan }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="5">
      <maintenance />
    </v-col>
    <!-- <v-col cols="12">
      <pre>        {{ catatans }}</pre>
    </v-col> -->
  </v-row>
</template>

<script>
import Maintenance from "../../../components/Maintenance.vue";
export default {
  components: { Maintenance },
  data() {
    return {
      catatans: []
    };
  },
  mounted() {
    this.getCatatan();
  },
  methods: {
    async getCatatan() {
      try {
        let response = await this.$axios.get("api/v1/laporan");
        this.catatans = response.data.data;
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
