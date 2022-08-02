<template>
  <v-row class="py-5">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">Project Tanam</div>
        <div class="ml-auto">
          <v-btn
            rounded
            class="text-none text-caption px-7"
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
      <v-data-table :headers="th" :items="projectByPetani" :search="cari">
        <template v-slot:[`item.created_at`]="{ item }">
          {{ new Date(item.created_at).getDate() }}
          {{ new Date(item.created_at).getMonth() | monthFormat }}
          {{ new Date(item.created_at).getFullYear() }}
        </template>

        <template v-slot:[`item.nama_sop`]="{ item }">
          <div class="font-weight-bold">{{ item.nama_sop }}</div>
          <!-- <div>{{ item.nama_tahapan }}</div> -->
        </template>

        <template v-slot:[`item.alamat`]="{ item }">
          <div>{{ item.alamat }}, {{ item.kota_kab }}</div>
        </template>

        <template v-slot:[`item.aksi`]="{ item }">
          <v-btn
            color="primary"
            :to="'/manager-kebun/pencatatan/tambah/' + item.id"
            class="px-5 text-none text-caption small"
            rounded
            >Catat Aktivitas</v-btn
          >
          <v-btn
            color="primary"
            :to="'/manager-kebun/project-tanam/' + item.id"
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
      projects: "",
      projectByPetani: [],
      th: [
        {
          text: "ID",
          value: "idx",
          width: "6%",
        },
        {
          text: "Mulai Project",
          value: "created_at",
          width: "14%",
        },
        {
          text: "Alamat",
          value: "alamat",
          sortable: false,
          width: "20%",
        },
        {
          text: "",
          value: "aksi",
          align: "right",
          sortable: false,
          width: "30%",
        },
      ],
    };
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    async getProjects() {
      try {
        let response = await this.$axios.get("api/v1/project");
        this.projects = response.data.data;
        console.log(response);
        this.getProjectByPetani();
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getProjectByPetani() {
      for (let index = 0; index < this.projects.length; index++) {
        if (
          this.projects[index].manager_kebun_id ==
          this.$auth.$state.user.manager_kebun.id
        ) {
          this.projectByPetani.push({
            idx: index + 1,
            id: this.projects[index].id,
            nama_sop: this.projects[index].sop.sop_nama,
            // nama_tahapan: this.projects[index].tahapan_sop.nama_tahapan,
            alamat: this.projects[index].alamat.alamat,
            created_at: this.projects[index].created_at,
            kota_kab: this.projects[index].alamat.regency.name,
            jumlah_blok: this.projects[index].blok_lahan.length,
          });
        }
      }
      if (this.projectByPetani[0].a == "") {
        this.projectByPetani.splice(0, 1);
      }
    },
  },
};
</script>

<style></style>
