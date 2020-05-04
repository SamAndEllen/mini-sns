<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-spacer></v-spacer>

      <router-link to="/" tag="button">
        <div class="d-flex align-center">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://img.icons8.com/color/80/000000/messaging-.png"
            transition="scale-transition"
            width="40"
          />
          <h2 class="ml-2">MINI SNS</h2>
        </div>
      </router-link>

      <v-spacer></v-spacer>

      <router-link to="/signup" tag="button" v-if="!getMemberName">
        <v-btn text>
          <span>Signup</span>
        </v-btn>
      </router-link>
      <router-link to="/login" tag="button" v-if="!getMemberName">
        <v-btn text>
          <span>Login</span>
        </v-btn>
      </router-link>
      <v-btn text v-if="getMemberName" @click="userLogout()">
        <span class="mr-2">{{getMemberName}}님</span>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-bottom-navigation
      color="indigo"
      flat
      fixed
      grow
    >
      <v-btn icon @click="goToPath('/')">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <new-feed />

      <v-btn icon @click="goToPath('/member')">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>

  </v-app>
</template>

<script>
import NewFeed from "./components/NewFeed";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "App",
  components: {
    NewFeed
  },
  computed: {
    ...mapGetters({
      getMemberName: "members/getMemberName"
    })
  },
  methods: {
    ...mapActions({
        resetMemberName: 'members/resetMemberName'
    }),
    async userLogout() {
      if (window.confirm("정말 로그아웃 하시겠습니까?")) {
        axios.post("http://localhost:4000/api/authorizes/logout", {},
          {
            withCredentials: true
          }
        )
        .then(async () => {
          await this.resetMemberName();
          await this.$router.push({ path: '/' });
        });
      }
    },
    goToPath(path) {
      this.$router.push({ path });
    }
  }
};
</script>

<style>
.v-toolbar__content {
  border-bottom: 1px solid #e0e0e0 !important;
}
</style>