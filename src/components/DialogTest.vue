<template>
  <div>
    <template>
      <div class="text-center">
        <v-dialog v-model="switchDialog" width="500">
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Privacy Policy
            </v-card-title>
            <v-card-text>
              {{ dialogTeste.message }}
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="setDialog({ part: 'dialog', value: false })"
              >
                Fechar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return { dialog: true };
  },
  computed: {
    ...mapGetters(["dialogTeste"]),
    switchDialog: {
      get() {
        return this.dialogTeste.dialog;
      },
      set(val) {
        this.setDialog({ part: "dialog", value: val });
      },
    },
  },
  methods: {
    ...mapActions(["setDialog"]),
  },
};
</script>
<style></style>
