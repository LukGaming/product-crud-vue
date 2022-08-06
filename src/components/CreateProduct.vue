<template>
  <div>
    {{ product }}
    {{ productErrors }}
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-text-field
              v-model="switchProductName"
              label="Name"
              outlined
              hide-details="auto"
              :error="productErrors.name.length > 0"
              @blur="validateForm('name')"
            ></v-text-field>
            <AlertMessages
              class="mt-1"
              v-if="productErrors.name.length > 0"
              :message="productErrors.name"
            />
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-textarea
              v-model="switchProductDescription"
              label="Description"
              outlined
              hide-details="auto"
              :error="productErrors.description.length > 0"
              @blur="validateForm('description')"
              auto-grow
            ></v-textarea>
            <AlertMessages
              class="mt-1"
              v-if="productErrors.description.length > 0"
              :message="productErrors.description"
            />
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-text-field
              v-money="money"
              v-model="switchProductPrice"
              label="Value"
              outlined
              hide-details="auto"
              :error="productErrors.price.length > 0"
              @blur="validateForm('price')"
            ></v-text-field>
            <AlertMessages
              class="mt-1"
              v-if="productErrors.price.length > 0"
              :message="productErrors.price"
            />
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1">
          <v-col>
            <v-autocomplete
              :items="categories"
              v-model="switchCategory"
              item-text="categoryName"
              :menu-props="{ bottom: true, offsetY: true }"
              item-value="id"
              outlined
              label="Category"
              hide-details="auto"
              @blur="validateForm('category')"
            ></v-autocomplete>
            <AlertMessages
              class="mt-1"
              v-if="productErrors.category.length > 0"
              :message="productErrors.category"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" v-for="(image, index) in productImages" :key="index">
            <img :src="image.src" width="300px" height="200px" />
          </v-col>
        </v-row>
        <v-row
          ><v-col cols="3"
            ><v-file-input
              label="Choose Files"
              filled
              prepend-icon="mdi-camera"
              multiple
              @change="handleFilePreview($event)"
            ></v-file-input></v-col
        ></v-row>
        <v-row no-gutters class="mt-1">
          <v-col
            ><v-btn
              color="blue"
              @click="validateForm('validateAll')"
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

// import { Money } from "v-money";
export default {
  components: {
    //  Money
  },
  data() {
    return {
      price: 123.45,
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },
  methods: {
    ...mapActions({
      setProductValue: "product/setProductValue",
      validateForm: "product/validateForm",
      handleFilePreview: "product/handleFilePreview",
    }),
  },
  computed: {
    ...mapGetters({
      product: "product/product",
      categories: "product/categories",
      productErrors: "product/productErrors",
      productImages: "product/productImages",
    }),
    switchProductName: {
      get() {
        return this.product.name;
      },
      set(val) {
        this.setProductValue({ part: "name", value: val });
      },
    },
    switchProductDescription: {
      get() {
        return this.product.description;
      },
      set(val) {
        this.setProductValue({ part: "description", value: val });
      },
    },
    switchProductPrice: {
      get() {
        return this.product.price;
      },
      set(val) {
        this.setProductValue({ part: "price", value: val });
      },
    },
    switchCategory: {
      get() {
        return this.product.category;
      },
      set(val) {
        this.setProductValue({ part: "category", value: val });
      },
    },
  },
};
</script>
<style></style>
