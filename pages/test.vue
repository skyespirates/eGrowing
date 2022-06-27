<template>
  <div>
    <h1>Hello World</h1>
    <ul v-for="user in users" :key="user.id">
      <li>{{ user.jenis_kelamin }}</li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      users: "",
    };
  },
  methods: {
    async asyncData() {
      try {
        let response = await axios.get(
          "http://localhost:8000/api/v1/member-terdaftar"
        );
        this.users = response.data.daftar_member_terdaftar;
        console.log(this.users);
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.asyncData();
  },
};
</script>
