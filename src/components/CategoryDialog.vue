<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="switchCategoryDialog" max-width="1000px">
        <v-card>
          <v-container>
            <CreateCategory />
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CreateCategory from "./CreateCategory.vue";

export default {
  components: {
    CreateCategory,
  },
  computed: {
    ...mapGetters({ categoryDialog: "product/categoryDialog" }),
    switchCategoryDialog: {
      get() {
        return this.categoryDialog.dialog;
      },
      set(val) {
        this.setCategoryDialog({ part: "dialog", value: val });
      },
    },
  },
  methods: {
    ...mapActions({ setCategoryDialog: "product/setCategoryDialog" }),
  },
};
</script>
<style></style>
