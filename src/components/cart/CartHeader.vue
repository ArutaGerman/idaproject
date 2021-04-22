<template>
  <div class="cart-header dflex">
    <div class="cart-header__title">Корзина</div>
      <BaseButton @has-click="closeCart">
        <slot>Назад</slot>
      </BaseButton>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    BaseButton: () => import("@/components/buttons/BaseButton")
  },
  computed: mapGetters(["successCart"]),
  methods: {
    closeCart() {
      this.$store.dispatch("hideOrderSuccess");
      this.$router.go(-1)
    }
  }
};
</script>

<style>
</style>