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
    <v-col cols="6" md="3" v-for="sop in sops" :key="sop.id">
      <v-hover v-slot="{ hover }" open-delay="200">
        <v-card
          :elevation="hover ? 5 : 2"
          class="mx-auto pb-2 { 'on-hover': hover }"
          color="light-green lighten-4"
          :to="'/panduan/' + sop.id"
        >
          <img src="~assets/img/buah.jpeg" class="background" />
          <v-card-content class="text-h7 mx-3" color="primary accent-4">
            {{ sop.sop_nama }}
          </v-card-content>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      sops: [
        {
          id: "",
          sop_nama: ""
        }
      ]
    };
  },
  mounted() {
    this.getJudulSops();
  },
  methods: {
    async getJudulSops() {
      try {
        let response = await this.$axios.get("api/v1/sop");
        this.sops = response.data.sop;

        console.log(response);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    }
  }
};
</script>

<style>
.background {
  height: auto;
  max-width: 100%;
}
</style>
