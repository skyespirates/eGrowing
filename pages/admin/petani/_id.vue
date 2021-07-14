<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex">
          <div class="title">
            Profil Petani
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row>
            <v-col cols="6">
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td>Nama</td>
                      <td>{{ petani.nama }}</td>
                    </tr>
                    <tr>
                      <td>Jenis kelamin</td>
                      <td>{{ petani.jenis_kelamin }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
            <v-col cols="6">
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td>Nomor HP</td>
                      <td>{{ petani.no_hp }}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{{ petani.email }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      petani: {
        nama: "",
        jenis_kelamin: "",
        no_hp: "",
        email: "",
        password: "",
        alamat: "",
        regencies_id: ""
      },
      kota: []
    };
  },
  mounted() {
    this.getKota();
    this.getPetani();
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

        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
    async postPetani() {
      try {
        let response = await this.$axios.post(
          "api/v1/manager-kebun/create",
          this.petani
        );
        console.log(response);
        this.$router.push("/admin/petani");
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
