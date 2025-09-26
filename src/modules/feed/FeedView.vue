<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDisplay } from 'vuetify';
import FeedPost, { type FeedPostProps } from './components/FeedPost.vue';
import CustomModal from '@shared/components/CustomModal.vue';
import BottomSheet from '@shared/components/BottomSheet.vue';
import postsData from './data/posts.json';
import likesData from './data/likes.json';

interface Like {
  id: number;
  name: string;
  avatar: string;
}

const { mobile } = useDisplay();
const posts = ref<FeedPostProps[]>([]);
const showLikesModal = ref(false);
const showLikesBottomSheet = ref(false);
const currentLikes = ref<Like[]>(likesData);

const handleLikesClick = async () => {
  if (mobile.value) {
    showLikesBottomSheet.value = true;
  } else {
    showLikesModal.value = true;
  }
};

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
          :started-user-id="post.startedUserId"
          :creator-user-name="post.creatorUserName"
          :creator-user-id="post.creatorUserId"
          :number-of-starts="post.numberOfStarts"
          :description="post.description"
          :number-of-likes="post.numberOfLikes"
          :number-of-comments="post.numberOfComments"
          :number-of-shares="post.numberOfShares"
          :creator-profile-picture-url="post.creatorProfilePictureUrl"
          :started-user-profile-picture-url="post.startedUserProfilePictureUrl"
          :published-at="post.publishedAt"
          @likes-clicked="handleLikesClick"
        />
      </v-col>
    </v-row>

    <CustomModal v-model="showLikesModal" title="Likes">
      <v-list>
        <v-list-item v-for="like in currentLikes" :key="like.id" class="px-4">
          <template #prepend>
            <v-avatar size="40">
              <v-img :src="like.avatar" :alt="like.name" />
            </v-avatar>
          </template>
          <v-list-item-title>{{ like.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </CustomModal>

    <BottomSheet v-model="showLikesBottomSheet" title="Likes">
      <v-list>
        <v-list-item v-for="like in currentLikes" :key="like.id" class="px-4">
          <template #prepend>
            <v-avatar size="40">
              <v-img :src="like.avatar" :alt="like.name" />
            </v-avatar>
          </template>
          <v-list-item-title>{{ like.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </BottomSheet>
  </v-container>
</template>

<style scoped>
.v-container {
  padding-top: 2rem;
}
</style>
