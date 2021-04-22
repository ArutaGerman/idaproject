<template>
  <div class="cart-empty">
    <span>
      Пока что вы ничего не добавили
      в корзину.
    </span>
    <BaseButton @has-click="goToPrevPage">
      <slot>Перейти к выбору</slot>
    </BaseButton>
  </div>
</template>

<script>
export default {
  components: {
    BaseButton: () => import("@/components/buttons/BaseButton")
  },
  methods: {
    goToPrevPage() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>