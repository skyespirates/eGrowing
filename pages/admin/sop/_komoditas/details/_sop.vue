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
            :to="'/admin/sop/' + komoditas + '/details/' + sop_id + '/new'"
            color="primary"
            ><v-icon>mdi-plus</v-icon> Tambah Tahapan</v-btn
          >
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <h1>Detail SOP Melon</h1>
      <v-card elevation="1" class="px-5 my-5">
        <v-row>
          <v-col cols="4">Deskripsi</v-col
          ><v-col cols="8"
            >: SOP untuk budidaya tanaman buah {{ komoditas }}</v-col
          ></v-row
        >
        <v-row>
          <v-col cols="4">Estimasi Panen</v-col
          ><v-col cols="8">: 2 Bulan</v-col></v-row
        >
        <v-row>
          <v-col cols="4">Kalkulasi Waktu Panen</v-col
          ><v-col cols="8">: 112 Hari</v-col></v-row
        >
        <v-row>
          <v-col cols="4">Kalkulasi Bobot Panen</v-col
          ><v-col cols="8">: 1.7 Ton</v-col></v-row
        >
      </v-card>
    </v-col>
    <v-col cols="12">
      <h1>Tahapan</h1>
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="(tahapan, i) in tahapans" :key="i">
          <v-expansion-panel-header
            ><h3>{{ tahapan.nama_tahapan }}</h3></v-expansion-panel-header
          >
          <v-expansion-panel-content>
            <v-row>
              <v-col cols="2">Nama Kegiatan</v-col>
              <v-col cols="10">: Pembersihan lahan dari rumput dan gulma</v-col>
            </v-row>
            <v-row>
              <v-col cols="2">Durasi</v-col>
              <v-col cols="10">: 3 HOK</v-col>
            </v-row>

            <v-data-table
              :headers="headers"
              :items="tahapan.item_pekerjaan[0].indikator_kegiatan"
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
      komoditas: "",
      sop_id: "",
      headers: [
        { text: "Nama Indikator", value: "nama_indikator" },
        { text: "Tipe Jawaban ID", value: "tipe_jawaban" },
      ],
      tahapans: [
        {
          nama_tahapan: "Persiapan Lahan",
          item_pekerjaan: [
            {
              nama_kegiatan: "Pembersihan Lahan",
              durasi: "3 HOK",
              indikator_kegiatan: [
                {
                  nama_indikator: "Luas pengerjaan",
                  tipe_jawaban: 3,
                },
                {
                  nama_indikator: "Jumlah pekerja",
                  tipe_jawaban: 13,
                },
              ],
            },
          ],
        },
        {
          nama_tahapan: "Pengemburan Lahan",
          item_pekerjaan: [
            {
              nama_kegiatan: "Pembersihan Lahan",
              durasi: "3 HOK",
              indikator_kegiatan: [
                {
                  nama_indikator: "Luas pengerjaan",
                  tipe_jawaban: 3,
                },
                {
                  nama_indikator: "Jumlah pekerja",
                  tipe_jawaban: 13,
                },
              ],
            },
          ],
        },
        {
          nama_tahapan: "Pemupukan Tanaman",
          item_pekerjaan: [
            {
              nama_kegiatan: "Penyiapan pupuk",
              durasi: "3 HOK",
              indikator_kegiatan: [
                {
                  nama_indikator: "Luas pengerjaan",
                  tipe_jawaban: 3,
                },
                {
                  nama_indikator: "Jumlah pekerja",
                  tipe_jawaban: 13,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.komoditas = this.$route.params.komoditas;
    this.sop_id = this.$route.params.sop;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getParams() {
      console.log(this.$route.params);
    },
  },
};
</script>

<style></style>
