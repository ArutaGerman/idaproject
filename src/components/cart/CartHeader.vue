<template>
  <div class="cart-header dflex">
    <div class="cart-header__title">Корзина</div>
    <div @click.prevent="closeCart" class="cart-header__close">закрыть</div>
  </div>
</template>

<script>
export default {
  methods: {
    closeCart() {
      this.$store.dispatch("hideOrderSuccess");
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>