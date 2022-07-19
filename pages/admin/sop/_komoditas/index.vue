<template>
  <v-row class="py-5">
    <v-col cols="12">
      <div class="d-flex">
        <div class="align-center">
          <v-btn icon color="primary" @click="back"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          <span class="title my-auto">{{ this.$route.params.komoditas }}</span>
        </div>
        <div class="ml-auto">
          <v-btn
            rounded
            class="text-none text-caption px-7"
            :to="'/admin/sop/' + komoditas + '/tambah'"
            color="primary"
            ><v-icon>mdi-plus</v-icon> Tambah SOP</v-btn
          >
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <div class="">
        <v-text-field
          hide-details=""
          dense
          label="Cari"
          v-model="cari"
          outlined
        ></v-text-field>
      </div>
      <v-data-table :headers="th_sops" :items="sops" :search="cari">
        <template v-slot:[`item.aksi`]="{ item }">
          <v-btn
            icon
            :to="'/admin/sop/' + komoditas + '/details/' + item.id"
            color="blue"
          >
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
          <v-btn icon :to="'/admin/sop/' + item.nomor" color="red">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // middleware: "permission",
  data() {
    return {
      komoditas: "",
      cari: "",
      sops: [],
      th_sops: [
        {
          text: "Deskripsi",
          value: "deskripsi",
          sortable: false,
        },
        {
          text: "Kalkulasi Waktu Panen (tahun)",
          value: "estimasi_panen",
          align: "center",
        },
        {
          text: "Kalkulasi Bobot Panen (kg)",
          value: "kalkulasi_bobot_panen",
          align: "center",
        },
        {
          text: "Aksi",
          value: "aksi",
        },
      ],
    };
  },
  mounted() {
    this.komoditas = this.$route.params.komoditas;
    this.getSOP();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getSOP() {
      const komoditas = this.$route.params.komoditas;
      try {
        const response = await this.$axios.get(
          "api/v1/sop?komoditas=" + komoditas
        );
        console.log(response.data.sop);
        this.sops = response.data.sop;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
