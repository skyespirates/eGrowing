<template>
  <v-container>
    <template v-if="petanis">
      <v-card class="px-4 py-4">
        <v-row>
          <v-col cols="12">
            <div class="text-overline">
              Profil Petani
            </div>
            <div class="title">
              {{ petani.nama }}
            </div>
          </v-col>
          <v-col cols="12" class="my-0 pt-0">
            <v-divider color="primary"></v-divider>
          </v-col>
          <v-col cols="12" md="6" class="mb-0 pb-0 pb-md-2">
            <v-simple-table class="no-border">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="komponen">Nama</td>
                    <td class="value">{{ petani.nama }}</td>
                  </tr>
                  <tr>
                    <td class="komponen">Nomor HP</td>
                    <td class="value">{{ petani.no_hp }}</td>
                  </tr>
                  <tr>
                    <td class="komponen">Email</td>
                    <td class="value">{{ petani.email }}</td>
                  </tr>
                  <tr>
                    <td class="komponen">Jenis Kelamin</td>
                    <td class="value">{{ petani.jenis_kelamin }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12" md="6" class="mt-0 pt-0 pt-md-2">
            <v-simple-table class="no-border">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="komponen">Alamat</td>
                    <td class="value">{{ petani.alamat.alamat }}</td>
                  </tr>
                  <tr>
                    <td class="komponen">Kota / Kabupaten</td>
                    <td class="value">{{ petani.alamat.regency.name }}</td>
                  </tr>
                  <tr>
                    <td class="komponen">Provinsi</td>
                    <td class="value">
                      {{ petani.alamat.regency.province.name }}
                    </td>
                  </tr>
                  <tr>
                    <td class="komponen">Tanggal Bergabung</td>
                    <td class="value">
                      {{ new Date(petani.created_at).getDate() }}
                      {{ new Date(petani.created_at).getMonth() | monthFormat }}
                      {{ new Date(petani.created_at).getFullYear() }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
          <v-col cols="12">
            <div class="title">
              Data Lahan
            </div>
          </v-col>
          <v-col cols="12" class="my-0 pt-0">
            <v-divider color="primary"></v-divider>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col
                cols="12"
                md="4"
                v-for="project in projectByPetani"
                :key="project.id"
              >
                <v-sheet outlined color="green" rounded>
                  <v-card
                    outlined
                    elevation="0"
                    class="d-flex align-content-start flex-wrap"
                  >
                    <v-card-title>
                      <div class="text-subtitle-1 font-weight-bold">
                        {{ project.nama_sop }}
                      </div>
                    </v-card-title>
                    <v-card-text>
                      <div class="text-body1">
                        Alamat: {{ project.alamat }}, {{ project.kota_kab }}
                      </div>
                      <div class="text-body1 ">
                        Jumlah Blok: {{ project.jumlah_blok }}
                      </div>
                      <div class="text-body1 ">
                        Dibuat pada:
                        {{ new Date(project.created_at).getDate() }}
                        {{
                          new Date(project.created_at).getMonth() | monthFormat
                        }}
                        {{ new Date(project.created_at).getFullYear() }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-sheet>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  // middleware: "permission",
  data() {
    return {
      petanis: false,
      petani: {
        nama: "",
        jenis_kelamin: "",
        alamat: "",
        no_hp: "",
        email: "",
        password: "",
        alamat: "",
        regencies_id: ""
      },
      kota: [],
      projects: "",
      projectByPetani: []
    };
  },
  mounted() {
    this.getKota();
    this.getPetani();
    this.getProjects();
  },

  methods: {
    async getKota() {
      try {
        let response = await this.$axios.get("/api/v1/kota");
        this.kota = response.data.kota;

        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getPetani() {
      try {
        let response = await this.$axios.get(
          "api/v1/manager-kebun/" + this.$route.params.id
        );
        this.petani = response.data.user;
        this.petanis = true;
        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async getProjects() {
      try {
        let response = await this.$axios.get("api/v1/project/");
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
        if (this.projects[index].manager_kebun_id == this.petani.id) {
          this.projectByPetani.push({
            idx: index + 1,
            id: this.projects[index].id,
            nama_sop: this.projects[index].sop.sop_nama,
            nama_tahapan: this.projects[index].tahapan_sop.nama_tahapan,
            alamat: this.projects[index].alamat.alamat,
            created_at: this.projects[index].created_at,
            kota_kab: this.projects[index].alamat.regency.name,
            jumlah_blok: this.projects[index].blok_lahan.length
          });
        }
      }
      if (this.projectByPetani[0].id == "") {
        this.projectByPetani.splice(0, 1);
      }
    }
  }
};
</script>

<style lang="scss">
.no-border td {
  border-bottom: none !important;
}
tbody {
  tr:hover {
    background-color: transparent !important;
  }
  .komponen {
    width: 30%;
  }
  .value {
    width: 70%;
  }
}
</style>
