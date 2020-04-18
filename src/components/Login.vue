<template>
    <v-content>
        <h1>Login</h1>
        <v-text-field label="User Name" v-model="username" />
        <v-btn @click="userLogin()">Login</v-btn>
    </v-content>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Login",
    data: () => ({
        username: '',
    }),
    methods: {
        ...mapActions({
            setMemberName: 'members/setMemberName'
        }),
        async userLogin() {
            await this.setMemberName(this.username);
            await this.$router.push({ path: '/member' });
        }
    }
}
</script>

<style>
</style>