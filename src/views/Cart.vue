<template>
  <div :class="[$style.blockWrapper, $style.dflex]" ref="cartComponent">
    <div :class="$style.blockInner">
      <div :class="$style.inner">
        <cart-header></cart-header>
        <div :class="$style.content">
          <cart-is-empty
            v-if="
              (!this['cart/productsInCart'] ||
                this['cart/productsInCart'].length < 1) &&
              !this['cart/successCart']
            "
          />
          <cart-form
            v-else-if="
              this['cart/productsInCart'].length > 0 &&
              !this['cart/successCart']
            "
          />
          <cart-success v-else></cart-success>
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      emptyVisible: true,
      success: false,
    };
  },

  components: {
    CartHeader: () => import("@/components/cart/CartHeader"),
    CartIsEmpty: () => import("@/components/cart/CartIsEmpty"),
    CartForm: () => import("@/components/cart/CartForm"),
    CartSuccess: () => import("@/components/cart/CartSuccess"),
  },

  //получаем добавленные товары из store vuex
  computed: mapGetters([
    "cart/productsInCart",
    "cart/successCart",
    "cart/goodsCounter",
  ]),

  mounted() {
    document.querySelector('html').style.overflowY = "hidden";
  },
  
  methods: {
    deleteProduct(id) {
      let array = this.products;
      this.products = array.filter((index) => index.id !== id);
    },
  },
};
</script>

<style lang="scss" module>
@import "../../public/css/scss/includes/_flex";
@import "../../public/css/scss/includes/_colors";

.blockWrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: auto;
  justify-content: flex-end;
}

.blockWrapper:before {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  background: $white;
  opacity: 0.8;
  box-shadow: 0 0 16px rgb(255 255 255 / 80%);
}

.blockInner {
  width: 28.75rem;
  background: $white;
  position: relative;
  box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px 0px 0px 8px;  
}

.inner {
  padding: 0 3rem;

  .content {
    padding-top: 2rem;
  }
}
</style>