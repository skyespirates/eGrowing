<template>
  <v-app>
    <v-btn icon color="primary" @click="back"
      ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <h2>Tambah Tahapan Baru</h2>
    <v-card class="py-5 px-5 mb-5">
      <v-form>
        <v-row align="center">
          <v-col cols="12" md="10">
            <v-text-field
              v-model="nama_tahapan"
              label="Nama Tahapan"
              outlined
              dense
              id="nama_tahapan"
              hide-details=""
              :name="Math.random()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn color="primary" rounded class="mr-0" @click="tambahTahapan"
              >Tambah Tahapan</v-btn
            >
          </v-col>
        </v-row>
        <v-alert class="mt-3" type="success" dismissible :value="alertTahapan"
          >Berhasil membuat tahapan baru, silahkan tambahkan kegiatan</v-alert
        >
      </v-form>
    </v-card>
    <h2>Nama Kegiatan Pada Tahapan Baru</h2>
    <v-form>
      <v-card class="py-5 px-5">
        <v-row align="center">
          <v-col cols="10">
            <v-text-field
              label="Nama Kegiatan"
              outlined
              dense
              id="nama_tahapan"
              hide-details=""
              v-model="kegiatan.nama_kegiatan"
              :name="Math.random()"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="Durasi"
              outlined
              dense
              hide-details=""
              v-model="kegiatan.durasi_waktu"
              :name="Math.random()"
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
                  v-model="indikator.tipe_jawaban_id"
                ></v-select>
                <v-btn @click="hapusIndikator(i)" icon
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-btn block rounded @click="tambahIndikator">Tambah indikator</v-btn>
        <v-alert class="mt-3" type="success" dismissible :value="alertKegiatan"
          >Berhasil menambahkan kegiatan pada tahapan baru</v-alert
        >
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
      alertTahapan: false,
      alertKegiatan: false,
      nama_tahapan: "",
      tipeJawaban: [],
      kegiatan: {
        tahapan_sop_id: "",
        nama_kegiatan: "",
        durasi_waktu: "",
        indikator: [
          {
            nama_indikator: "",
            tipe_jawaban_id: "",
          },
        ],
      },
      sop_id: "",
    };
  },
  mounted() {
    this.getTipeJawaban();
    this.sop_id = this.$route.params.sop;
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
    async tambahTahapan() {
      try {
        const response = await this.$axios.post(
          `api/v1/sop/${this.sop_id}/tahapan`,
          { nama_tahapan: this.nama_tahapan }
        );
        this.kegiatan.tahapan_sop_id = response.data.data.id;
        this.alertTahapan = true;
        this.nama_tahapan = "";
      } catch (error) {
        this.error = true;
        console.log(error);
      }
    },
    tambahIndikator() {
      const indikator = {
        nama_indikator: "",
        tipe_jawaban_id: "",
      };
      this.kegiatan.indikator.push(indikator);
    },
    hapusIndikator(index) {
      this.kegiatan.indikator.splice(index, 1);
    },
    async tambahKegiatan() {
      try {
        const response = await this.$axios.post(
          `api/v1/sop/${this.sop_id}/kegiatan`,
          this.kegiatan
        );
        this.alertKegiatan = true;
        this.kegiatan = {
          tahapan_sop_id: "",
          nama_kegiatan: "",
          durasi_waktu: "",
          indikator: [
            {
              nama_indikator: "",
              tipe_jawaban_id: "",
            },
          ],
        };
      } catch (error) {
        this.error = true;
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
