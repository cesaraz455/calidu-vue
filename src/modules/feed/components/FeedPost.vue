<script setup lang="ts">
import { ref, computed } from 'vue';
import { formatNumber } from '@utils/formatters';
import { getInitials, getAvatarColor } from '@utils/avatar';
import { getUserTimezone } from '@utils/timezone';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);

export interface FeedPostProps {
  id: string;
  startedUserName: string;
  startedUserId: string;
  creatorUserName: string | null;
  creatorUserId: string | null;
  numberOfStarts: number;
  description: string | null;
  numberOfLikes: number;
  numberOfComments: number;
  numberOfShares: number;
  creatorProfilePictureUrl?: string | null;
  startedUserProfilePictureUrl?: string | null;
  publishedAt: string;
}

const props = defineProps<FeedPostProps>();

const emit = defineEmits<{
  'likes-clicked': [];
}>();

const isLiked = ref(false);

const toggleLike = () => {
  isLiked.value = !isLiked.value;
  console.log('Like toggled:', isLiked.value);
};

const openLikesView = () => {
  emit('likes-clicked');
};

const fullDate = computed(() => {
  return dayjs(props.publishedAt).tz(getUserTimezone()).format('MMMM D, YYYY [at] h:mm A');
});
</script>

<template>
  <v-card class="mb-4" :elevation="1" :border="3">
    <v-card-item>
      <div class="d-flex align-center mb-2">
        <v-avatar size="40" class="me-3" color="primary">
          <v-img
            v-if="startedUserProfilePictureUrl"
            :src="startedUserProfilePictureUrl"
            :alt="startedUserName"
          />
          <div
            v-else
            class="initials-avatar"
            :style="{ backgroundColor: getAvatarColor(startedUserName) }"
          >
            {{ getInitials(startedUserName) }}
          </div>
        </v-avatar>
        <div>
          <div class="text-subtitle-1 font-weight-medium">
            <router-link
              v-if="startedUserName"
              :to="{ name: 'profile', query: { userId: startedUserId } }"
              class="user-link"
            >
              {{ startedUserName }}
            </router-link>
            <span v-else>{{ startedUserName }}</span>
          </div>
          <div class="text-caption text-medium-emphasis">
            <v-tooltip :text="fullDate" location="bottom" :open-delay="500">
              <template #activator="{ props: tooltipProps }">
                <span v-bind="tooltipProps" class="date-tooltip">
                  {{ dayjs(props.publishedAt).fromNow() }}
                </span>
              </template>
            </v-tooltip>
          </div>
        </div>
      </div>

      <div class="d-flex align-center mb-3">
        <v-rating
          :model-value="numberOfStarts"
          readonly
          density="compact"
          size="small"
          color="amber"
        />
      </div>

      <div v-if="description" class="text-body-2 mb-3">
        {{ description }}
      </div>
    </v-card-item>

    <v-card-actions class="px-4 pb-3 border-t">
      <div class="d-flex justify-space-between align-center w-100">
        <div class="d-flex align-center">
          <v-avatar size="24" class="me-2">
            <v-img v-if="creatorProfilePictureUrl" :src="creatorProfilePictureUrl" />
            <div
              v-else
              class="initials-avatar initials-avatar-small"
              :style="{ backgroundColor: getAvatarColor(creatorUserName ?? 'anonymous') }"
            >
              {{ getInitials(creatorUserName) }}
            </div>
          </v-avatar>
          <div class="text-caption text-medium-emphasis">
            By
            <router-link
              v-if="creatorUserName"
              :to="{ name: 'profile', query: { userId: creatorUserId } }"
              class="user-link"
            >
              {{ creatorUserName }}
            </router-link>
            <span v-else>{{ creatorUserName ?? 'Anonymous' }}</span>
          </div>
        </div>

        <div class="d-flex align-center">
          <v-btn
            variant="text"
            size="small"
            :color="isLiked ? 'red' : 'grey'"
            :icon="isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
            @click="toggleLike"
          />
          <a href="#" class="likes-link me-2 text-grey-darken-4" @click.prevent="openLikesView">
            {{ formatNumber(numberOfLikes) }}
          </a>
          <v-btn variant="text" size="small" icon="mdi-comment-outline" class="me-1" color="grey" />
          <span class="text-caption me-2 font-weight-bold text-grey-darken-4">
            {{ formatNumber(numberOfComments) }}
          </span>
          <v-btn variant="text" size="small" icon="mdi-share-outline" class="me-1" color="grey" />
          <span class="text-caption font-weight-bold text-grey-darken-4">
            {{ formatNumber(numberOfShares) }}
          </span>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {
  border-radius: 12px;
}

.v-avatar {
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.text-medium-emphasis {
  opacity: 0.7;
}

.initials-avatar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
  border-radius: 50%;
  text-align: center;
}

.initials-avatar-small {
  font-size: 10px;
}

.user-link {
  color: inherit;
  text-decoration: none;
  transition: text-decoration 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
}

.likes-link {
  text-decoration: none;
  font-weight: bold;
  font-size: 0.75rem;
  cursor: pointer;
  transition: text-decoration 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
}
</style>
