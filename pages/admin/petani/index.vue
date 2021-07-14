<template>
  <v-row class="py-5">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">
          Petani
        </div>
        <div class="ml-auto">
          <v-btn
            rounded
            class="text-none text-caption px-7  "
            to="/admin/petani/tambah"
            color="primary"
            ><v-icon>mdi-plus</v-icon> Tambah Petani</v-btn
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
      <v-data-table :headers="th_petani" :items="petanis" :search="cari">
        <template v-slot:item.id="{ item }">
          <v-btn
            color="primary"
            :to="'/admin/petani/' + item.id"
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
      petanis: [
        {
         id:'',
         nama:'',
         no_hp:'',
        }
      ],
      th_petani: [
        {
          text: "Nama",
          value: "nama"
        },
        {
          text: "Kontak",
          value: "no_hp",
          sortable: false
        },
        {
          text: "Alamat",
          value: "alamat.alamat",
          sortable: false
        },
        {
          text: "",
          value: "id",
          align: "right",
          sortable: false
        }
      ]
    };
  },
  mounted(){
      this.getPetanis();
  },
  methods: {
    async getPetanis() {
      try {
        let response = await this.$axios.get("api/v1/managerkebun");
        this.petanis= response.data.daftar_manager_kebun
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
