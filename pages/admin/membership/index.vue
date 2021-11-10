<template>
  <v-row class="py-5">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">
          Permintaan Membership
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
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="green" dark>
            {{ item.status }}
          </v-chip>
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
      petanis: [
        {
          id: "",
          nama: "",
          no_hp: "",
          status: ""
        }
      ],
      th_petani: [
        {
          text: "ID",
          value: "id",
          align: "center",
          sortable: false
        },
        {
          text: "Nama",
          value: "nama"
        },
        {
          text: "Jenis Kelamin",
          value: "jenis_kelamin"
        },
        {
          text: "Kontak",
          value: "no_hp",
          sortable: false
        },
        {
          text: "Email",
          value: "email",
          sortable: false
        },
        {
          text: "Alamat",
          value: "alamat.alamat",
          sortable: false
        },
        {
          text: "Kabupaten/Kota",
          value: "alamat.regency.name",
          sortable: false
        },
        {
          text: "Status",
          value: "status",
          color: "primary",
          sortable: true
        }
      ]
    };
  },
  mounted() {
    this.getPetanis();
  },
  methods: {
    async getPetanis() {
      try {
        let response = await this.$axios.get("api/v1/member-terdaftar");
        this.petanis = response.data.daftar_member_terdaftar;
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
