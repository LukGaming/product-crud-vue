<template>
  <div>
    <v-row no-gutters>
      <v-col
        >{{ categoryErrors }}
        <h1>Creating Categories</h1>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-text-field
              v-model="switchCategoryName"
              label="Name"
              outlined
              hide-details="auto"
              @blur="validateCategoryForm('name')"
            ></v-text-field>
            <AlertMessages
              class="mt-1"
              v-if="categoryErrors.categoryName.length > 0"
              :message="categoryErrors.categoryName"
            />
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col
            ><v-btn
              color="blue"
              @click="validateCategoryForm('validateAll')"
              class="white--text"
              >Submit</v-btn
            ></v-col
          ></v-row
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      categoryForm: "product/categoryForm",
      categoryErrors: "product/categoryErrors",
    }),
    switchCategoryName: {
      get() {
        return this.categoryForm.categoryName;
      },
      set(val) {
        this.setCategoryForm({ part: "categoryName", value: val });
      },
    },
  },
  methods: {
    ...mapActions({
      validateCategoryForm: "product/validateCategoryForm",
      setCategoryForm: "product/setCategoryForm",
    }),
  },
};
</script>
<style></style>
