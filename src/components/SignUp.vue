<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="font-weight-bold headline">회원가입</span>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-text-field v-model="userName" label="이름" name="userName" v-validate="'required'" />
        <v-alert dense outlined color="error" v-if="errors.has('userName')">
          {{errors.first('userName')}}
        </v-alert>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-text-field v-model="email" label="이메일 아이디" name="email" v-validate="'required|email|max:50'" />
        <v-alert dense outlined color="error" v-if="errors.has('email')">
          {{errors.first('email')}}
        </v-alert>
        <v-alert dense outlined color="error" v-if="status === 409">
          Duplicate ID
        </v-alert>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-text-field type="password" v-model="password" label="비밀번호" name="password" ref="password"
          v-validate="{ required: true, regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/ }" />
        <v-alert dense outlined color="error" v-if="errors.has('password')">
          {{errors.first('password')}}
        </v-alert>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-text-field type="password" v-model="checkPassword" label="비밀번호 확인" name="password_confirmation" 
          v-validate="'required|confirmed:password'" data-vv-as="password" />
        <v-alert dense outlined color="error" v-if="errors.has('password_confirmation')">
          {{errors.first('password_confirmation')}}
        </v-alert>
      </v-col>
    </v-row>
    <v-row class="mt-3 mb-3" no-gutters>
      <v-col cols="12" md="12">
        <v-checkbox v-model="agreeTOS" name="agreeTOS" label="이용약관에 동의합니다.(필수)" />
      </v-col>
      <v-col cols="12" md="12">
        <v-checkbox v-model="agreePrivacy" name="agreePrivacy" label="개인정보 수집ㆍ이용에 동의합니다.(필수)" />
      </v-col>
      <v-col cols="12" md="12">
        <v-alert dense outlined color="error" v-if="isDoingSignUp && (!agreeTOS || !agreePrivacy)">
          The agreeTOS and agreePrivacy isn't agree. Please checked agree.
        </v-alert>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-btn 
          block tile large 
          color="primary" 
          class="font-weight-bold title"
          @click="signUp()"
        >
            <v-icon left>mdi-file-edit-outline</v-icon>
            <span>회원가입</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    userName: '',
    email: '',
    password: '',
    checkPassword: '',
    agreeTOS: false,
    agreePrivacy: false,
    isDoingSignUp: false,
    status: 200
  }),
  methods: {
    async signUp() {
      await this.$validator.validateAll();
      this.isDoingSignUp = true;

      if (!this.errors.any() && this.agreeTOS && this.agreePrivacy) {
        axios.post('http://localhost:4000/api/members',
          { name: this.userName,
            email: this.email,
            password: this.password,
            agreeTOS: this.agreeTOS,
            agreePrivacy: this.agreePrivacy
          }
        )
        .then(async res => {
          this.status = res.status;
          alert("가입이 정상적으로 완료되었습니다.");
          await this.$router.push({ path: '/' });
        })
        .catch(err => {
          this.status = err.response.status;
        });
      }
    }
  }
};
</script>

<style scoped>
</style>