<script setup lang="ts">
import NavigationDrawer from './components/NavigationDrawer.vue';
import BottomNavigation from './components/BottomNavigation.vue';
</script>

<template>
  <navigation-drawer v-if="$vuetify.display.mdAndUp" />
  <bottom-navigation v-else />

  <v-main class="bg-blue-grey-lighten-5">
    <router-view />
  </v-main>
</template>

<style></style>
