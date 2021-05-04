<template>
  <header :class="$style.header">
    <div :class="[$style.inner, $style.container]">
      <header-logo></header-logo>
      <div :class="$style.headerCartWrap">
        <router-link to="/cart">
          <cart-icon></cart-icon>
          <div
            v-if="this['cart/countProducts'] > 0"
            :class="[$style.headerCartCount, $style.dflex]"
          >
            <span>{{ this["cart/countProducts"] }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    HeaderLogo: () => import("@/components/header/HeaderLogo"),
    CartIcon: () => import("@/components/common/icons/CartIcon"),
  },
  // считываем кол-во товаров в корзине из localStorage при перезагрузке или закрытии окна
  mounted() {
    this["cart/countProductsInCart"];   
  },
  //получение из store данных счетчика  кол-ва товаров в корзине
  computed: {
    ...mapGetters(["cart/countProducts"]),
    ...mapActions(["cart/countProductsInCart"]),
  },
};
</script>

<style lang="scss" module>
@import "../../public/css/includes/_flex";
@import "../../public/css/includes/_colors";

.header {
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;
  height: 4.125rem;

  .inner {
    height: 100%;

    padding: 0 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .headerCartWrap {
    position: relative;

    path {
      fill: $black;
    }
  }
  .headerCartCount {
    height: 0.75rem;
    width: 0.75rem;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    background: #959dad;
    align-items: center;
    justify-content: center;

    span {
      font-weight: bold;
      font-size: 0.5rem;
      line-height: 0.625rem;
      color: $white;
    }
  }
}
</style>