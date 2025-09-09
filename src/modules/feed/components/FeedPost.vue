<script setup lang="ts">
interface PostProps {
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

defineProps<PostProps>();

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
</script>

<template>
  <v-card class="mb-4" elevation="2">
    <v-card-item>
      <div class="d-flex align-center mb-2">
        <v-avatar size="40" class="me-3">
          <v-img
            v-if="startedUserProfilePictureUrl"
            :src="startedUserProfilePictureUrl"
            :alt="startedUserName"
          />
          <v-icon v-else icon="mdi-account-circle" size="40" />
        </v-avatar>
        <div>
          <div class="text-subtitle-1 font-weight-medium">{{ startedUserName }}</div>
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
        <span class="text-caption text-medium-emphasis ms-2">({{ numberOfStarts }}/5)</span>
      </div>

      <div v-if="description" class="text-body-2 mb-3">
        {{ description }}
      </div>

      <div class="d-flex align-center mb-3">
        <v-avatar size="24" class="me-2">
          <v-img
            v-if="creatorProfilePictureUrl"
            :src="creatorProfilePictureUrl"
            :alt="creatorUserName"
          />
          <v-icon v-else icon="mdi-account-circle" size="24" />
        </v-avatar>
        <div class="text-caption text-medium-emphasis">
          {{ creatorUserName === 'anonymous' ? 'Anonymous' : creatorUserName }}
        </div>
      </div>
    </v-card-item>

    <v-card-actions class="px-4 pb-3">
      <div class="d-flex justify-space-between w-100">
        <div class="d-flex align-center">
          <v-btn variant="text" size="small" color="red" prepend-icon="mdi-heart">
            {{ formatNumber(numberOfLikes) }}
          </v-btn>
        </div>

        <div class="d-flex align-center">
          <v-btn variant="text" size="small" color="blue" prepend-icon="mdi-comment" class="me-2">
            {{ formatNumber(numberOfComments) }}
          </v-btn>
          <v-btn variant="text" size="small" color="green" prepend-icon="mdi-share">
            {{ formatNumber(numberOfShares) }}
          </v-btn>
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-card {
  border-radius: 12px;
}

.v-avatar {
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.text-medium-emphasis {
  opacity: 0.7;
}
</style>
