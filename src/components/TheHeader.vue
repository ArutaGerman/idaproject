<template>
  <header class="header">
    <div class="header-inner container">
      <a href="#" class="header__logo">TestList</a>
      <div class="header-cart_wrap cart-icon_wrap">
        <router-link to="/cart">
          <CartIcon></CartIcon>
          <div v-if="countProducts > 0" class="header-cart__count dflex">
            <span>{{ countProducts }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {  
  components: {
    CartIcon: () => import("@/components/cart/CartIcon")
  },
  // считываем кол-во товаров в корзине из localStorage при перезагрузке или закрытии окна
  mounted(){
    this.$store.dispatch("CountProductsInCart");    
  },
  //получение из store данных счетчика  кол-ва товаров в корзине
  computed: {
    ...mapGetters(["countProducts"])
  }
};
</script>

<style lang="scss">
.header {
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;
  height: 4.125rem;
  &-inner {
    height: 100%;

    padding: 0 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__logo {
    font-weight: bold;
    font-size: 22px;
    line-height: 28px;
  }
  .header-cart_wrap {
    position: relative;
  }
  .header-cart__count {
    height: 12px;
    width: 12px;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    background: #959dad;
    align-items: center;
    justify-content: center;

    span {
      font-weight: bold;
      font-size: 8px;
      line-height: 10px;
      color: #ffffff;
    }
  }
}
</style>