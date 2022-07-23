<template>
  <v-app>
    <div>
      <v-btn @click="increaseCounter" color="green">+</v-btn>
      <v-btn @click="decreaseCounter" color="red">-</v-btn>
      {{ count }}
      <v-btn @click="fetchAllproducts" color="red">BuscarProdutos</v-btn>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["count"]),
  },
  methods: {
    ...mapActions(["increaseCounter", "decreaseCounter", "fetchAllproducts"]),
  },
};
</script>
