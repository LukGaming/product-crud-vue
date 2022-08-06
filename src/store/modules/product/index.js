import $http from "@/plugins/axios";
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
    },
    productImages: [],
  },
  getters: {
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
    handleFilePreview({ commit }, event) {
      event.forEach((element) => {
        var reader = new FileReader();
        reader.onload = function () {
          var output = element;
          output.src = reader.result;
        };
        reader.readAsDataURL(element);
        console.log(element);
        commit("setImageFileToArray", element);
      });
    },
    async validateForm({ commit, state, getters }, payload) {
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
        case "validateAll":
          order = 5;
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
            : fieldToValidate.length > 1000
            ? "The field cannot have more than 1000 characters."
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
      if (order >= 5) {
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
          console.log(payload);

          $http.post("Product", { ...payload }).then((res) => console.log(res));
        }
      }
    },
    setProductValue({ commit }, payload) {
      commit("setProductValue", payload);
    },
  },
  mutations: {
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
