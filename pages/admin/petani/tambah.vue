<template>
  <v-container>
    <v-row class="py-5">
      <v-col cols="12">
        <div class="d-flex">
          <div class="title">
            Tambah Petani
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <v-form @submit.prevent="postPetani">
          <v-row>
            <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="nama">Nama </label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                    outlined
                    hide-details=""
                    dense
                    v-model="petani.nama"
                    id="nama"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="jenis_kelamin">Jenis kelamin</label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-select
                    outlined
                    overflow-y
                    :items="['Laki - laki', 'Perempuan']"
                    hide-details=""
                    v-model="petani.jenis_kelamin"
                    dense
                    id="jenis_kelamin"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="nomor_hp">Nomor Handphone</label>
                </v-col>
                <v-col cols="12" md="9" class="d-flex">
                  <v-text-field
                    outlined
                    hide-details=""
                    dense
                    v-model="petani.no_hp"
                    id="nomor_hp"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="email">Email</label>
                </v-col>
                <v-col cols="12" md="9" class="d-flex">
                  <v-text-field
                    outlined
                    hide-details=""
                    dense
                    v-model="petani.email"
                    id="email"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="password">Password</label>
                </v-col>
                <v-col cols="12" md="9" class="d-flex">
                  <v-text-field
                    outlined
                    hide-details=""
                    dense
                    v-model="petani.password"
                    id="password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row align="start" no-gutters>
                <v-col cols="12" md="3">
                  <label for="alamat">Alamat</label>
                </v-col>
                <v-col cols="12" md="9">
                  <v-textarea
                    outlined
                    hide-details=""
                    rows="3"
                    dense
                    v-model="petani.alamat"
                    id="alamat"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="kokab">Kota / kabupaten</label>
                </v-col>
                <v-col cols="12" md="9" class="d-flex">
                  <v-autocomplete
                    outlined
                    item-text="name"
                    item-value="id"
                    :items="kota"
                    v-model="petani.regencies_id"
                    hide-details=""
                    dense
                    id="kokab"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-col>
            <!-- <v-col cols="12">
              <v-row align="center" no-gutters>
                <v-col cols="12" md="3">
                  <label for="">Tipe Akun</label>
                </v-col>
                <v-col cols="12" md="9" class="d-flex">
                  <v-radio label="Mitra"></v-radio>
                  <v-radio label="Umum" class="ml-12"></v-radio>
                </v-col>
              </v-row>
            </v-col> -->
            <v-col cols="12">
              <v-btn block color="primary" type="submit">Simpan</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <!-- <pre>
        {{ petani }}
    </pre> -->
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
    async postPetani() {
      try {
        let response = await this.$axios.post("api/v1/manager-kebun/create",this.petani);
        console.log(response);
        this.$router.push('/admin/petani')
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
  }
};
</script>

<style></style>
