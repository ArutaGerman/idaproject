<template>
  <div :class="[$style['header_wrap'], $style.dflex]">
    <div :class="[$style['dflex_a-center'], $style['header_inner']]">
      <div :class="$style['title']">Корзина</div>
      <BaseButton @has-click="closeCart" :class="$style.btn"></BaseButton>
    </div>
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
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" module>
@import "../../../public/css/includes/_flex";
@import "../../../public/css/includes/_line-height";
@import "../../../public/css/includes/_font";
@import "../../../public/css/includes/_colors";

.header_wrap {
  position: fixed;
  height: 5.8125rem;
  width: 100%;
  max-width: 22.75rem;
  justify-content: space-between;
  align-items: flex-end;
  background: $white;
  z-index: 101;

  .header_inner{
    justify-content: space-between;
    width: 100%;
  }

  .title {
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
}
</style>