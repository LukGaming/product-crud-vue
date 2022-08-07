<template>
  <div id="app">
    <v-app>
      <v-container>
        <router-view />
        <SnackBarMessages />
      </v-container>
    </v-app>
  </div>
</template>
<script>
import SnackBarMessages from './components/Utils/SnackBarMessages.vue';
export default {
  components: { SnackBarMessages },
};
</script>
<style lang="scss"></style>
