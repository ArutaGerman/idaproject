<template>
  <div :class="[$style['block_wrapper'], $style.dflex]">
    <div :class="$style['block_inner']">
      <div :class="$style['cart_inner']">
        <CartHeader></CartHeader>
        <CartIsEmpty v-if="(!productsInCart || productsInCart.length < 1) && !successCart" />
        <CartForm v-else-if="productsInCart.length > 0 && !successCart" />
        <CartSuccess v-else></CartSuccess>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      emptyVisible: true,
      success: false
    };
  },
  components: {
    CartHeader: () => import("@/components/cart/CartHeader"),
    CartIsEmpty: () => import("@/components/cart/CartIsEmpty"),
    CartForm: () => import("@/components/cart/CartForm"),
    CartSuccess: () => import("@/components/cart/CartSuccess")
  },
  //получаем добавленные товары из store vuex
  computed: mapGetters(["productsInCart", "successCart"]),
  methods: {
    deleteProduct(id) {
      let array = this.products;
      this.products = array.filter(index => index.id !== id);
    }
  }
};
</script>

<style lang="scss" module>
@import "../../public/css/includes/_flex";
@import "../../public/css/includes/_colors";

.block_wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: auto;
  justify-content: flex-end;
}

.block_wrapper:before {
  content: "";
  width: 100%;
  height: 100%;
  position: fixed;
  background: $white;
  opacity: 0.8;
}

.block_inner {
  width: 28.75rem;
  height: 100%;
  background: $white;
  box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px 0px 0px 8px;
}

.cart_inner {
  padding: 0 3rem 3.25rem 3rem;
}
</style>