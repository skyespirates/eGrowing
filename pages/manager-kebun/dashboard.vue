<template>
  <v-row class="mb-xs-0 py-xs-0 py-md-7">
    <v-col cols="12">
      <div class="d-flex">
        <div class="title">Panduan Budidaya</div>
      </div>
    </v-col>
    <v-col cols="12" class="my-0 pt-0">
      <v-divider color="primary"></v-divider>
    </v-col>
    <v-col cols="6" md="3" v-for="kom in komoditas" :key="kom.id">
      <v-hover v-slot="{ hover }" open-delay="200">
        <v-card
          :elevation="hover ? 5 : 2"
          class="mx-auto pb-2 { 'on-hover': hover }"
        >
          <v-img
            v-bind:src="kom.foto"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title class="py-0" v-text="kom.nama_komoditas">
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
                  :to="'/admin/sop/' + kom.nama_komoditas"
                  ><v-icon color="blue">mdi-information-outline</v-icon></v-btn
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
                  @click="hapusKomoditas(kom.id)"
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
</template>

<script>
export default {
  data() {
    return {
      komoditas: [],
    };
  },
  mounted() {
    this.getJudulSops();
  },
  methods: {
    async getJudulSops() {
      try {
        let response = await this.$axios.get("api/v1/komoditas");
        this.komoditas = response.data.data;
      } catch (err) {
        this.error = true;
        console.log(err);
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
