<template>
  <v-row no-gutters justify="center">
      <v-col cols="12" class="mb-3">
          <div class="">
              <div class="title">Catatan harian manager kebun</div>
          </div>
      </v-col>
    <v-col cols="12" v-for="ctt in catatans" :key="ctt.id">
      <v-card>
        <v-card-title>{{
          ctt.blok_lahan.project_tanam.sop.sop_nama
        }}</v-card-title>
        <v-card-subtitle>{{ ctt.created_at }}</v-card-subtitle>
        <v-card-text>
          <!-- <pre>{{ ctt.blok_lahan }}</pre> -->
          <div>Manager kebun {{ ctt.blok_lahan.project_tanam.manager_kebun.nama }}</div>
          <div>Project tanam {{ ctt.blok_lahan.project_tanam.id }}</div>
          <div class="mb-3">Blok {{ ctt.blok_lahan_id }}</div>
          <div class="subtitle-2">{{ ctt.tahapan.nama_tahapan }}</div>
          {{ ctt.catatan }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="5" class=" my-12" >
        <maintenance/>
    </v-col>
    <!-- <v-col cols="12">
      <pre>        {{ catatans }}</pre>
    </v-col> -->
  </v-row>
</template>

<script>
import Maintenance from '../../../components/Maintenance.vue';
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
