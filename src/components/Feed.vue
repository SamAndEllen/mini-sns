<template>
  <v-card
    class="mx-auto pl-1"
    flat
    outlined
  >
    <v-card-title>
        <v-row no-gutters>
            <v-col>
                {{ userName }}
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
                <v-btn icon :color="likeStatus()" @click="onFeedLike()">
                    <v-icon size="30">mdi-heart</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-card-title>

    <v-card-subtitle>
        {{ createdAt }}
    </v-card-subtitle>

    <v-card-text>
        <p class="text--primary">{{ contents }}</p>
        <a v-for="(hashtag, i) in hashtags" :key="i" @click="filterFeed(i)">#{{ hashtag }} </a>
    </v-card-text>

    <v-card-actions class="pa-0 pl-1">
        <v-btn text class="caption">
            <v-icon size="14">mdi-message</v-icon>
            <span class="ml-2">{{ messageCount ? messageCount : 0 }}</span>
        </v-btn>
        <v-btn text class="caption">
            <v-icon size="14">mdi-heart</v-icon>
            <span class="ml-2">{{ heartCount ? heartCount : 0 }}</span>
        </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import axios from 'axios';

export default {
    props: ['feedId', 'userName', 'createdAt', 'contents', 'hashtags', 'messageCount', 'totalLikes', 'isLike'],
    data: () => ({
        isFeedLike: false,
        heartCount: 0,
    }),
    methods: {
        filterFeed(i) {
            this.$emit('filterLoadFeed', this.hashtags[i]);
        },
        async onFeedLike() {
            await axios.post(`http://localhost:4000/api/feeds/${this.feedId}`, Object,
            {
                withCredentials: true
            }
            )
            .then(async () => {
                this.isFeedLike = !this.isFeedLike;
                this.heartCount = this.isFeedLike ? this.heartCount + 1 : this.heartCount - 1;
            })
        },
        likeStatus() {
            let result = '';
            if (this.isFeedLike) result = 'pink';
            return result;
        }
    },
    created() {
        this.isFeedLike = this.isLike;
        this.heartCount = this.totalLikes;
    }
}
</script>

<style>

</style>