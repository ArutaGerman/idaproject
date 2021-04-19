<template>
  <div class="cart cart-block_wrapper dflex">
    <div class="cart-block_inner">
      <div class="cart_inner">
        <div class="cart-header dflex">
          <div class="cart-header__title">Корзина</div>
          <div @click.prevent="$router.go(-1)" class="cart-header__close">закрыть</div>
        </div>
        <CartIsEmpty v-if="productsInCart.length < 1" />
        <CartForm v-else-if="productsInCart.length > 0" />
        <CartSuccess />
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
      success: false
    };
  },
  components: {
    CartIsEmpty: () => import("@/components/cart/CartIsEmpty"),
    CartForm: () => import("@/components/cart/CartForm"),
    CartSuccess: () => import("@/components/cart/CartSuccess")
  },
  //получаем добавленные товары из store vuex
  computed: mapGetters(["productsInCart"]),
  methods: {
    deleteProduct(id) {
      let array = this.products;
      this.products = array.filter(index => index.id !== id);
    }
  }
};
</script>

<style lang="scss">
.cart-block {
  &_wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    justify-content: flex-end;

    &:before {
      content: "";
      width: 100%;
      height: 100%;
      position: fixed;
      background: #ffffff;
      opacity: 0.8;
    }
  }

  &_inner {
    width: 460px;
    height: 100%;
    background: #ffffff;
    box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px 0px 0px 8px;
  }
}
.cart_inner {
  padding: 3.25rem 3rem;
}
</style>