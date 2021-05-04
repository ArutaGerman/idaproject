<template>
  <div :class="$style.emptyCart">
    <div :class="$style.emptyText">
      <span> Пока что вы ничего не добавили в корзину.</span>
    </div>
    <div :class="$style.backBtn">
      <base-button @has-click="goToPrevPage">
        <slot>Перейти к выбору</slot>
      </base-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    BaseButton: () => import("@/components/common/buttons/BaseButton"),
  },
  methods: {
    goToPrevPage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" module>
.emptyCart {
  text-align: left;

  .emptyText {
    font-size: 1.375rem;
    line-height: 1.75rem;
  }

  .backBtn {
    padding-top: 1.5rem;

    button:hover {
      cursor: pointer;
    }
  }
}
</style>