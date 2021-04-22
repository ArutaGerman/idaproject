<template>
  <button @click="emitValidateForm" class="btn">
    <slot>Отправить</slot>
  </button>
</template>

<script>
export default {
  methods: {
    emitValidateForm() {
      this.$emit("has-click");
    }
  }
};
</script>

<style>
</style>