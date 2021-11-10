<template>
  <v-row class="py-5">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">
          Data Lahan
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <!-- <pre>{{ lahans }}</pre> -->
      <div class="">
        <v-text-field
          hide-details=""
          dense
          label="Cari"
          v-model="cari"
          outlined
        ></v-text-field>
      </div>
      <v-data-table :headers="th_lahan" :items="lahans" :search="cari">
        <template v-slot:[`item.id`]="{ item }">
          <v-btn
            color="primary"
            :to="'/admin/lahan/' + item.id"
            outlined
            class=" px-12 text-none text-caption small "
            rounded
            >Detail</v-btn
          >
        </template>
      </v-data-table>
    </v-col>
    <!-- <pre>{{lahans}}</pre> -->
  </v-row>
</template>

<script>
export default {
  // middleware: "permission",
  data() {
    return {
      cari: "",
      lahans: [
        {
          id: "",
          nama: "",
          no_hp: "",
          lokasi_lahan: "",
          nama_buah: ""
        }
      ],
      th_lahan: [
        {
          text: "Lokasi Lahan",
          value: "lokasi_lahan"
        },
        {
          text: "Produk Budidaya",
          value: "nama_buah"
        },
        {
          text: "Nama Petani",
          value: "nama"
        },
        {
          text: "Kontak",
          value: "no_hp"
        },
        {
          text: "Aksi",
          value: "id",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  mounted() {
    this.getLahans();
  },
  methods: {
    async getLahans() {
      try {
        let response = await this.$axios.get("api/v1/lahan");
        this.lahans = response.data;
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
