<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon x-large>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">새 피드 작성</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Contents" v-model="contents" 
                name="contents" v-validate="'required'" 
              />
              <v-alert dense outlined color="error" v-if="errors.has('contents')">
                {{errors.first('contents')}}
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onClose()">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onSave()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      contents: '',
      dialog: false
    };
  },
  methods: {
    async onSave() {
      await this.$validator.validateAll();
      if (!this.errors.any()) {
        axios.post('http://localhost:4000/api/feeds',
          {
            contents: this.contents
          }, {
            withCredentials: true
          }
        )
        .then(async () => {
          await alert("피드 등록이 완료되었습니다.");
          if (this.$route.path === '/') {
            this.$router.go();
          } else {
            this.contents = '';
            this.dialog = false;
            this.$router.push({ path: '/' });
          }
        })
        .catch(err => {
          this.status = err.response.status;
        });
      }
    },
    onClose() {
      this.contents = '';
      this.dialog = false;
    }
  }
};
</script>

<style>
</style>