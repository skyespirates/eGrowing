<template>
  <v-row class="py-5">
    <v-col cols="12">
      <div class="d-flex">
        <div class="align-center">
          <v-btn icon color="primary" @click="back"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          <span class="title my-auto">Melon</span>
        </div>
        <div class="ml-auto">
          <v-btn
            rounded
            class="text-none text-caption px-7"
            to="/admin/sop/new"
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
            :to="`/sop/${item.nomor}/details/${item.nomor}`"
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
      cari: "",
      sops: [
        {
          nomor: 1,
          deskripsi: "SOP Buah Melon",
          estimasi_panen: 112,
          bobot_panen: 1.7,
        },
        {
          nomor: 2,
          deskripsi: "SOP Buah Melon",
          estimasi_panen: 112,
          bobot_panen: 1.7,
        },
        {
          nomor: 3,
          deskripsi: "SOP Buah Melon",
          estimasi_panen: 112,
          bobot_panen: 1.7,
        },
        {
          nomor: 4,
          deskripsi: "SOP Buah Melon",
          estimasi_panen: 112,
          bobot_panen: 1.7,
        },
      ],
      th_sops: [
        {
          text: "No",
          value: "nomor",
        },
        {
          text: "Deskripsi",
          value: "deskripsi",
          sortable: false,
        },
        {
          text: "Kalkulasi Waktu Panen (tahun)",
          value: "estimasi_panen",
        },
        {
          text: "Kalkulasi Bobot Panen (kg)",
          value: "bobot_panen",
        },
        {
          text: "Aksi",
          value: "aksi",
        },
      ],
    };
  },
  mounted() {
    console.log(this.$route.params.id);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
