<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span class="font-weight-bold headline">회원가입</span>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-text-field v-model="userName" label="이름"></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-text-field v-model="email" label="이메일 아이디"></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-text-field type="password" v-model="password" label="비밀번호"></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-text-field type="password" v-model="checkPassword" label="비밀번호 확인"></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-checkbox v-model="agreeTOS" label="이용약관에 동의합니다.(필수)"></v-checkbox>
      </v-col>
      <v-col cols="12" md="12">
        <v-checkbox v-model="agreePrivacy" label="개인정보 수집ㆍ이용에 동의합니다.(필수)"></v-checkbox>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <v-btn 
            block tile outlined large 
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
    }),
    methods: {
        signUp() {
            axios.post('http://localhost:4000/api/members',
                { name: this.userName,
                  email: this.email,
                  password: this.password,
                  agreeTOS: this.agreeTOS,
                  agreePrivacy: this.agreePrivacy
                }
              ).then(res => {
              console.log(res.data);
            });
        }
    }
};
</script>

<style scoped>
.v-input--selection-controls {
  padding: 0;
  margin: 0;
}
.v-btn--outlined {
    border: solid currentColor;
}
.v-btn__content .v-icon--left, .v-btn__content .v-icon--right {
    font-size: 20px;
}
</style>