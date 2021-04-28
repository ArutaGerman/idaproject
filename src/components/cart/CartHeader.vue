<template>
  <div :class="[$style.headerWrap, $style.dflex]">
    <div :class="$style.headerInner">
      <div :class="$style.title">Корзина</div>
      <BaseButton @has-click="closeCart" :class="$style.btn"></BaseButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    BaseButton: () => import("@/components/buttons/BaseButton"),
  },
  computed: mapGetters(["successCart"]),
  methods: {
    ...mapActions(["hideOrderSuccess"]),
    closeCart() {      
      document.body.style.overflow = "auto";
      this.$router.go(-1);
      this.hideOrderSuccess();
    },
  },
};
</script>

<style lang="scss" module>
@import "../../../public/css/includes/_flex";
@import "../../../public/css/includes/_font";
@import "../../../public/css/includes/_colors";

.headerWrap {
  height: 5.8125rem;
  justify-content: space-between;
  align-items: flex-end;
  background: $white;
  z-index: 101;

  .headerInner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    button:hover {
      cursor: pointer;
    }
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    line-height: $fz41px;
    color: $black0;
  }

  .btn {
    width: 0.875rem;
    height: 0.875rem;
    border: none;
    background: url("../../assets/cross.svg") no-repeat center;
  }
}
</style>