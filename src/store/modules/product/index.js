import $http from "@/plugins/axios";
import { description } from "@/mock/description";
export const product = {
  namespaced: true,
  state: {
    product: {
      name: "",
      description: "",
      price: 0.0,
      category: null,
    },
    categories: [
      { id: 0, categoryName: "Processor" },
      { id: 1, categoryName: "Memory" },
    ],
    productErrors: {
      name: "",
      description: "",
      price: "",
      category: "",
      images: [],
    },
    categoryForm: {
      categoryName: "",
    },
    categoryErrors: {
      categoryName: "",
    },
    productImages: [],
  },
  getters: {
    canSendFormCategory(state) {
      let canSend = true;
      for (const key in state.categoryErrors) {
        if (state.categoryErrors[key].length > 0) {
          canSend = false;
          break;
        }
      }
      return canSend;
    },
    categoryErrors(state) {
      return state.categoryErrors;
    },
    categoryForm(state) {
      return state.categoryForm;
    },
    productImages(state) {
      return state.productImages;
    },
    product(state) {
      return state.product;
    },
    categories(state) {
      return state.categories;
    },
    productErrors(state) {
      return state.productErrors;
    },
    canSendForm(state) {
      let canSend = true;
      for (const key in state.productErrors) {
        if (state.productErrors[key].length > 0) {
          canSend = false;
          break;
        }
      }
      return canSend;
    },
  },
  actions: {
    getProductCategories({ commit }) {
      $http.get("Category").then((res) => {
        commit("setProductCategories", res.data);
      });
    },
    setCategoryForm({ commit }, payload) {
      commit("setCategoryForm", payload);
    },
    validateCategoryForm({ commit, state, getters }, payload) {
      let order;
      switch (payload) {
        case "name":
          order = 1;
          break;
        case "validateAll":
          order = 2;
          break;
        default:
          break;
      }
      if (order >= 1) {
        let fieldToValidate;
        let errorMessage = "";
        fieldToValidate = state.categoryForm.categoryName;
        errorMessage =
          fieldToValidate == null || fieldToValidate == ""
            ? "The Name of the Category cannot be null"
            : "";
        commit("setCategoryErros", {
          part: "categoryName",
          value: errorMessage,
        });
      }
      if (order >= 2) {
        if (getters.canSendFormCategory) {
          console.log("entrando aqui");
          $http
            .post("Category", { ...state.categoryForm })
            .then((res) => console.log(res));
        }
      }
    },
    submitProductImages({ commit }, payload) {
      var formData = new FormData();
      payload.files.forEach((element) => {
        formData.append("images", element);
      });
      $http
        .post(`Images?productId=${payload.productId}`, formData)
        .then((res) => console.log(res));
      return commit;
    },
    addDataToInputs({ commit }) {
      commit("addDataToInputs");
    },
    removeImage({ commit }, payload) {
      commit("removeImage", payload);
    },
    handleFilePreview({ commit }, event) {
      commit("cleanImages");
      event.forEach((element) => {
        var reader = new FileReader();
        reader.onload = function () {
          var output = element;
          output.src = reader.result;
          commit("setImageFileToArray", element);
        };
        reader.readAsDataURL(element);
      });
    },
    async validateForm({ commit, state, getters, dispatch }, payload) {
      let order = 0;
      switch (payload) {
        case "name":
          order = 1;
          break;
        case "description":
          order = 2;
          break;
        case "price":
          order = 3;
          break;
        case "category":
          order = 4;
          break;
        case "images":
          order = 5;
          break;
        case "validateAll":
          order = 6;
          break;
        default:
          break;
      }

      if (order >= 1) {
        let fieldToValidate;
        let errorMessage = "";
        fieldToValidate = state.product.name;
        errorMessage =
          fieldToValidate == "" || fieldToValidate == null
            ? "The field cannot be empty."
            : fieldToValidate.length > 50
            ? "The field cannot have more than 50 characters."
            : "";
        commit("setProductErrors", { part: "name", value: errorMessage });
      }
      if (order >= 2) {
        let fieldToValidate;
        let errorMessage = "";
        fieldToValidate = state.product.description;
        errorMessage =
          fieldToValidate == "" || fieldToValidate == null
            ? "The field cannot be empty."
            : fieldToValidate.length < 20
            ? "The field cannot have less than 20 characters."
            : fieldToValidate.length > 5000
            ? "The field cannot have more than 5000 characters."
            : "";
        commit("setProductErrors", {
          part: "description",
          value: errorMessage,
        });
      }
      if (order >= 3) {
        let fieldToValidate;
        let errorMessage = "";
        fieldToValidate = state.product.price
          .replaceAll(".", "")
          .replaceAll(",", "")
          .replaceAll("R$ ", "");
        errorMessage =
          fieldToValidate == "" || fieldToValidate == null
            ? "The field cannot be empty."
            : fieldToValidate === "000"
            ? "The value cannot be zero."
            : "";
        commit("setProductErrors", {
          part: "price",
          value: errorMessage,
        });
      }
      if (order >= 4) {
        let fieldToValidate;
        let errorMessage = "";
        fieldToValidate = state.product.category;
        errorMessage =
          fieldToValidate == null ? "Please select a category." : "";
        commit("setProductErrors", {
          part: "category",
          value: errorMessage,
        });
      }
      if (order >= 6) {
        let fieldToValidate;
        let errorMessage = "";
        fieldToValidate = state.productImages;
        errorMessage =
          fieldToValidate.length < 3
            ? "Product has to contain at least 3 images"
            : "";
        commit("setProductErrors", {
          part: "images",
          value: errorMessage,
        });
      }
      if (order >= 6) {
        if (getters.canSendForm) {
          let payload = {
            name: state.product.name,
            description: state.product.description,
            value: state.product.price
              .replaceAll(".", "")
              .replaceAll(",", "")
              .replaceAll("R$ ", ""),
            categoryId: 1,
          };
          $http.post("Product", { ...payload }).then((res) => {
            dispatch("submitProductImages", {
              files: state.productImages,
              productId: res.data.id,
            });
          });
        }
      }
    },
    setProductValue({ commit }, payload) {
      commit("setProductValue", payload);
    },
  },
  mutations: {
    setProductCategories(state, payload) {
      state.categories = payload
    },
    setCategoryErros(state, payload) {
      state.categoryErrors[payload.part] = payload.value;
    },
    setCategoryForm(state, payload) {
      state.categoryForm[payload.part] = payload.value;
    },
    addDataToInputs(state) {
      state.product.name = "Samsung Smart TV 75´´ Crystal UHD 4K 75AU8000";
      state.product.description = description;
      state.product.category = 1;
    },
    cleanImages(state) {
      state.productImages = [];
    },
    removeImage(state, payload) {
      state.productImages.splice(payload, 1);
    },
    setImageFileToArray(state, payload) {
      state.productImages.push(payload);
    },
    setProductValue(state, payload) {
      state.product[payload.part] = payload.value;
    },
    setProductErrors(state, payload) {
      state.productErrors[payload.part] = payload.value;
    },
  },
};
