<template>
  <v-row class="py-5">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">Standar Operasional Prosedur</div>
        <div class="ml-auto">
          <v-btn
            rounded
            class="text-none text-caption px-7"
            to="/admin/sop/tambah"
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
        <template v-slot:[`item.id`]="{ item }">
          <v-btn
            color="primary"
            :to="'/admin/sop/' + item.id"
            outlined
            class="px-12 text-none text-caption small"
            rounded
            >Detail</v-btn
          >
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
      sops: [],
      th_sops: [
        {
          text: "Nama",
          value: "sop_nama",
        },
        {
          text: "Deskripsi",
          value: "deskripsi",
          sortable: false,
        },
        {
          text: "Periode Tanam",
          value: "estimasi_panen",
          sortable: false,
        },
        {
          text: "",
          value: "id",
          align: "right",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.getSops();
  },
  methods: {
    async getSops() {
      try {
        let response = await this.$axios.post("api/v1/komoditas");
        this.sops = response.data.sop;

        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
