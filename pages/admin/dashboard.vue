<template>
  <v-row justify="center">
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
                <v-card-title class="justify-center text-h2">5</v-card-title>
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
  </v-row>
</template>

<script>
import Maintenance from '../../components/Maintenance.vue';
export default {
  components: { Maintenance },};
</script>

<style></style>
