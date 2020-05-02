<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p text class="font-weight-bold headline" v-if="isAll">
            전체
        </p>
        <p text class="font-weight-bold headline pl-0" v-else>
            검색결과
        </p>
        <v-chip v-if="!isAll" close @click:close="allFeedData()">
            {{ filter }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="12">
        <feed
          v-for="(feed, i) in feeds"
          :key="i"
          :feedId="feed.id"
          :userName="feed.userName"
          :createdAt="feed.created_at"
          :contents="feed.contents"
          :hashtags="feed.hashtags"
          :messageCount="0"
          :totalLikes="feed.total_likes"
          :isLike="feed.isLike"
          @filterLoadFeed="filterLoadFeed"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Feed from "./Feed";

export default {
  components: {
    Feed
  },
  data() {
    return {
      feeds: [],
      isAll: true,
      filter: '',
    };
  },
  methods: {
    async filterLoadFeed(hashtag) {
      await axios
        .get("http://localhost:4000/api/feeds", {
          params: {
            hashtag
          },
          withCredentials: true
        })
        .then(res =>
            { 
                this.feeds = res.data;
                this.isAll = false;
                this.filter = hashtag;
            }
        )
        .catch(err => {
          alert(err.response.data.error);
        });
    },
    async allFeedData() {
        await axios
        .get("http://localhost:4000/api/feeds", {
            withCredentials: true
        })
        .then(res =>
            { 
                this.feeds = res.data;
                this.isAll = true;
            }
        )
        .catch(err => {
            alert(err.response.data.error);
        });
    }
  },
  async created() {
    await this.allFeedData();
  }
};
</script>

<style>
</style>