<template>
  <div>
    <!-- {{ productList }} -->
    <v-data-table
      :headers="headers"
      :items="productList"
      :items-per-page="10"
      class="elevation-1"
    >
      <template #[`item.description`]="{ item }">
        <p>
          {{ item.description | truncate(100) }}
          <span v-if="item.description.length > 100">...</span>
        </p>
      </template>
      <template #[`item.value`]="{ item }">
        <p>
          {{ item.value | formatPrice() }}
        </p>
      </template>
      <template #[`item.id`]="{ item }">
        <v-btn @click="deleteProduct(item.id)" icon>
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Description", value: "description" },
        { text: "Price", value: "value" },
        { text: "Actions", value: "id" },
      ],
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions({
      getProducts: "product/getProducts",
      deleteProduct: "product/deleteProduct",
    }),
  },
  computed: {
    ...mapGetters({ productList: "product/productList" }),
  },
  filters: {
    truncate: function (data, num) {
      return data.split("").slice(0, num).join("");
    },
    formatPrice(value) {
      var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      });
      return formatter.format(value);
    },
  },
};
</script>
<style></style>
