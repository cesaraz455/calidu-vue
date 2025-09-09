<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FeedPost from './components/FeedPost.vue';
import postsData from './data/posts.json';

interface PostData {
  id: string;
  startedUserName: string;
  creatorUserName: string;
  numberOfStarts: number;
  description: string | null;
  numberOfLikes: number;
  numberOfComments: number;
  numberOfShares: number;
  creatorProfilePictureUrl: string | null;
  startedUserProfilePictureUrl: string | null;
}

const posts = ref<PostData[]>([]);

onMounted(() => {
  posts.value = postsData;
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" lg="6" class="mx-auto">
        <h1 class="text-h4 mb-6">University Feed</h1>

        <FeedPost
          v-for="post in posts"
          :key="post.id"
          :id="post.id"
          :started-user-name="post.startedUserName"
          :creator-user-name="post.creatorUserName"
          :number-of-starts="post.numberOfStarts"
          :description="post.description"
          :number-of-likes="post.numberOfLikes"
          :number-of-comments="post.numberOfComments"
          :number-of-shares="post.numberOfShares"
          :creator-profile-picture-url="post.creatorProfilePictureUrl"
          :started-user-profile-picture-url="post.startedUserProfilePictureUrl"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-container {
  padding-top: 2rem;
}
</style>
