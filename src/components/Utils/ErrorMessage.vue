<template>
  <div>
    <v-alert dense outlined :type="type">
      {{ message }}
    </v-alert>
  </div>
</template>
<script>
export default {
  props: {
    message: String,
    type: String,
  },
};
</script>
<style></style>
