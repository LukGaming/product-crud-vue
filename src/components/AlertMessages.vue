<template>
  <div>
    <v-alert dense type="error">
      {{ message }}
    </v-alert>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>
<style></style>
