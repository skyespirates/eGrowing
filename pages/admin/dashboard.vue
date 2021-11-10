<template>
  <v-row class="mt-3 mx-2">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">
          Dashboard
        </div>
      </div>
    </v-col>
    <v-row>
      <v-col>
        <v-card color="white" elevation="4">
          <v-list-item two-line>
            <v-list-item-avatar
              tile
              size="55"
              color="warning"
              class="rounded-lg"
              ><v-icon large color="white">
                mdi-tractor</v-icon
              ></v-list-item-avatar
            >
            <v-list-item-content class="my-2" block>
              <v-list-item-subtitle class="overline text-capitalize"
                >Tahap Persiapan
              </v-list-item-subtitle>
              <br />
              <v-list-item-title class="font-weight-black"
                >3 Kebun</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="white" elevation="4">
          <v-list-item two-line>
            <v-list-item-avatar
              tile
              size="55"
              color="success"
              class="rounded-lg"
              ><v-icon large color="white">
                mdi-watering-can</v-icon
              ></v-list-item-avatar
            >
            <v-list-item-content class="my-2" block>
              <v-list-item-subtitle class="overline text-capitalize"
                >Tahap Perawatan
              </v-list-item-subtitle>
              <br />
              <v-list-item-title class="font-weight-black">
                5 Kebun</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="white" elevation="4">
          <v-list-item two-line>
            <v-list-item-avatar tile size="55" color="info" class="rounded-lg"
              ><v-icon large color="white">
                mdi-fruit-cherries</v-icon
              ></v-list-item-avatar
            >
            <v-list-item-content class="my-2" block>
              <v-list-item-subtitle class="overline text-capitalize"
                >Tahap Panen
              </v-list-item-subtitle>
              <br />
              <v-list-item-title class="font-weight-black"
                >0 Kebun</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-col cols="12" class="pb-0 mt-5">
      <div class="title">
        Daftar Kebun yang Sedang Tahap Pemanenan
      </div>
    </v-col>
    <v-col cols="12">
      <v-data-table :headers="tabel_baru" :items="tahap1">
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
  </v-row>
  <!-- <v-row justify="center">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">
          Dashboard
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title class="subtitle-2">
          Jumlah kebun
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <v-list-item-avatar>
                  
                </v-list-item-avatar>
                <v-card-title class="justify-center text-h2"></v-card-title>
                <v-card-subtitle class="text-center"
                  >Tahap Persiapan</v-card-subtitle
                >
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card>
                <v-card-title class="justify-center text-h2">5</v-card-title>
                <v-card-subtitle class="text-center"
                  >Tahap Perawatan</v-card-subtitle
                >
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card>
                <v-card-title class="justify-center text-h2">5</v-card-title>
                <v-card-subtitle class="text-center"
                  >Tahap Panen</v-card-subtitle
                >
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="5">
      <maintenance/>
    </v-col>
  </v-row> -->
</template>

<script>
import Maintenance from "../../components/Maintenance.vue";
export default {
  // middleware: "permission",
  data() {
    return {
      lahans: [
        {
          id: "",
          lokasi_lahan: "",
          nama_buah: "",
          tahapan: ""
        }
      ],
      tahap1: [],
      th_lahan: [
        {
          text: "Produk Budidaya",
          value: "nama_buah"
        },
        {
          text: "Lokasi Lahan",
          value: "lokasi_lahan"
        },
        {
          text: "Tahapan",
          value: "tahapan"
        },
        {
          text: "Aksi",
          value: "id",
          align: "center",
          sortable: false
        }
      ],
      tabel_baru: [
        {
          text: "Produk Budidaya",
          value: "a"
        },
        {
          text: "Lokasi Lahan",
          value: "b"
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
        this.getTahapanLahan();
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getTahapanLahan() {
      for (let index = 0; index < this.lahans.length; index++) {
        if (this.lahans[index].tahapan == "Tahap Pemanenan") {
          this.tahap1.push({
            a: this.lahans[index].nama_buah,
            b: this.lahans[index].lokasi_lahan
          });
        }
      }
    }
  }
};
</script>

<style></style>
