<template>
  <button @click="emitValidateForm" class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  methods: {
    emitValidateForm() {
      this.$emit("has-click");
    },
  },
};
</script>

<style lang="scss">
@import "../../../public/css/includes/_colors";

.btn {
  width: 100%;
  height: 3.125rem;
  color: $white;
  background: $black;
  border-radius: 0.5rem;
  border: none;
}
</style>