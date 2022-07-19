<template>
  <v-app>
    <v-btn icon color="primary" @click="back"
      ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <v-form>
      <h2>Tambah SOP Baru</h2>
      <v-card class="py-5 px-5 mb-5">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Deskripsi"
              outlined
              dense
              hide-details=""
              v-model="sop.deskripsi"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Estimasi Panen"
              outlined
              dense
              hide-details=""
              v-model="sop.estimasi_panen"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Kalkulasi Bobot Panen"
              outlined
              dense
              hide-details=""
              v-model="sop.kalkulasi_bobot_panen"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Kalkulasi Waktu Panen"
              outlined
              dense
              hide-details=""
              v-model="sop.kalkulasi_waktu_panen"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <h2>Tahapan</h2>
      <v-card
        class="py-5 px-5 mb-3"
        v-for="(detail, i_detail_sop) in sop.detail_sop"
        :key="i_detail_sop"
      >
        <v-row align="center" class="mb-5">
          <v-col cols="12">
            <v-text-field
              v-model="detail.nama_tahapan"
              label="Nama Tahapan"
              outlined
              dense
              id="nama_tahapan"
              hide-details=""
              :name="Math.random()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card
          class="px-5 py-3 mb-3"
          v-for="(keg, i_kegiatan) in detail.kegiatan"
          :key="i_kegiatan"
        >
          <v-row>
            <v-col cols="10">
              <v-text-field
                label="Nama Kegiatan"
                outlined
                dense
                id="nama_tahapan"
                hide-details=""
                v-model="keg.nama_kegiatan"
                :name="Math.random()"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="Durasi Waktu"
                outlined
                dense
                id="durasi_waktu"
                hide-details=""
                v-model="keg.durasi_waktu"
                :name="Math.random()"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            v-for="(indikator, i_indikator) in keg.indikator"
            :key="i_indikator"
          >
            <v-col cols="12">
              <v-row no-gutters>
                <v-col cols="12" md="7">
                  <v-text-field
                    outlined
                    dense
                    hide-details
                    label="Indikator *"
                    v-model="indikator.nama_indikator"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="mb-3 d-flex" md="5">
                  <v-select
                    outlined
                    dense
                    persistent-placeholder
                    hide-details
                    :items="tipeJawaban"
                    item-value="id"
                    item-text="tipe"
                    class="ml-md-2"
                    label="Tipe jawaban *"
                    v-model="indikator.tipe_jawaban_id"
                  ></v-select>
                  <v-btn
                    @click="
                      hapusIndikator(i_detail_sop, i_kegiatan, i_indikator)
                    "
                    icon
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-btn
            block
            rounded
            @click="tambahIndikator(i_detail_sop, i_kegiatan)"
            >Tambah indikator</v-btn
          >
        </v-card>
        <v-btn
          rounded
          @click="tambahKegiatan(i_detail_sop)"
          color="blue-grey"
          block
          class="my-5 white--text"
          >Tambah Kegiatan</v-btn
        >
      </v-card>
      <v-btn color="primary" block rounded @click="tambahTahapan"
        >Tambah Tahapan</v-btn
      >
      <div class="d-flex justify-end">
        <v-btn color="primary" @click="submitSOP" rounded>Simpan</v-btn>
      </div>
    </v-form>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sop: {
        jenis_komoditas_id: 3,
        deskripsi: "",
        estimasi_panen: "",
        kalkulasi_bobot_panen: "",
        kalkulasi_waktu_panen: "",
        detail_sop: [
          {
            nama_tahapan: "",
            kegiatan: [
              {
                nama_kegiatan: "",
                durasi_waktu: "",
                indikator: [
                  {
                    nama_indikator: "",
                    tipe_jawaban_id: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      komoditas: "",
      tipeJawaban: [],
    };
  },
  mounted() {
    this.getTipeJawaban();
    this.komoditas = this.$route.params.komoditas;
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getTipeJawaban() {
      try {
        const response = await this.$axios.get("api/v1/tipe-jawaban");
        this.tipeJawaban = response.data.data;
      } catch (error) {
        console.log(error.message);
      }
    },
    tambahIndikator(index_detail_sop, index_kegiatan) {
      const indikator = {
        nama_indikator: "",
        tipe_jawaban_id: "",
      };
      this.sop.detail_sop[index_detail_sop].kegiatan[
        index_kegiatan
      ].indikator.push(indikator);
    },
    hapusIndikator(index_detail_sop, index_kegiatan, index_indikator) {
      this.sop.detail_sop[index_detail_sop].kegiatan[
        index_kegiatan
      ].indikator.splice(index_indikator, 1);
    },
    tambahKegiatan(index_detail_sop) {
      this.sop.detail_sop[index_detail_sop].kegiatan.push({
        nama_kegiatan: "",
        durasi_waktu: "",
        indikator: [
          {
            nama_indikator: "",
            tipe_jawaban_id: "",
          },
        ],
      });
    },
    tambahTahapan() {
      this.sop.detail_sop.push({
        nama_tahapan: "",
        kegiatan: [
          {
            nama_kegiatan: "",
            durasi_waktu: "",
            indikator: [
              {
                nama_indikator: "",
                tipe_jawaban_id: "",
              },
            ],
          },
        ],
      });
    },
    async submitSOP() {
      try {
        let response = await this.$axios.post("api/v1/sop", this.sop);
        console.log(response);
        this.$router.push("/admin/sop/" + this.komoditas);
      } catch (err) {
        this.error = true;
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
