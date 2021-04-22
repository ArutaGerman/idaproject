<template>
  <div :class="[$style['dflex_a-center'], $style['s-between']]">
    <div :class="$style['cart-header__title']">Корзина</div>
    <BaseButton @has-click="closeCart" :class="$style.btn"> </BaseButton>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    BaseButton: () => import("@/components/buttons/BaseButton"),
  },
  computed: mapGetters(["successCart"]),
  methods: {
    closeCart() {
      this.$store.dispatch("hideOrderSuccess");
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" module>
@import "../../../public/css/style";
@import "../../../public/css/includes/_line-height";
@import "../../../public/css/includes/_font";

.cart-header__title{
  font-size: 2rem;
  font-weight: bold;
  line-height: $line-height-41px;
  color: #000000;
}
.btn {
  width: 0.875rem;
  height: 0.875rem;
  border: none;
  background: url("../../assets/cross.svg") no-repeat center;
}
</style>