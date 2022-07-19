<template>
  <v-app>
    <v-btn icon color="primary" @click="back"
      ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <h2>Tambah Tahapan Baru</h2>
    <v-card class="py-5 px-5 mb-5">
      <v-form>
        <v-row align="center">
          <v-col cols="12" md="9">
            <v-text-field
              v-model="nama_tahapan"
              label="Nama Tahapan"
              outlined
              dense
              id="nama_tahapan"
              hide-details=""
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-btn color="primary" rounded class="mr-0">Tambah Tahapan</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <h2>Nama Kegiatan Pada Tahapan Baru</h2>
    <v-form>
      <v-card class="py-5 px-5">
        <v-row align="center">
          <v-col cols="12">
            <v-text-field
              label="Nama Kegiatan"
              outlined
              dense
              id="nama_tahapan"
              hide-details=""
              v-model="kegiatan.nama_kegiatan"
              persistent-hint
              persistent-placeholder
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-for="(indikator, i) in kegiatan.indikator" :key="i">
          <v-col cols="12">
            <v-row no-gutters>
              <v-col cols="12" class="mb-3" md="7">
                <v-text-field
                  outlined
                  dense
                  hide-details
                  label="Indikator *"
                  v-model="indikator.nama_indikator"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mb-3 d-flex" md="5">
                <v-select
                  outlined
                  dense
                  persistent-placeholder
                  hide-details
                  :items="tipeJawaban"
                  item-value="id"
                  item-text="tipe"
                  class="ml-md-2"
                  label="Tipe jawaban *"
                  v-model="indikator.tipe_jawaban"
                ></v-select>
                <v-btn @click="hapusIndikator(i)" icon
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </v-col>
              <v-col cols="12"> </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-btn block rounded @click="tambahIndikator">Tambah indikator</v-btn>
      </v-card>
      <v-btn
        rounded
        @click="tambahKegiatan"
        color="blue-grey"
        class="my-5 white--text"
        >Tambah Kegiatan</v-btn
      >
      <div class="d-flex justify-end">
        <v-btn color="primary" @click="back" rounded>Selesai</v-btn>
      </div>
    </v-form>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      nama_tahapan: "",
      tipeJawaban: [],
      kegiatan: {
        nama_kegiatan: "",
        indikator: [
          {
            nama_indikator: "",
            tipe_jawaban: "",
          },
          {
            nama_indikator: "",
            tipe_jawaban: "",
          },
          {
            nama_indikator: "",
            tipe_jawaban: "",
          },
          {
            nama_indikator: "",
            tipe_jawaban: "",
          },
        ],
      },
    };
  },
  mounted() {
    this.getTipeJawaban();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getTipeJawaban() {
      try {
        const response = await this.$axios.get("api/v1/tipe-jawaban");
        this.tipeJawaban = response.data.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    tambahIndikator() {
      const indikator = {
        nama_indikator: "",
        tipe_jawaban: "",
      };
      this.kegiatan.indikator.push(indikator);
    },
    hapusIndikator(index) {
      this.kegiatan.indikator.splice(index, 1);
    },
    tambahKegiatan() {
      console.log(this.kegiatan);
    },
  },
};
</script>

<style></style>
