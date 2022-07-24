<template>
  <div>
    <v-row>
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
                            @change="handleChange"
                            v-model="foto"
                          ></v-file-input>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialog = false"> Tutup </v-btn>
                    <v-btn color="primary" type="submit" text> Simpan </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-alert dense text dismissible type="success" :value="alert">
          Berhasil menghapus komoditas
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" md="3" v-for="fruit in fruits" :key="fruit.id">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card
            :elevation="hover ? 5 : 2"
            class="mx-auto pb-2 { 'on-hover': hover }"
          >
            <v-img
              v-bind:src="fruit.foto"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="py-0" v-text="fruit.nama_komoditas">
              </v-card-title>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    :to="'/admin/sop/' + fruit.nama_komoditas"
                    ><v-icon color="blue"
                      >mdi-information-outline</v-icon
                    ></v-btn
                  >
                </template>
                <span>daftar SOP</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="hapusKomoditas(fruit.id)"
                    ><v-icon color="red">mdi-delete</v-icon></v-btn
                  >
                </template>
                <span>hapus komoditas</span>
              </v-tooltip>
            </v-card-actions>
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
      nama_komoditas: "",
      foto: [],
      file: "",
      fruits: [],
      dialog: false,
      alert: false,
    };
  },
  mounted() {
    this.getSOP();
    if (alert) {
      window.setInterval(() => {
        this.alert = false;
      }, 5000);
    }
  },
  methods: {
    async submit() {
      const formData = new FormData();
      formData.append("nama_komoditas", this.nama_komoditas);
      formData.append("foto", this.file);
      try {
        await this.$axios.post("api/v1/komoditas", formData);
        this.nama_komoditas = "";
        this.foto = "";
        this.dialog = false;
        this.getSOP();
      } catch (error) {
        console.log(error);
      }
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
      this.file = e;
    },
    async hapusKomoditas(id) {
      try {
        const response = await this.$axios.delete("api/v1/komoditas/" + id);
        this.fruits = this.fruits.filter((e) => e.id !== id);
        this.alert = true;
      } catch (error) {
        this.error = true;
        console.log(error.message);
      }
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
