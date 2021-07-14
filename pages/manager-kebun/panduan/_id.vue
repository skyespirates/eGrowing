<template>
  <v-row class="py-5" justify="center" align="center">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">
          Detail Standar Operasional Prosedur
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <v-card>
        <v-card-title>
          {{ sop.sop_nama }}
        </v-card-title>
        <v-card-subtitle>{{ sop.estimasi_panen }}</v-card-subtitle>
        <v-card-text>
          {{ sop.deskripsi }}
        </v-card-text>
        <v-card-text>
          <div class="">
            Kalkulasi waktu panen {{ sop.kalkulasi_waktu_panen }} hari
          </div>
          <div class="">
            Kalkulasi bobot panen {{ sop.kalkulasi_bobot_panen }} hari
          </div>
        </v-card-text>
        <template v-for="ip in sop.item_pekerjaan" >
          <v-card-text :key="ip.id">
            <div class="subtitle-1"
              >{{ip.nama_kegiatan}}</div
            >
            <div class="subtitle-2"
              >{{ip.durasi_waktu}}</div
            >
            <div class="text-caption">Indikator</div>
            <ul>
              <li v-for="ind in ip.indikator_kegiatan" :key="ind.id">{{ind.nama_indikator}}</li>
            </ul>
          </v-card-text>
        </template>
      </v-card>
      <!-- <pre>{{ sop }}</pre> -->
    </v-col>
    <v-col cols="12" md="6">
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
      sop: ""
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
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
