<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="font-weight-bold headline">로그인</span>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-text-field
          v-model="email"
          label="이메일 아이디"
          name="email"
          v-validate="'required|email|max:50'"
        />
        <v-alert dense outlined color="error" v-if="errors.has('email')">{{errors.first('email')}}</v-alert>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-text-field type="password" v-model="password" label="비밀번호" name="password" ref="password"
          v-validate="{ required: true, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/ }"
        />
        <v-alert
          dense
          outlined
          color="error"
          v-if="errors.has('password')"
        >{{errors.first('password')}}</v-alert>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-btn block tile large color="primary" class="font-weight-bold title" @click="userLogin()">
          <v-icon left>mdi-login</v-icon>
          <span>로그인</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    async userLogin() {
      await this.$validator.validateAll();

      if (!this.errors.any()) {
        axios.post("http://localhost:4000/api/authorizes/login",
          {
            email: this.email,
            password: this.password
          }, {
            withCredentials: true
          }
        )
        .then(async () => {
          await this.$router.push({ path: '/member' });
        })
        .catch(err => {
          alert(err.response.data.error);
        });
      }
    }
  }
};
</script>

<style>
</style>