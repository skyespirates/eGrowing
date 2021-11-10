<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" class="py-5">
      <div class="">
        <div class="title">Laporan Harian</div>
        <div class="subtitle-2">
          Laporan kegiatan budidaya oleh Manajer Kebun pada tanggal
          {{ currentDate() }}
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
      <v-data-table
        :headers="th_laporan"
        :items="laporanHariIni"
        :search="cari"
      >
        <template v-slot:[`item.created_at`]="{ item }">
          <span>
            {{ new Date(item.created_at).getDate().toLocaleString() }}
            {{ new Date(item.created_at).getMonth() | monthFormat }}
            {{ new Date(item.created_at).getFullYear() }}
            {{
              new Date(item.created_at)
                .getHours()
                .toLocaleString()
                .padStart(2, "0")
            }}:{{
              new Date(item.created_at)
                .getMinutes()
                .toLocaleString()
                .padStart(2, "0")
            }}
          </span>
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <v-btn
            color="primary"
            :to="'/admin/laporan/' + item.id"
            outlined
            class=" px-12 text-none text-button font-weight-medium"
            rounded
            >Detail</v-btn
          >
        </template>
      </v-data-table>
    </v-col>
    <!-- <v-col cols="12" v-for="lp in laporanHariIni" :key="lp.id">
      <v-card>
        <v-card-title>{{
          lp.blok_lahan.project_tanam.sop.sop_nama
        }}</v-card-title>
        <v-card-subtitle>{{ lp.created_at }}</v-card-subtitle>
        <v-card-text>
          <pre>{{ lp.blok_lahan }}</pre>
          <div>Manager kebun {{ lp.blok_lahan.project_tanam.manager_kebun.nama }}</div>
          <div>Project tanam {{ lp.blok_lahan.project_tanam.id }}</div>
          <div class="mb-3">Blok {{ lp.blok_lahan_id }}</div>
          <div class="subtitle-2">{{ lp.tahapan.nama_tahapan }}</div>
          {{ lp.catatan }}
        </v-card-text>
      </v-card>
    </v-col> -->
  </v-row>
</template>

<script>
import Maintenance from "../../../components/Maintenance.vue";
export default {
  // middleware: "permission",
  components: { Maintenance },
  data() {
    return {
      cari: "",
      laporanHariIni: [
        {
          id: "",
          created_at: ""
        }
      ],
      th_laporan: [
        {
          text: "Tanggal",
          value: "created_at"
        },
        {
          text: "Nama Petani",
          value: "blok_lahan.project_tanam.manager_kebun.nama"
        },
        {
          text: "Lokasi Lahan",
          value: "blok_lahan.project_tanam.alamat_id"
        },
        {
          text: "Produk",
          value: "blok_lahan.project_tanam.sop.sop_nama"
        },
        {
          text: "Aktivitas",
          value: "tahapan.nama_tahapan"
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
    this.getLaporanHariIni();
  },
  methods: {
    async getLaporanHariIni() {
      try {
        let response = await this.$axios.get("api/v1/laporan");
        this.laporanHariIni = response.data.data;
        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    currentDate() {
      var months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
      ];
      const current = new Date();
      const date = `${current.getDate()} ${
        months[current.getMonth()]
      } ${current.getFullYear()}`;
      return date;
    }
  }
};
</script>

<style></style>
