<template>
  <div>
    <div>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-form @submit.prevent="submit">
            <v-card-title>
              <span class="text-h5">Tambah Jenis Buah</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Nama Buah*"
                      v-model="nama_komoditas"
                      value="nama_komoditas"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-file-input
                      truncate-length="15"
                      dense
                      label="Gambar*"
                      prepend-icon="mdi-camera"
                      v-model="foto"
                      @change="handleChange"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="dialog = false"> Tutup </v-btn>
              <v-btn color="primary" text> Simpan </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
    <v-row class="mb-xs-0 py-xs-0 py-md-7">
      <v-col cols="12">
        <div class="d-flex">
          <div class="title">Standar Operasional Prosedur</div>
          <div class="ml-auto">
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  rounded
                  class="text-none text-caption px-7"
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon> Tambah Jenis Buah
                </v-btn>
              </template>
            </v-dialog>
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
      </v-col>
      <v-col cols="6" md="3" v-for="fruit in fruits" :key="fruit.id">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card
            :elevation="hover ? 5 : 2"
            class="mx-auto pb-2 { 'on-hover': hover }"
            color="light-green lighten-4"
            :to="'/admin/sop/' + fruit.id"
          >
            <img v-bind:src="fruit.foto" class="background" />
            <v-card-title class="py-0" color="primary accent-4">
              {{ fruit.nama_komoditas }}
            </v-card-title>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cari: "",
      nama_komoditas: "",
      foto: "",
      fruits: [],
      active: false,
      dialog: false,
    };
  },
  mounted() {
    this.getSOP();
  },
  methods: {
    async submit() {
      try {
        // let response = { nama_komoditas: this.nama_komoditas, foto: this.foto };
        let response = await this.$axios.post("api/v1/komoditas", {
          nama_komoditas: this.nama_komoditas,
          foto: this.foto,
        });
        console.log(response);
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    toggle: function () {
      this.active = !this.active;
    },
    async getSOP() {
      try {
        let response = await this.$axios.get("api/v1/komoditas");
        this.fruits = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    handleChange(e) {
      this.foto = e;
    },
  },
};
</script>

<style>
.background {
  height: auto;
  max-width: 100%;
}
</style>
