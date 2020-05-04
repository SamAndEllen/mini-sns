<template>
  <v-content>
    <h1>Member</h1>
    <div>{{ getMemberName }} 님 안녕하세요.</div>
    <router-link to="/login" tag="button">
      <v-btn>Login</v-btn>
    </router-link>
    <router-link to="/member" tag="button">
      <v-btn>Member</v-btn>
    </router-link>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Member",
  computed: {
    ...mapGetters({
      getMemberName: "members/getMemberName"
    })
  },
};
</script>

<style>
</style>