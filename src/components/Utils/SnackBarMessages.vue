<template>
  <div>
    <v-snackbar
      v-model="switchSnackBar"
      :top="defaultSnackBar.top ? defaultSnackBar.top : true"
      :bottom="defaultSnackBar.bottom ? defaultSnackBar.bottom : false"
      :left="defaultSnackBar.left ? defaultSnackBar.left : false"
      :right="defaultSnackBar.right ? defaultSnackBar.right : true"
      :color="
        defaultSnackBar.sncakbarColor ? defaultSnackBar.sncakbarColor : 'red'
      "
      :timeout="defaultSnackBar.timeout ? defaultSnackBar.timeout : 5000"
    >
      {{ defaultSnackBar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="setDefaultSnackBar({ part: 'snackbar', value: false })"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      defaultSnackBar: "messages/defaultSnackBar",
    }),
    switchSnackBar: {
      get() {
        return this.defaultSnackBar.snackbar;
      },
      set(val) {
        this.setDefaultSnackBar({ part: "snackbar", value: val });
      },
    },
  },
  methods: {
    ...mapActions({ setDefaultSnackBar: "messages/setDefaultSnackBar" }),
  },
};
</script>
<style></style>
