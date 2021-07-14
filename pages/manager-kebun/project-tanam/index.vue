<template>
  <v-row class="py-5">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">
          Project Tanam
        </div>
        <div class="ml-auto">
          <v-btn
            rounded
            class="text-none text-caption px-7  "
            to="/manager-kebun/project-tanam/tambah"
            color="primary"
            ><v-icon>mdi-plus</v-icon> Tambah Project</v-btn
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
      <v-data-table :headers="th" :items="projects" :search="cari">
        <template v-slot:item.aksi="{ item }">
          <v-btn
            color="primary"
            :to="'/manager-kebun/pencatatan/tambah/' + item.id"
            
            class=" px-5  text-none text-caption small "
            rounded
            >Pencatatan Harian</v-btn
          >
          <v-btn
            color="primary"
            :to="'/manager-kebun/project-tanam/' + item.id"
            outlined
            class=" px-12 text-none text-caption small "
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
  data() {
    return {
      cari: "",
      projects: [
      ],
      th: [
        {
          text: "ID",
          value: "id"
        },
        {
          text: "Tanggal",
          value: "sop.sop_nama"
        },
        {
          text: "Produk",
          value: "sop.sop_nama"
        },
        {
          text: "Alamat",
          value: "alamat.regency.name",
          sortable: false
        },
        {
          text: "",
          value: "aksi",
          align: "right",
          sortable: false
        }
      ]
    };
  },
  mounted(){
      this.getProjects();
  },
  methods: {
    async getProjects() {
      try {
        let response = await this.$axios.get("api/v1/project");
        this.projects= response.data.data
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
