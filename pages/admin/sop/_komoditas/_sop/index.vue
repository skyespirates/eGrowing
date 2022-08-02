<template>
  <v-row class="py-5">
    <v-col cols="12">
      <div class="d-flex">
        <div class="align-center">
          <v-btn icon color="primary" @click="back"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
        </div>
        <div class="ml-auto">
          <v-btn
            rounded
            class="text-none text-caption px-7"
            :to="'/admin/sop/' + komoditas + '/' + sop_id + '/new'"
            color="primary"
            ><v-icon>mdi-plus</v-icon> Tambah Tahapan</v-btn
          >
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <h1>Detail SOP {{ komoditas }}</h1>
      <v-card elevation="1" class="px-5 my-5">
        <v-row>
          <v-col cols="3">Deskripsi</v-col
          ><v-col cols="9"
            >: SOP untuk budidaya tanaman buah {{ komoditas }}</v-col
          ></v-row
        >
        <v-row>
          <v-col cols="3">Estimasi Panen</v-col
          ><v-col cols="9">: {{ sop.estimasi_panen }}</v-col></v-row
        >
        <v-row>
          <v-col cols="3">Kalkulasi Waktu Panen</v-col
          ><v-col cols="9">: {{ sop.kalkulasi_waktu_panen }}</v-col></v-row
        >
        <v-row>
          <v-col cols="3">Kalkulasi Bobot Panen</v-col
          ><v-col cols="9">: {{ sop.kalkulasi_bobot_panen }}</v-col></v-row
        >
      </v-card>
    </v-col>
    <v-col cols="12">
      <h1>Tahapan</h1>
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="(tahapan, i) in sop.item_pekerjaan" :key="i">
          <v-expansion-panel-header
            ><h3>{{ tahapan.nama_kegiatan }}</h3></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="2">Nama Kegiatan</v-col>
              <v-col cols="10">: {{ tahapan.nama_kegiatan }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="2">Durasi</v-col>
              <v-col cols="10">: {{ tahapan.durasi_waktu }}</v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="tahapan.indikator_kegiatan"
              hide-default-footer
            >
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // middleware: "permission",
  data() {
    return {
      sop: {},
      komoditas: "",
      sop_id: "",
      headers: [
        { text: "Nama Indikator", value: "nama_indikator" },
        { text: "Tipe Jawaban ID", value: "tipe_jawaban_id" },
      ],
    };
  },
  mounted() {
    this.komoditas = this.$route.params.komoditas;
    this.sop_id = this.$route.params.sop;
    this.getSOP();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getSOP() {
      try {
        const response = await this.$axios.get("api/v1/sop/" + this.sop_id);
        this.sop = response.data.data;
        console.log(response.data.data);
      } catch (error) {
        this.error = true;
        console.log(error.message);
      }
    },
  },
};
</script>

<style></style>
